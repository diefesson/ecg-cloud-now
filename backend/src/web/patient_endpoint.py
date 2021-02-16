from json import dumps
from flask import Blueprint

from app.application import injector
from domain.contract.patient_repository import PatientRepository
from domain.entity.patient import Patient

patient_endpoint = Blueprint('patient_endpoint', __name__)
_patient_repository = injector.get(PatientRepository)


@patient_endpoint.route('/patient/all')
def patient_all():
    patients: [Patient] = _patient_repository.get_patients()
    return dumps([p.__dict__ for p in patients])


@patient_endpoint.route('/patient/<patient_id>')
def patient_get(patient_id):
    patient_id = int(patient_id)
    patient: Patient = _patient_repository.get_patient(patient_id)
    return dumps(patient.__dict__)
