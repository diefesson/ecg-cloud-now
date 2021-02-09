from infra.contract.dbservice import DBService
from infra.entity.sample import Sample

from pymysqlpool.pool import Pool
from injector import inject
from pymysql.connections import Connection
from pymysql.cursors import Cursor


class DbServiceImpl(DBService):

    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def get_samples(self) -> Sample:
        pass