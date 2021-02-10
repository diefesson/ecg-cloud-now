from abc import ABC
from abc import abstractmethod


class DbRepository(ABC):

    @abstractmethod
    def get_samples(self) -> []:
        pass
