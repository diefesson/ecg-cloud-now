from injector import inject
from domain.contract.patient_repository import PatientRepository
from domain.entity.patient import Patient
from infra.contract.db_repository import DbRepository


class PatientRepositoryImpl(PatientRepository):

    _db: DbRepository

    @inject
    def __init__(self, db: DbRepository):
        self._db = db

    def get_patients(self) -> []:
        return [Patient.from_row(r) for r in self._db.get_patients()]

    def get_patient(self, patient_id: int) -> {}:
        return Patient.from_row(self._db.get_patient(patient_id))


