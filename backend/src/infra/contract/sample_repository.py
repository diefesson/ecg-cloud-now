from abc import ABC
from abc import abstractmethod
from typing import Optional

from domain.entity.sample import Sample


class SampleRepository(ABC):

    @abstractmethod
    def get_all_samples(self, patient_id: Optional[int]) -> list[Sample]:
        pass

    @abstractmethod
    def get_sample(self, sample_id: int) -> Sample or None:
        pass
