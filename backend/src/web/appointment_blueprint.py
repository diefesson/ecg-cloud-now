from datetime import date

from flask import Blueprint, request
from marshmallow import ValidationError

from domain.entity.appointment import Appointment, AppointmentStatus
from domain.entity.user import UserType
from infra.contract.appointment_repository import AppointmentRepository

from app.application import injector
from infra.contract.user_repository import UserRepository
from web.validatation.appointment_validations import appointment_create_schema

appointment_blueprint = Blueprint("appointment_blueprint", __name__)
_appointment_repository = injector.get(AppointmentRepository)
_user_repository = injector.get(UserRepository)


@appointment_blueprint.route("/appointment", methods=["POST"])
def appointment_create():
    try:
        values = appointment_create_schema.loads(request.data)
    except ValidationError:
        return {"success": False, "cause": "Bad request"}, 400
    medic_id = values["medicId"]
    patient_id = values["patientId"]
    time = values["time"]
    if not _user_repository.is_user_of_type(medic_id, UserType.MEDIC):
        return {"success": False, "cause": "Invalid medic"}, 400
    if not _user_repository.is_user_of_type(patient_id, UserType.PATIENT):
        return {"success": False, "cause": "Invalid patient"}, 400
    if not _appointment_repository.is_available_time(medic_id, time):
        return {"success": False, "cause": f"Not available time: {time.isoformat()}"}
    _appointment_repository.add_appointment(Appointment(0, medic_id, patient_id, AppointmentStatus.PENDING, time))
    return {"success": True}


@appointment_blueprint.route("/appointment/available_times", methods=["GET"])
def appointment_available_times():
    medic_id = request.args.get("medic_id")
    d = request.args.get("date")
    try:
        medic_id = int(medic_id)
        d = date.fromisoformat(d)
    except ValueError or TypeError:
        return {"Success": False, "cause": "Bad request"}
    if not _user_repository.is_user_of_type(medic_id, UserType.MEDIC):
        return {"Success": False, "cause": "Invalid medic"}
    available_times = _appointment_repository.get_available_times(medic_id, d)
    available_times = [at.isoformat() for at in available_times]
    return {"success": True, "available_times": available_times}


@appointment_blueprint.route("/appointment/<appointment_id>", methods=["DELETE"])
def appointment_remove(appointment_id):
    try:
        appointment_id = int(appointment_id)
    except ValueError:
        return {"success": False, "cause": "Bad request"}, 400
    _appointment_repository.remove_appointment(appointment_id)
    return {"success": True}


@appointment_blueprint.route("/appointment/<appointment_id>", methods=["GET"])
def appointment_get(appointment_id):
    try:
        appointment_id = int(appointment_id)
    except ValueError:
        return {"success": False, "cause": "Bad request"}, 400
    appointment = _appointment_repository.get_appointment(appointment_id)
    if not appointment:
        return {"success": False, "cause": "Not found"}, 404
    return {"success": True, "appointment": appointment_to_json(appointment)}


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
    appointments = [appointment_to_json(a) for a in appointments]
    return {"success": True, "appointments": appointments}


@appointment_blueprint.route("/appointment/<appointment_id>/set-status", methods=["PUT"])
def appointment_set_status(appointment_id):
    try:
        status = int(request.args.get("value"))
    except ValueError:
        return {"success": False, "cause": "Bad request"}, 400
    if _appointment_repository.get_appointment(appointment_id) is None:
        return {"success": False, "cause": "Not found"}, 404
    _appointment_repository.set_appointment_status(appointment_id, status)
    return {"success": True}


def appointment_to_json(appointment: Appointment) -> dict:
    return {
        "appointmentId": appointment.appointment_id,
        "medicId": appointment.medic_id,
        "patientId": appointment.patient_id,
        "status": appointment.status.value,
        "time": appointment.time.isoformat()
    }
