from abc import ABC
from abc import abstractmethod

from domain.entity.sample import Sample


class SampleRepository(ABC):

    @abstractmethod
    def get_samples(self) -> [Sample]:
        pass

    @abstractmethod
    def get_sample(self, sample_id: int) -> Sample:
        pass

    @abstractmethod
    def get_samples_of_patient(self, patient_id: int) -> [Sample]:
        pass
