from json import JSONDecodeError

from flask import Blueprint, request, make_response
from marshmallow import ValidationError

from app.application import injector
from domain.entity.credential import Credential
from domain.entity.session import Session
from infra.contract.session_db_repository import SessionDbRepository
from infra.contract.user_db_repository import UserDbRepository
from web.validatation.session_validation import SESSION_CREATE_SCHEMA

session_blueprint = Blueprint("session_blueprint", __name__)
_user_db: UserDbRepository = injector.get(UserDbRepository)
_session_db: SessionDbRepository = injector.get(SessionDbRepository)


@session_blueprint.route("/session/create", methods=["post"])
def session_create():
    try:
        values = SESSION_CREATE_SCHEMA.loads(request.data)
    except ValidationError or JSONDecodeError:
        return "bad request", 400
    username = values["username"]
    password = values["password"]
    given_cre = Credential(username, password)
    db_cre = _user_db.get_credential(username)
    if not db_cre:
        return {"success": False, "cause": "username_not_found"}
    if given_cre != db_cre:
        return {"success": False, "cause": "invalid_password"}
    user_id = _user_db.username_to_user_id(username)
    session = Session(user_id)
    _session_db.add_session(session)
    response = make_response({"success": True})
    response.set_cookie("sessionToken", session.token)
    return response


@session_blueprint.route("/session/current", methods=["GET"])
def session_current():
    session = _current_session()
    if not session:
        return {"success": False, "cause": "Invalid session"}, 403
    else:
        return {"success": True, "session": session.as_dict()}


@session_blueprint.route("/session/logout", methods=["GET"])
def session_logout():
    if "sessionToken" not in request.cookies:
        return _make_no_session_response()
    token = request.cookies["sessionToken"]
    _session_db.remove_session(token)
    response = make_response({"success": True})
    response.set_cookie("sessionToken", "", max_age=0)
    return {"success": True}


def _current_session():
    if "sessionToken" not in request.cookies:
        return None
    token = request.cookies["sessionToken"]
    session = _session_db.get_session(token)
    return session


def _make_expired_session_response():
    response = make_response({"success": False, "cause": "expired_session"})
    response.set_cookie("sessionToken", "", max_age=0)
    return response


def _make_no_session_response():
    response = make_response({"success": False, "cause": "no_session"})
    return response
