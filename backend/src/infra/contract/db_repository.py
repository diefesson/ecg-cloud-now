from abc import ABC
from abc import abstractmethod


class DbRepository(ABC):

    @abstractmethod
    def get_samples(self) -> []:
        pass

    @abstractmethod
    def get_sample(self, sample_id: int) -> {}:
        pass

    @abstractmethod
    def get_samples_of_patient(self, patient_id: int) -> []:
        pass

    @abstractmethod
    def get_patients(self) -> []:
        pass

    @abstractmethod
    def get_patient(self, patient_id: int) -> {}:
        pass
