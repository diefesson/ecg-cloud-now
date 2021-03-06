from marshmallow import Schema, fields

appointment_create_schema: Schema = Schema.from_dict({
    "medic_id": fields.Integer(required=True),
    "patient_id": fields.Integer(required=True)
})()

appointment_set_status_schema: Schema = Schema.from_dict({
    "appointment_id": fields.Integer(required=True),
    "status": fields.Integer(required=True)
})()
