from flask import Blueprint, jsonify

from app.application import injector
from domain.entity.sample import Sample
from infra.contract.sample_db_repository import SampleDbRepository

sample_blueprint = Blueprint('sample_blueprint', __name__)
_sample_db = injector.get(SampleDbRepository)


@sample_blueprint.route('/sample/all')
def sample_all():
    return jsonify([s.__dict__ for s in _sample_db.get_all_samples()])


@sample_blueprint.route('/sample/get/<sample_id>')
def sample_get(sample_id):
    sample_id = int(sample_id)
    sample: Sample = _sample_db.get_sample(sample_id)
    if sample:
        return sample.__dict__
    else:
        return "sample not found", 404


@sample_blueprint.route('/sample/of_patient/<user_id>')
@sample_blueprint.route('/sample/of_user/<user_id>')
def sample_of_user(user_id):
    user_id = int(user_id)
    samples = _sample_db.get_samples_of_patient(user_id)
    return jsonify([s.__dict__ for s in samples])
