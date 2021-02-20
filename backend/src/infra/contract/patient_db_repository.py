from abc import ABC, abstractmethod

from domain.entity.patient import Patient


class PatientDbRepository(ABC):

    @abstractmethod
    def get_all_patients(self) -> list[Patient]:
        pass

    @abstractmethod
    def get_patient(self, patient_id: int) -> Patient or None:
        pass
