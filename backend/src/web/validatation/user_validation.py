from marshmallow import Schema, fields

from domain.entity.user_type import *

USER_CREATE_SCHEMA = Schema.from_dict({
    "username": fields.String(required=True),
    "email": fields.String(required=True),
    "password": fields.String(required=True),
    "name": fields.String(required=True),
    "phone": fields.String(required=True, validate=lambda v: v.isnumeric()),
    "type": fields.Integer(required=True, validate=lambda v: v == PATIENT or v == MEDIC),
    "id_doc": fields.String(required=True, validate=lambda v: v.isnumeric()),
    "state": fields.String(required=True),
    "city": fields.String(required=True),
    "district": fields.String(required=True),
    "address": fields.String(required=True),
})()

USER_HAS_USER_SCHEMA = Schema.from_dict({
    "username": fields.String(required=True),
    "email": fields.String(required=True)
})()
