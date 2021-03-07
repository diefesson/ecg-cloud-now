from flask import Blueprint, request

from app.application import injector
from domain.entity.sample import Sample
from infra.contract.sample_repository import SampleRepository

sample_blueprint = Blueprint('sample_blueprint', __name__)
_sample_repository = injector.get(SampleRepository)


@sample_blueprint.route("/sample/all", methods=["GET"])
def sample_all():
    patient_id = request.args.get("patient_id")
    try:
        if patient_id is not None:
            patient_id = int(patient_id)
    except ValueError:
        return {"success": False, "cause": "Bad request"}, 400
    samples = _sample_repository.get_all_samples(patient_id)
    samples = [sample_to_json(s) for s in samples]
    return {"success": True, "samples": samples}


@sample_blueprint.route("/sample/<sample_id>", methods=["GET"])
def sample_get(sample_id):
    try:
        sample_id = int(sample_id)
    except ValueError:
        return {"success": False, "cause": "Bad request"}, 400
    sample: Sample = _sample_repository.get_sample(sample_id)
    if not sample:
        return {"success": False, "cause": "Not found"}, 404
    return {"success": True, "sample": sample_to_json(sample)}


def sample_to_json(sample: Sample):
    return {
        "sampleId": sample.sample_id,
        "patientId": sample.patient_id,
        "timestamp": sample.timestamp,
        "frequency": sample.frequency,
        "data": sample.raw
    }
