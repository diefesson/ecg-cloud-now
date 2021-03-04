from abc import ABC
from abc import abstractmethod

from domain.entity.sample import Sample


class SampleDbRepository(ABC):

    @abstractmethod
    def get_all_samples(self) -> list[Sample]:
        pass

    @abstractmethod
    def get_sample(self, sample_id: int) -> Sample or None:
        pass

    @abstractmethod
    def get_samples_of_patient(self, patient_id: int) -> list[Sample]:
        pass