from injector import Module, Binder, singleton

from domain.contract.patient_repository import PatientRepository
from domain.repository.patient_repository_impl import PatientRepositoryImpl


class PatientModule(Module):

    def configure(self, binder: Binder) -> None:
        binder.bind(PatientRepository, PatientRepositoryImpl, scope=singleton)
