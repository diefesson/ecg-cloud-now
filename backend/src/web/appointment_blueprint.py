from flask import Blueprint, request
from marshmallow import ValidationError

from domain.entity.user_type import MEDIC, PATIENT
from domain.entity.appointment import Appointment, AppointmentStatus
from infra.contract.appointment_repository import AppointmentRepository

from app.application import injector
from infra.contract.user_db_repository import UserDbRepository
from web.validatation.appointment_validations import appointment_create_schema, appointment_set_status_schema

appointment_blueprint = Blueprint("appointment_blueprint", __name__)
_appointment_repository = injector.get(AppointmentRepository)
_user_repository = injector.get(UserDbRepository)


@appointment_blueprint.route("/appointment/create", methods=["POST"])
def appointment_create():
    try:
        values = appointment_create_schema.loads(request.data)
    except ValidationError:
        return {"success": False, "cause": "Bad request"}, 400
    medic_id = values["medic_id"]
    patient_id = values["patient_id"]
    if not _user_repository.is_user_of_type(medic_id, MEDIC):
        return {"success": False, "cause": "Invalid medic"}, 400
    if not _user_repository.is_user_of_type(patient_id, PATIENT):
        return {"success": False, "cause": "Invalid patient"}, 400
    _appointment_repository.add_appointment(Appointment(0, medic_id, patient_id, AppointmentStatus.PENDING))
    return {"success": True}


@appointment_blueprint.route("/appointment/remove/<appointment_id>", methods=["GET"])
def appointment_remove(appointment_id):
    try:
        appointment_id = int(appointment_id)
    except ValueError:
        return {"success": False, "cause": "Bad request"}, 400
    _appointment_repository.remove_appointment(appointment_id)
    return {"success": True}


@appointment_blueprint.route("/appointment/get/<appointment_id>", methods=["GET"])
def appointment_get(appointment_id):
    try:
        appointment_id = int(appointment_id)
    except ValueError:
        return {"success": False, "cause": "Bad request"}, 400
    appointment = _appointment_repository.get_appointment(appointment_id)
    if not appointment:
        return {"success": False, "cause": "Not found"}, 404
    return {"success": True, "appointment": appointment.json_dict()}


@appointment_blueprint.route("/appointment/all", methods=["GET"])
def appointment_all():
    medic_id = request.args.get("medic_id")
    patient_id = request.args.get("patient_id")
    try:
        if medic_id is not None:
            medic_id = int(medic_id)
        if patient_id is not None:
            patient_id = int(patient_id)
    except ValueError:
        return {"success": False, "cause": "Bad request"}
    appointments = _appointment_repository.get_appointments(medic_id=medic_id, patient_id=patient_id)
    appointments = [a.json_dict() for a in appointments]
    return {"success": True, "appointments": appointments}


@appointment_blueprint.route("/appointment/set_status", methods=["POST"])
def appointment_set_status():
    try:
        values = appointment_set_status_schema.loads(request.data)
        appointment_id = values["appointment_id"]
        status = AppointmentStatus(int(values["status"]))
    except ValidationError or ValueError:
        return {"success": False, "cause": "Bad request"}, 400
    if _appointment_repository.get_appointment(appointment_id) is None:
        return {"success": False, "cause": "Not found"}, 404
    _appointment_repository.set_appointment_status(appointment_id, status)
    return {"success": True}
