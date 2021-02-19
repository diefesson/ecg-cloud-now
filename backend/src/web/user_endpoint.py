from flask import Blueprint, request
from marshmallow import Schema, fields

from app.application import injector
from infra.contract.user_db_repository import UserDbRepository

user_endpoint = Blueprint("user_endpoint", __name__)
_user_db: UserDbRepository = injector.get(UserDbRepository)


@user_endpoint.route("/user/<user_id>")
def user(user_id):
    user_id = int(user_id)
    user = _user_db.get_user(user_id)
    if user:
        return user.to_json()
    else:
        return "user not found", 404


@user_endpoint.route("/user/create/", methods=["post"])
def user_create():
    values = _USER_CREATE_SCHEMA.loads(request.data)
    if not values:
        return "bad request", 400
    username = values["username"]
    email = values["email"]
    password = values["password"]
    if _user_db.has_user(username, email):
        return "user already exists", 400
    _user_db.add_user(username, email, password)
    return "user created"


_USER_CREATE_SCHEMA = Schema.from_dict({
    "username": fields.String(required=True),
    "email": fields.String(required=True),
    "password": fields.String(required=True)
})()
