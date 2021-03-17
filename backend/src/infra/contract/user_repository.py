from abc import ABC, abstractmethod
from typing import Optional

from domain.entity.user import User, UserType
from domain.entity.credential import Credential


# noinspection PyShadowingBuiltins
class UserRepository(ABC):

    @abstractmethod
    def get_user(self, user_id: int) -> User or None:
        pass

    @abstractmethod
    def get_users(self, type: Optional[UserType] = None) -> list[User]:
        pass

    @abstractmethod
    def username_to_user_id(self, username: str) -> Optional[int]:
        pass

    @abstractmethod
    def add_user(self, user: User, password: str):
        pass

    @abstractmethod
    def has_user(self, username: str, email: str) -> bool:
        pass

    @abstractmethod
    def is_user_of_type(self, user_id: int, type: UserType) -> bool:
        pass

    @abstractmethod
    def get_credential(self, username: str) -> Credential:
        pass
