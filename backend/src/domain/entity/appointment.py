from enum import Enum


class AppointmentStatus(Enum):
    PENDING = 0
    DONE = 1


class Appointment:
    appointment_id: int
    medic_id: int
    patient_id: int
    status: AppointmentStatus

    def __init__(self, appointment_id: int, medic_id: int, patient_id: int, status: AppointmentStatus or int):
        self.appointment_id = appointment_id
        self.medic_id = medic_id
        self.patient_id = patient_id
        self.status = status if isinstance(status, AppointmentStatus) else AppointmentStatus(status)

    def json_dict(self) -> dict:
        return {
            "appointmentId": self.appointment_id,
            "medicId": self.medic_id,
            "patientId": self.medic_id,
            "status": self.status.value
        }
