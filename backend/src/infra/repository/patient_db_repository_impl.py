from injector import inject
from pymysql import Connection
from pymysqlpool.pool import Pool

from domain.entity.patient import Patient
from infra.contract.patient_db_repository import PatientDbRepository


class PatientDbRepositoryImpl(PatientDbRepository):
    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def get_all_patients(self) -> list[Patient]:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_SELECT_ALL_PATIENTS)
            rows = cur.fetchall()
            self._pool.release(conn)
            patients = [Patient.from_row(r) for r in rows]
            return patients

    def get_patient(self, patient_id: int) -> Patient or None:
        conn: Connection = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_SELECT_PATIENT, {'patient_id': patient_id})
            row = cur.fetchone()
            self._pool.release(conn)
            patient = Patient.from_row(row) if row else None
            return patient


_PATIENT_FIELDS: str = 'patient_id, cpf, name, details, email, phone, address, cep, cns'
_SELECT_ALL_PATIENTS: str = f'select {_PATIENT_FIELDS} from patient'
_SELECT_PATIENT: str = f'select {_PATIENT_FIELDS} from patient where patient_id = %(patient_id)s'
