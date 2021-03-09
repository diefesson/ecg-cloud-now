from typing import Optional

from injector import inject
from pymysqlpool.pool import Pool
from pypika import MySQLQuery, Table, FormatParameter

from domain.entity.appointment import Appointment, AppointmentStatus
from infra.contract.appointment_repository import AppointmentRepository

_ap = Table("appointment")
_fields = ["medic_id", "patient_id", "status"]
_insert = MySQLQuery().into(_ap).columns(*_fields).insert(*[FormatParameter()] * 3)
_update_status = MySQLQuery().update(_ap) \
    .set(_ap.status, FormatParameter()) \
    .where(_ap.appointment_id == FormatParameter())
_select = MySQLQuery().from_(_ap).select(_ap.appointment_id, *_fields)
_delete = MySQLQuery().from_(_ap).delete().where(_ap.appointment_id == FormatParameter())


class AppointmentRepositoryImpl(AppointmentRepository):
    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def add_appointment(self, appointment: Appointment):
        values = (appointment.medic_id, appointment.patient_id, appointment.status.value)
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_insert.get_sql(), values)
        self._pool.release(conn)

    def get_appointment(self, appointment_id: int) -> Optional[Appointment]:
        query = _select.where(_ap.appointment_id == FormatParameter())
        values = (appointment_id,)
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(query.get_sql(), values)
            row = cur.fetchone()
        self._pool.release(conn)
        return self.row_to_appointment(row) if row else None

    def remove_appointment(self, appointment_id: int):
        values = (appointment_id,)
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_delete.get_sql(), values)
        self._pool.release(conn)

    def set_appointment_status(self, appointment_id: int, status: AppointmentStatus):
        values = (status.value, appointment_id)
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_update_status.get_sql(), values)
        self._pool.release(conn)

    def get_appointments(self, medic_id: Optional[int] = None, patient_id: Optional[int] = None) -> list[Appointment]:
        query = _select
        values = ()
        if medic_id:
            query = query.where(_ap.medic_id == FormatParameter())
            values += (medic_id,)
        if patient_id:
            query = query.where(_ap.patient_id == FormatParameter())
            values += (patient_id,)
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(query.get_sql(), values)
            rows = cur.fetchall()
        self._pool.release(conn)
        return [self.row_to_appointment(r) for r in rows]

    @staticmethod
    def row_to_appointment(row: dict) -> Appointment:
        return Appointment(appointment_id=row["appointment_id"],
                           medic_id=row["medic_id"],
                           patient_id=row["patient_id"],
                           status=AppointmentStatus(row["status"]))