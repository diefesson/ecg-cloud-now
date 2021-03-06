from abc import ABC, abstractmethod
from typing import Optional

from domain.entity.appointment import Appointment


class AppointmentRepository(ABC):

    @abstractmethod
    def add_appointment(self, appointment: Appointment):
        pass

    @abstractmethod
    def get_appointment(self, appointment_id: int) -> Optional[Appointment]:
        pass

    @abstractmethod
    def remove_appointment(self, appointment_id: int):
        pass

    @abstractmethod
    def get_appointments(self, medic_id: Optional[int], patient_id: Optional[int]) -> list[Appointment]:
        pass
