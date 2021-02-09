from abc import ABC
from abc import abstractmethod
from infra.entity.sample import Sample


class DBService(ABC):

    @abstractmethod
    def get_samples(self) -> Sample:
        pass
