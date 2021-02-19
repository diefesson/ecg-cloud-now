from abc import ABC
from abc import abstractmethod


class DbRepository(ABC):

    @abstractmethod
    def get_all_samples(self) -> list:
        pass

    @abstractmethod
    def get_sample(self, sample_id: int) -> dict:
        pass

    @abstractmethod
    def get_samples_of_patient(self, patient_id: int) -> list:
        pass

    @abstractmethod
    def get_all_patients(self) -> list:
        pass

    @abstractmethod
    def get_patient(self, patient_id: int) -> dict:
        pass
