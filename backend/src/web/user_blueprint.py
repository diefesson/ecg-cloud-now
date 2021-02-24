from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from app.application import injector
from domain.entity.user import User
from infra.contract.user_db_repository import UserDbRepository
from web.validatation.user_validation import USER_CREATE_SCHEMA, USER_HAS_USER_SCHEMA

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

@user_blueprint.route("/user/all")
def user_all():
    users = _user_db.get_users()
    return jsonify([u.__dict__ for u in users])

@user_blueprint.route("/user/all/<type>")
def user_all_of_type(type):
    try:
        type = int(type)
    except ValueError:
        return "bad request", 400
    users = _user_db.get_users(type)
    return jsonify([u.__dict__ for u in users])


@user_blueprint.route("/user/create", methods=["post"])
def user_create():
    try:
        values = USER_CREATE_SCHEMA.loads(request.data)
    except ValidationError:
        return "bad request", 400
    username = values["username"]
    email = values["email"]
    password = values["password"]
    if _user_db.has_user(username, email):
        return {"success": False, "cause": "user_already_exists"}
    user = User(
        values["username"],
        values["email"],
        values["name"],
        values["phone"],
        values["type"],
        values["id_doc"],
        values["state"],
        values["city"],
        values["district"],
        values["address"]
    )
    _user_db.add_user(user, password)
    return {"success": True}


@user_blueprint.route("/user/has_user", methods=["post"])
def user_has_user():
    try:
        values = USER_HAS_USER_SCHEMA.loads(request.data)
    except ValidationError:
        return "bad request", 400
    username = values["username"]
    email = values["email"]
    exists = _user_db.has_user(username, email)
    return {"exists": exists}

