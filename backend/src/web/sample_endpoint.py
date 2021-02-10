from json import dumps
from flask import Blueprint
from app.application import injector
from domain.contract.sample_repository import SampleRepository

sample_endpoint = Blueprint('sample_endpoint', __name__)
sample_repository = injector.get(SampleRepository)


@sample_endpoint.route('/sample/all')
def sample_all():
    return dumps([s.__dict__ for s in sample_repository.get_samples()])
