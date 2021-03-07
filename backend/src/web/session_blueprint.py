from json import JSONDecodeError
from typing import Optional

from flask import Blueprint, request, make_response
from marshmallow import ValidationError

from app.application import injector
from domain.entity.credential import Credential
from domain.entity.session import Session
from infra.contract.session_repository import SessionRepository
from infra.contract.user_repository import UserRepository
from web.validatation.session_validation import SESSION_CREATE_SCHEMA

session_blueprint = Blueprint("session_blueprint", __name__)
_user_repository = injector.get(UserRepository)
_session_repository = injector.get(SessionRepository)


@session_blueprint.route("/session", methods=["post"])
def session_create():
    try:
        values = SESSION_CREATE_SCHEMA.loads(request.data)
    except ValidationError or JSONDecodeError:
        return {"success": False, "cause": "Bad request"}, 400
    username = values["username"]
    password = values["password"]
    credentials = Credential(username, password)
    expected_credentials = _user_repository.get_credential(username)
    if not expected_credentials or expected_credentials != credentials:
        return {"success": False, "cause": "Invalid username or password"}, 403
    user_id = _user_repository.username_to_user_id(username)
    session = Session(user_id)
    _session_repository.add_session(session)
    response = make_response({"success": True, "session": session_to_json(session)})
    response.set_cookie("SESSION_TOKEN", session.token)
    return response


@session_blueprint.route("/session", methods=["GET"])
def session_current():
    session = _current_session()
    if not session:
        return {"success": False, "cause": "Invalid session"}, 403
    else:
        return {"success": True, "session": session_to_json(session)}


@session_blueprint.route("/session", methods=["DELETE"])
def session_logout():
    session = _current_session()
    if not session:
        return {"success": False, "cause": "Invalid session"}, 403
    response = make_response({"success": True})
    response.set_cookie("SESSION_TOKEN", "", max_age=0)
    return response


def _current_session() -> Optional[Session]:
    if "SESSION_TOKEN" not in request.cookies:
        return None
    token = request.cookies["SESSION_TOKEN"]
    session = _session_repository.get_session(token)
    return session


def session_to_json(session: Session) -> dict:
    iso_expire = session.expire.isoformat()
    return {
        "token": session.token,
        "userId": session.user_id,
        "expire": iso_expire
    }
