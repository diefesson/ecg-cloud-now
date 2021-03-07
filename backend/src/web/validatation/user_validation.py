from marshmallow import Schema, fields

from domain.entity.user import UserType

USER_CREATE_SCHEMA = Schema.from_dict({
    "username": fields.String(required=True),
    "email": fields.String(required=True),
    "password": fields.String(required=True),
    "name": fields.String(required=True),
    "phone": fields.String(required=True, validate=lambda v: v.isnumeric()),
    "type": fields.Integer(required=True, validate=lambda v: UserType.has_value(v)),
    "idDoc": fields.String(required=True, validate=lambda v: v.isnumeric()),
    "state": fields.String(required=True),
    "city": fields.String(required=True),
    "district": fields.String(required=True),
    "address": fields.String(required=True),
})()
