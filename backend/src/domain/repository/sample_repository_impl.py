from domain.contract.sample_repository import SampleRepository
from domain.entity.sample import sample_from_row, Sample
from infra.contract.db_repository import DbRepository
from injector import inject


class SampleRepositoryImpl(SampleRepository):

    _db: DbRepository

    @inject
    def __init__(self, db: DbRepository):
        self._db = db

    def get_samples(self) -> [Sample]:
        rows = self._db.get_samples()
        return [sample_from_row(r) for r in rows]
