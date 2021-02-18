from domain.contract.sample_repository import SampleRepository
from domain.entity.sample import Sample
from infra.contract.db_repository import DbRepository
from injector import inject


class SampleRepositoryImpl(SampleRepository):

    _db: DbRepository

    @inject
    def __init__(self, db: DbRepository):
        self._db = db

    def get_all_samples(self) -> [Sample]:
        rows = self._db.get_all_samples()
        return [Sample.from_row(r) for r in rows]

    def get_sample(self, sample_id: int) -> Sample:
        row = self._db.get_sample(sample_id)
        return Sample.from_row(row)

    def get_samples_of_patient(self, patient_id: int) -> [Sample]:
        rows = self._db.get_samples_of_patient(patient_id)
        return [Sample.from_row(r) for r in rows]
