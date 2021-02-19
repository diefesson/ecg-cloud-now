from injector import inject
from pymysqlpool.pool import Pool

from domain.entity.credential import Credential
from domain.entity.user import User
from infra.contract.user_db_repository import UserDbRepository

_GET_USER = "select user_id, username, email from user where user_id = %s"
_ADD_USER = "insert into user(username, email, password_hash) values (%s, %s, %s)"
_HAS_USER = "select user_id from user where username = %s or email = %s"
_GET_CREDENTIAL = "select password_hash from user where username = %s"


class UserDbRepositoryImpl(UserDbRepository):
    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def get_user(self, user_id: int) -> User:
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_GET_USER, (user_id,))
            row = cur.fetchone()
            self._pool.release(conn)
            user = User.from_row(row) if row else None
            return user

    def add_user(self, username: str, email: str, password: str):
        values = (
            username,
            email,
            Credential.calculate_hash(username, password)
        )
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_ADD_USER, values)
            self._pool.release(conn)

    def has_user(self, username: str, email: str) -> bool:
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_HAS_USER, (username, email))
            exist = cur.fetchone() is not None
            self._pool.release(conn)
            return exist

    def get_credential(self, username: str) -> Credential:
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_GET_CREDENTIAL, (username,))
            row = cur.fetchone()
            password_hash = row["password_hash"] if row else None
            self._pool.release(conn)
            return Credential(username, password_hash)
