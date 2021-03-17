from enum import Enum


class UserType(Enum):
    PATIENT = 0
    MEDIC = 1

    @classmethod
    def has_value(cls, value: int) -> bool:
        return value in (ut.value for ut in cls)


# noinspection PyShadowingBuiltins
class User:
    user_id: int
    username: str
    email: str
    name: str
    phone: str
    type: UserType
    id_doc: str
    state: str
    city: str
    district: str
    address: str

    def __init__(self, username: str, email: str, name: str, phone: str,
                 type: UserType, id_doc: str, state: str, city: str,
                 district: str, address: str, user_id: int = None
                 ):
        self.user_id = user_id
        self.username = username
        self.email = email
        self.name = name
        self.phone = phone
        self.type = type
        self.id_doc = id_doc
        self.state = state
        self.city = city
        self.district = district
        self.address = address
