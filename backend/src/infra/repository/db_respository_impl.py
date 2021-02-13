from infra.contract.db_repository import DbRepository

from pymysqlpool.pool import Pool
from pymysql import Connection
from injector import inject


class DbRepositoryImpl(DbRepository):

    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def get_samples(self) -> []:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute('select * from ecg')
            samples = cur.fetchall()
            self._pool.release(conn)
            return samples

    def get_sample(self, sample_id: int) -> {}:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(f'select * from ecg where sample_id={sample_id}')
            sample = cur.fetchone()
            self._pool.release(conn)
            return sample
