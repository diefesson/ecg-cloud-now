from domain.entity.sample import Sample
from infra.contract.sample_db_repository import SampleDbRepository

from pymysqlpool.pool import Pool
from pymysql import Connection
from injector import inject


class SampleDbRepositoryImpl(SampleDbRepository):
    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def get_all_samples(self) -> list[Sample]:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_SELECT_ALL_SAMPLES)
            rows = cur.fetchall()
            self._pool.release(conn)
            samples = [Sample.from_row(r) for r in rows]
            return samples

    def get_sample(self, sample_id: int) -> Sample or None:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_SELECT_SAMPLE, {'sample_id': sample_id})
            row = cur.fetchone()
            self._pool.release(conn)
            sample = Sample.from_row(row) if row else None
            return sample

    def get_samples_of_patient(self, patient_id: int) -> list[Sample]:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_SELECT_SAMPLES_OF_PATIENT, {'patient_id': patient_id})
            rows = cur.fetchall()
            self._pool.release(conn)
            samples = [Sample.from_row(r) for r in rows]
            return samples


_SELECT_SAMPLES_OF_PATIENT = 'select * from ecg where patient_id = %(patient_id)s'
_SELECT_ALL_SAMPLES: str = 'select * from ecg'
_SELECT_SAMPLE: str = 'select * from ecg where sample_id = %(sample_id)s'
