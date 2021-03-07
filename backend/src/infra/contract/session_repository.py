from abc import ABC, abstractmethod
from typing import Optional

from domain.entity.session import Session


class SessionRepository(ABC):

    @abstractmethod
    def add_session(self, login: Session):
        pass

    @abstractmethod
    def get_session(self, token: str) -> Optional[Session]:
        pass

    @abstractmethod
    def remove_session(self, token: str):
        pass
