from datetime import datetime, date, timedelta, timezone
from typing import Optional

from injector import inject
from pymysqlpool.pool import Pool
from pypika import MySQLQuery, Table, FormatParameter

from domain.entity.appointment import Appointment, AppointmentStatus
from infra.contract.appointment_repository import AppointmentRepository

_ap = Table("appointment")
_fields = ["medic_id", "patient_id", "status", "time"]
_insert = MySQLQuery().into(_ap).columns(*_fields).insert(*[FormatParameter()] * 4)
_update_status = MySQLQuery().update(_ap) \
    .set(_ap.status, FormatParameter()) \
    .where(_ap.appointment_id == FormatParameter())
_select = MySQLQuery().from_(_ap).select(_ap.appointment_id, *_fields)
_delete = MySQLQuery().from_(_ap).delete().where(_ap.appointment_id == FormatParameter())
_select_time = MySQLQuery.from_(_ap).select(_ap.time)

brasilia_tz = -3
work_time_division = timedelta(minutes=30)
morning_start = timedelta(hours=7 - brasilia_tz)
afternoon_start = timedelta(hours=13 - brasilia_tz)
morning_count = 8
afternoon_count = 8


class AppointmentRepositoryImpl(AppointmentRepository):
    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def add_appointment(self, appointment: Appointment):
        values = (appointment.medic_id, appointment.patient_id, appointment.status.value, appointment.time)
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

    def get_scheduled_times(self, medic_id: int, d: date):
        start = datetime(d.year, d.month, d.day, tzinfo=timezone.utc) + morning_start
        end = start + timedelta(hours=24)
        values = (medic_id, start, end)
        query = _select_time\
            .where(_ap.medic_id == FormatParameter()) \
            .where(FormatParameter() <= _ap.time)\
            .where(_ap.time < FormatParameter())
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(query), values)
            rows = cur.fetchall()
        self._pool.release(conn)
        return [r["time"].replace(tzinfo=timezone.utc) for r in rows]

    def get_available_times(self, medic_id: int, d: date) -> list[datetime]:
        now = datetime.now(timezone.utc)
        wts = self.generate_work_times(d)
        scheduled_times = self.get_scheduled_times(medic_id, d)
        return [t for t in wts if t > now and t not in scheduled_times]

    def is_available_time(self, medic_id: int, time: datetime) -> bool:
        return time in self.get_available_times(medic_id, time.date())

    @staticmethod
    def generate_work_times(d: date) -> list[datetime]:
        dt = datetime(d.year, d.month, d.day, tzinfo=timezone.utc)
        morning = [morning_start + work_time_division * i for i in range(morning_count)]
        afternoon = [afternoon_start + work_time_division * i for i in range(afternoon_count)]
        total = morning + afternoon
        return [dt + t for t in total]

    @staticmethod
    def row_to_appointment(row: dict) -> Appointment:
        return Appointment(appointment_id=row["appointment_id"],
                           medic_id=row["medic_id"],
                           patient_id=row["patient_id"],
                           status=AppointmentStatus(row["status"]),
                           time=row["time"].replace(tzinfo=timezone.utc))
