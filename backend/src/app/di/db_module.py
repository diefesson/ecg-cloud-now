from injector import Module, Binder, SingletonScope
from pymysqlpool.pool import Pool

from infra.contract.appointment_repository import AppointmentRepository
from infra.contract.sample_db_repository import SampleDbRepository
from infra.contract.user_db_repository import UserDbRepository
from infra.contract.session_db_repository import SessionDbRepository
from infra.repository.appointment_repository_impl import AppointmentRepositoryImpl
from infra.repository.sample_db_repository_impl import SampleDbRepositoryImpl
from infra.repository.user_db_repository_impl import UserDbRepositoryImpl
from infra.repository.session_db_repository_impl import SessionDbRepositoryImpl
from infra.factory.connection_pool import connection_pool


class DbModule(Module):

    def configure(self, binder: Binder) -> None:
        binder.bind(Pool, connection_pool, scope=SingletonScope)
        binder.bind(SampleDbRepository, SampleDbRepositoryImpl, scope=SingletonScope)
        binder.bind(UserDbRepository, UserDbRepositoryImpl, scope=SingletonScope)
        binder.bind(SessionDbRepository, SessionDbRepositoryImpl, scope=SingletonScope)
        binder.bind(AppointmentRepository, AppointmentRepositoryImpl, scope=SingletonScope)
