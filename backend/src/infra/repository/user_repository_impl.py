from typing import Optional

from injector import inject
from pymysqlpool.pool import Pool
from pypika import Table, MySQLQuery, FormatParameter

from domain.entity.credential import Credential
from domain.entity.user import User, UserType
from infra.contract.user_repository import UserRepository

_u = Table("user")
_user_fields = ["user_id",
                "username",
                "email",
                "name",
                "phone",
                "type",
                "id_doc",
                "state",
                "city",
                "district",
                "address"
                ]
_credential_fields = ["username", "password_hash"]
_insert_user = MySQLQuery().into(_u).columns(*_user_fields, "password_hash").insert(*[FormatParameter()] * 12)
_select_user = MySQLQuery().from_(_u).select(*_user_fields)
_select_user_by_id = _select_user.where(_u.user_id == FormatParameter())
_select_user_by_id_and_type = _select_user_by_id.where(_u.type == FormatParameter())
_select_user_by_username = _select_user.where(_u.username == FormatParameter())
_select_user_by_username_or_email = _select_user.where(
    (_u.username == FormatParameter()) | (_u.email == FormatParameter())
)
_select_credential = MySQLQuery().from_(_u).select(*_credential_fields).where(
    _u.username == FormatParameter()
)


# noinspection PyShadowingBuiltins
class UserDbRepositoryImpl(UserRepository):
    _pool: Pool

    @inject
    def __init__(self, pool: Pool):
        self._pool = pool

    def get_user(self, user_id: int) -> Optional[User]:
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(_select_user_by_id), (user_id,))
            row = cur.fetchone()
        self._pool.release(conn)
        user = self._row_to_user(row) if row else None
        return user

    def get_users(self, type: Optional[UserType] = None) -> list[User]:
        query = _select_user
        parameters = ()
        if type is not None:
            query = query.where(_u.type == FormatParameter())
            parameters += (type.value,)
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(query), parameters)
            rows = cur.fetchall()
        self._pool.release(conn)
        return [self._row_to_user(r) for r in rows]

    def add_user(self, user: User, password: str):
        parameters = self._user_to_parameters(user, password)
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(_insert_user), parameters)
        self._pool.release(conn)

    def has_user(self, username: str, email: str) -> bool:
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(_select_user_by_username_or_email), (username, email))
            exist = cur.fetchone() is not None
        self._pool.release(conn)
        return exist

    def username_to_user_id(self, username: str) -> Optional[int]:
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(_select_user_by_username), (username,))
            row = cur.fetchone()
        self._pool.release(conn)
        return row["user_id"] if row else None

    def is_user_of_type(self, user_id: int, type: UserType) -> bool:
        parameters = (user_id, type.value)
        conn = self._pool.get_conn()
        with conn.cursor as cur:
            cur.execute(str(_select_user_by_id_and_type), parameters)
            row = cur.fetchone()
        self._pool.release(conn)
        if not row:
            return False
        return row["type"] == type.value

    def get_credential(self, username: str) -> Credential or None:
        conn = self._pool.get_conn()
        with conn.cursor() as cur:
            cur.execute(str(_select_credential), (username,))
            row = cur.fetchone()
        self._pool.release(conn)
        return self._row_to_credential(row) if row else None

    @staticmethod
    def _user_to_parameters(user: User, password: str) -> tuple:
        return (
            user.user_id,
            user.username,
            user.email,
            user.name,
            user.phone,
            user.type,
            user.id_doc,
            user.state,
            user.city,
            user.district,
            user.address,
            Credential.calculate_hash(user.username, password)
        )

    @staticmethod
    def _row_to_user(row: dict) -> User:
        return User(
            user_id=row["user_id"],
            username=row["username"],
            email=row["email"],
            name=row["name"],
            phone=row["phone"],
            type=row["type"],
            id_doc=row["id_doc"],
            state=row["state"],
            city=row["city"],
            district=row["district"],
            address=row["address"],
        )

    @staticmethod
    def _row_to_credential(row: dict) -> Credential:
        return Credential(
            username=row["username"],
            password=row["password_hash"]
        )
