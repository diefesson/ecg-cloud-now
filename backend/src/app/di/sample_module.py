from injector import Module, Binder, singleton

from domain.contract.sample_repository import SampleRepository
from domain.repository.sample_repository_impl import SampleRepositoryImpl


class SampleModule(Module):

    def configure(self, binder: Binder) -> None:
        binder.bind(SampleRepository, SampleRepositoryImpl, scope=singleton)
