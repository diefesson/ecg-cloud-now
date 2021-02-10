from abc import ABC
from abc import abstractmethod

from domain.entity.sample import Sample


class SampleRepository(ABC):

    @abstractmethod
    def get_samples(self) -> [Sample]:
        pass
