from typing import Optional

from pypika import Table, MySQLQuery, FormatParameter

from domain.entity.sample import Sample
from infra.contract.sample_repository import SampleRepository

from pymysqlpool.pool import Pool
from pymysql import Connection
from injector import inject

_s = Table("ecg")
_sample_fields = ["sample_id", "patient_id", "timestamp", "frequency", "raw"]
_select_sample = MySQLQuery().from_(_s).select(*_sample_fields)


class SampleDbRepositoryImpl(SampleRepository):
    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def get_all_samples(self, patient_id: Optional[int] = None) -> list[Sample]:
        parameters = ()
        query = _select_sample
        if patient_id:
            query = query.where(_s.patient_id == FormatParameter())
            parameters += (patient_id,)
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(query), parameters)
            rows = cur.fetchall()
        self._pool.release(conn)
        return [self.row_to_sample(r) for r in rows]

    def get_sample(self, sample_id: int) -> Sample or None:
        parameters = (sample_id,)
        query = _select_sample.where(_s.sample_id == FormatParameter())
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(query), parameters)
            row = cur.fetchone()
        self._pool.release(conn)
        sample = self.row_to_sample(row) if row else None
        return sample

    @staticmethod
    def row_to_sample(row: dict) -> Sample:
        return Sample(
            sample_id=row['sample_id'],
            patient_id=row['patient_id'],
            timestamp=int(row['timestamp'].timestamp()),
            frequency=row['frequency'],
            raw=row['raw']
        )
