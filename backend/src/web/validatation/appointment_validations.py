from marshmallow import Schema, fields

appointment_create_schema: Schema = Schema.from_dict({
    "medic_id": fields.Integer(required=True),
    "patient_id": fields.Integer(required=True)
})()
