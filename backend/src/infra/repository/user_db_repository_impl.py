from injector import inject
from pymysqlpool.pool import Pool

from domain.entity.credential import Credential
from domain.entity.user import User
from infra.contract.user_db_repository import UserDbRepository

_USER_FIELDS = "username, email, name, type, id_doc, phone, state, city, district, address"
_GET_USER = f"select user_id, {_USER_FIELDS} from user where user_id = %s"
_GET_USERS = f"select user_id, {_USER_FIELDS} from user"
_USERNAME_TO_USER_ID = "select user_id from user where username = %s"
_ADD_USER = f"insert into user({_USER_FIELDS}, password_hash) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
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

    def get_users(self, type: int or None = None) -> list[User]:
        sql = _GET_USERS
        values = ()
        if type is not None:
            sql += " where type = %s"
            values += (type,)
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(sql, values)
            rows = cur.fetchall()
            self._pool.release(conn)
            return [User.from_row(r) for r in rows]

    def username_to_user_id(self, username: str) -> int or None:
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_USERNAME_TO_USER_ID, (username,))
            row = cur.fetchone()
            self._pool.release(conn)
            user_id = row["user_id"] if row else None
            return user_id

    def add_user(self, user: User, password: str):
        values = (
            user.username,
            user.email,
            user.name,
            user.type,
            user.id_doc,
            user.phone,
            user.state,
            user.city,
            user.district,
            user.address,
            Credential.calculate_hash(user.username, password)
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

    def get_credential(self, username: str) -> Credential or None:
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(_GET_CREDENTIAL, (username,))
            row = cur.fetchone()
            password_hash = row["password_hash"] if row else None
            self._pool.release(conn)
            return Credential(username, password_hash)
