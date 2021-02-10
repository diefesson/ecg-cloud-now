from domain.contract.sample_repository import SampleRepository
from domain.entity.sample import Sample, sample_from_row
from infra.contract.db_repository import DbRepository
from injector import inject


class SampleRepositoryImpl(SampleRepository):

    _db: DbRepository

    @inject
    def __init__(self, db: DbRepository):
        self._db = db

    def get_samples(self):
        rows = self._db.get_samples()
        return [sample_from_row(r) for r in rows]
