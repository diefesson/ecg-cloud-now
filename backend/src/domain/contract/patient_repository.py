from abc import ABC, abstractmethod

from domain.entity.patient import Patient


class PatientRepository(ABC):

    @abstractmethod
    def get_all_patients(self) -> [Patient]:
        pass

    @abstractmethod
    def get_patient(self, patient_id: int) -> Patient:
        pass
