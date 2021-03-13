from datetime import timezone
from typing import Optional

from injector import inject
from pymysqlpool.pool import Pool
from pypika import Table, MySQLQuery, FormatParameter

from domain.entity.session import Session
from infra.contract.session_repository import SessionRepository

_ADD_SESSION = "insert into session(token, user_id, expire) values (%s, %s, %s)"
_TOKEN_TO_USER_ID = "select user_id from session where token = %s"
_GET_SESSION = "select token, user_id, expire from session where token = %s"
_REMOVE_SESSION = "delete from session where token = %s"

_s = Table("session")
_session_fields = ["token", "user_id", "expire"]
_insert_session = MySQLQuery().into(_s).columns(*_session_fields).insert(*[FormatParameter()] * 3)
_select_session = MySQLQuery().from_(_s).select(*_session_fields).where(_s.token == FormatParameter())
_delete_session = MySQLQuery().from_(_s).delete().where(_s.token == FormatParameter())


class SessionDbRepositoryImpl(SessionRepository):
    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def add_session(self, login: Session):
        parameters = (login.token, login.user_id, login.expire)
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(_insert_session), parameters)
        self._pool.release(conn)

    def get_session(self, token: str) -> Optional[Session]:
        session = self._get_session(token)
        if session and session.expired():
            self.remove_session(session.token)
            return None
        return session

    def _get_session(self, token: str) -> Session or None:
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(_select_session), (token,))
            row = cur.fetchone()
        self._pool.release(conn)
        return self.row_to_session(row) if row else None

    def remove_session(self, token: str):
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(_delete_session), (token,))
        self._pool.release(conn)

    @staticmethod
    def row_to_session(row) -> Session:
        return Session(
            row["user_id"],
            row["token"],
            row["expire"].replace(tzinfo=timezone.utc)
        )
