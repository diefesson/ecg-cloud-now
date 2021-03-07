from marshmallow import Schema, fields

appointment_create_schema: Schema = Schema.from_dict({
    "medicId": fields.Integer(required=True),
    "patientId": fields.Integer(required=True)
})()

