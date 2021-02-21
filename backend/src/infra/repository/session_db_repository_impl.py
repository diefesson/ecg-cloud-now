from datetime import datetime

from injector import inject
from pymysqlpool.pool import Pool

from domain.entity.session import Session
from infra.contract.session_db_repository import SessionDbRepository

_ADD_SESSION = "insert into session(token, user_id, expire) values (%s, %s, %s)"
_TOKEN_TO_USER_ID = "select user_id from session where token = %s"
_GET_SESSION = "select token, user_id, expire from session where token = %s"
_REMOVE_SESSION = "delete from session where token = %s"


class SessionDbRepositoryImpl(SessionDbRepository):
    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def add_session(self, login: Session):
        values = (login.token, login.user_id, login.expire)
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_ADD_SESSION, values)
            self._pool.release(conn)

    def get_session(self, token: str) -> Session or None:
        session = self._get_session(token)
        if session and session.expired():
            print(datetime.now())
            print(session.expire)
            self.remove_session(session.token)
            return None
        return session

    def _get_session(self, token: str) -> Session or None:
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_GET_SESSION, (token,))
            row = cur.fetchone()
            self._pool.release(conn)
            session = Session.from_row(row) if row else None
            return session

    def remove_session(self, token: str):
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_REMOVE_SESSION, (token,))
            self._pool.release(conn)
