from infra.contract.db_repository import DbRepository
from domain.entity.sample import Sample

from pymysqlpool.pool import Pool
from injector import inject


class DbRepositoryImpl(DbRepository):

    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def get_samples(self) -> Sample:
        pass