from infra.contract.db_repository import DbRepository
from infra.repository.sql_queries import *

from pymysqlpool.pool import Pool
from pymysql import Connection
from injector import inject


class DbRepositoryImpl(DbRepository):

    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def get_all_samples(self) -> []:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(SELECT_ALL_SAMPLES)
            samples = cur.fetchall()
            self._pool.release(conn)
            return samples

    def get_sample(self, sample_id: int) -> {}:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(SELECT_SAMPLE.format(sample_id=sample_id))
            sample = cur.fetchone()
            self._pool.release(conn)
            return sample

    def get_samples_of_patient(self, patient_id: int) -> []:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(SELECT_SAMPLES_OF_PATIENT.format(patient_id=patient_id))
            rows = cur.fetchall()
            self._pool.release(conn)
            return rows

    def get_all_patients(self) -> {}:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(SELECT_ALL_PATIENTS)
            rows = cur.fetchall()
            self._pool.release(conn)
            return rows

    def get_patient(self, patient_id: int) -> {}:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(SELECT_PATIENT.format(patient_id=patient_id))
            row = cur.fetchone()
            self._pool.release(conn)
            return row
