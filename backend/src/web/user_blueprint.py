from flask import Blueprint, request
from marshmallow import Schema, fields, ValidationError

from app.application import injector
from infra.contract.user_db_repository import UserDbRepository

user_blueprint = Blueprint("user_blueprint", __name__)
_user_db: UserDbRepository = injector.get(UserDbRepository)


@user_blueprint.route("/user/get/<user_id>")
def user_get(user_id):
    user_id = int(user_id)
    user = _user_db.get_user(user_id)
    if user:
        return user.__dict__
    else:
        return "user not found", 404


@user_blueprint.route("/user/create", methods=["post"])
def user_create():
    try:
        values = _USER_CREATE_SCHEMA.loads(request.data)
    except ValidationError:
        return "bad request", 400
    username = values["username"]
    email = values["email"]
    password = values["password"]
    if _user_db.has_user(username, email):
        return {"success": False, "cause": "user_already_exists"}
    _user_db.add_user(username, email, password)
    return {"success": True}


@user_blueprint.route("/user/has_user", methods=["post"])
def user_has_user():
    try:
        values = _USER_HAS_USER_SCHEMA.loads(request.data)
    except ValidationError:
        return "bad request", 400
    username = values["username"]
    email = values["email"]
    exists = _user_db.has_user(username, email)
    return {"exists": exists}


_USER_CREATE_SCHEMA = Schema.from_dict({
    "username": fields.String(required=True),
    "email": fields.String(required=True),
    "password": fields.String(required=True)
})()

_USER_HAS_USER_SCHEMA = Schema.from_dict({
    "username": fields.String(required=True),
    "email": fields.String(required=True)
})()
