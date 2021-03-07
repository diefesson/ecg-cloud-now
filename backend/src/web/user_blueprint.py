from json import JSONDecodeError

from flask import Blueprint, request
from marshmallow import ValidationError

from app.application import injector
from domain.entity.user import User, UserType
from infra.contract.user_repository import UserRepository
from web.validatation.user_validation import USER_CREATE_SCHEMA

user_blueprint = Blueprint("user_blueprint", __name__)
_user_repository = injector.get(UserRepository)


@user_blueprint.route("/user/<user_id>", methods=["GET"])
def user_get(user_id):
    try:
        user_id = int(user_id)
    except ValueError:
        return {"success": False, "cause": "Bad request"}, 400
    user = _user_repository.get_user(user_id)
    if not user:
        return {"success": False, "cause": "Not found"}, 404
    return {"success": True, "user": user_to_json(user)}


# noinspection PyShadowingBuiltins
@user_blueprint.route("/user/all", methods=["GET"])
def user_all():
    type = request.args.get("type")
    try:
        if type is not None:
            type = UserType(int(type))
    except ValueError:
        return {"success": False, "cause": "Bad request"}, 400
    users = _user_repository.get_users(type)
    users = [user_to_json(u) for u in users]
    return {"success": True, "users": users}


@user_blueprint.route("/user", methods=["POST"])
def user_create():
    try:
        values = USER_CREATE_SCHEMA.loads(request.data)
    except ValidationError or JSONDecodeError as e:
        return {"success": False, "cause": "Bad request"}, 400
    password = values["password"]
    user = json_to_user(values)
    if _user_repository.has_user(user.username, user.email):
        return {"success": False, "cause": "Username or email already in use"}, 409
    _user_repository.add_user(user, password)
    return {"success": True}


@user_blueprint.route("/user/has-user/<username>/<email>", methods=["GET"])
def user_has_user(username, email):
    exists = _user_repository.has_user(username, email)
    return {"success": True, "exists": exists}


def user_to_json(user: User):
    return {
        "userId": user.user_id,
        "username": user.username,
        "email": user.email,
        "name": user.name,
        "phone": user.phone,
        "type": user.type,
        "idDoc": user.id_doc,
        "state": user.state,
        "city": user.city,
        "district": user.district,
        "address": user.address,
    }


def json_to_user(json: dict):
    return User(
        json["username"],
        json["email"],
        json["name"],
        json["phone"],
        UserType(json["type"]),
        json["idDoc"],
        json["state"],
        json["city"],
        json["district"],
        json["address"]
    )
