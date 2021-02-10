from abc import ABC
from abc import abstractmethod
from domain.entity.sample import Sample


class DbRepository(ABC):

    @abstractmethod
    def get_samples(self) -> Sample:
        pass
