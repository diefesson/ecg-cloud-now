from abc import ABC, abstractmethod

from domain.entity.user import User
from domain.entity.credential import Credential


class UserDbRepository(ABC):

    @abstractmethod
    def get_user(self, user_id: int) -> User:
        pass

    @abstractmethod
    def add_user(self, username: str, email: str, password: str):
        pass

    @abstractmethod
    def has_user(self, username: str, email: str) -> bool:
        pass

    @abstractmethod
    def get_credential(self, username: str) -> Credential:
        pass
