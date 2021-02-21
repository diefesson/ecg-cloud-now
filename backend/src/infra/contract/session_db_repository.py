from abc import ABC, abstractmethod

from domain.entity.session import Session


class SessionDbRepository(ABC):

    @abstractmethod
    def add_session(self, login: Session):
        pass

    @abstractmethod
    def get_session(self, token: str) -> Session or None:
        pass

    @abstractmethod
    def remove_session(self, token: str):
        pass
