from abc import ABC
from abc import abstractmethod


class DbRepository(ABC):

    @abstractmethod
    def get_samples(self) -> []:
        pass

    @abstractmethod
    def get_sample(self, sample_id) -> {}:
        pass
