from marshmallow import Schema, fields

SESSION_CREATE_SCHEMA = Schema.from_dict({
    "username": fields.String(required=True),
    "password": fields.String(required=True)
})()
