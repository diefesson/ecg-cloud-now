from injector import Module, Binder, SingletonScope
from pymysqlpool.pool import Pool

from infra.contract.sample_db_repository import SampleDbRepository
from infra.contract.patient_db_repository import PatientDbRepository
from infra.contract.user_db_repository import UserDbRepository
from infra.repository.sample_db_repository_impl import SampleDbRepositoryImpl
from infra.repository.user_db_repository_impl import UserDbRepositoryImpl
from infra.repository.patient_db_repository_impl import PatientDbRepositoryImpl
from infra.factory.connection_pool import connection_pool


class DbModule(Module):

    def configure(self, binder: Binder) -> None:
        binder.bind(Pool, connection_pool, scope=SingletonScope)
        binder.bind(SampleDbRepository, SampleDbRepositoryImpl, scope=SingletonScope)
        binder.bind(PatientDbRepository, PatientDbRepositoryImpl, scope=SingletonScope)
        binder.bind(UserDbRepository, UserDbRepositoryImpl, scope=SingletonScope)
