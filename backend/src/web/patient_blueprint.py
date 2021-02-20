from flask import Blueprint, jsonify

from app.application import injector
from domain.entity.patient import Patient
from infra.contract.patient_db_repository import PatientDbRepository

patient_blueprint = Blueprint('patient_blueprint', __name__)
_patient_db = injector.get(PatientDbRepository)


@patient_blueprint.route('/patient/all')
def patient_all():
    patients: [Patient] = _patient_db.get_all_patients()
    return jsonify([p.__dict__ for p in patients])


@patient_blueprint.route('/patient/get/<patient_id>')
def patient_get(patient_id):
    patient_id = int(patient_id)
    patient: Patient = _patient_db.get_patient(patient_id)
    if patient:
        return patient.__dict__
    else:
        return "patient not found", 404
