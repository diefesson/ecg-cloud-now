from base64 import b64encode
from random import randint
from datetime import datetime, timedelta, timezone

_TOKEN_SIZE = 32
_EXPIRE_TIME = timedelta(days=1)


def _gen_token():
    encoded = b64encode(bytes([randint(0, 255) for _ in range(_TOKEN_SIZE)]))
    return str(encoded, "utf-8")


class Session:
    token: str
    user_id: int
    expire: datetime

    def __init__(self, user_id: int, token: str = None, expire: datetime = None):
        self.user_id = user_id
        self.token = token if token is not None else _gen_token()
        self.expire = expire if expire is not None else datetime.now() + _EXPIRE_TIME

    def as_dict(self):
        iso_expire = self.expire.astimezone(timezone.utc).isoformat()
        return {**self.__dict__, "expire": iso_expire}

    def expired(self) -> bool:
        return self.expire < datetime.now()

    @classmethod
    def from_row(cls, row):
        return cls(row["user_id"], row["token"], row["expire"])
