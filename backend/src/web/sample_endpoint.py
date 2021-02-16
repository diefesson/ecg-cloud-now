from json import dumps

from flask import Blueprint

from app.application import injector
from domain.contract.sample_repository import SampleRepository
from domain.entity.sample import Sample

sample_endpoint = Blueprint('sample_endpoint', __name__)
sample_repository = injector.get(SampleRepository)


@sample_endpoint.route('/sample/all')
def sample_all():
    return dumps([s.__dict__ for s in sample_repository.get_samples()])


@sample_endpoint.route('/sample/<sample_id>')
def sample_get(sample_id):
    sample_id = int(sample_id)
    sample: Sample = sample_repository.get_sample(sample_id)
    return dumps(sample.__dict__)


@sample_endpoint.route('/sample/of_patient/<patient_id>')
def sample_of_patient(patient_id):
    patient_id = int(patient_id)
    samples = sample_repository.get_samples_of_patient(patient_id)
    return dumps([s.__dict__ for s in samples])
