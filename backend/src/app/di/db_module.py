from injector import Module, Binder, SingletonScope
from pymysqlpool.pool import Pool

from infra.contract.appointment_repository import AppointmentRepository
from infra.contract.sample_repository import SampleRepository
from infra.contract.user_repository import UserRepository
from infra.contract.session_repository import SessionRepository
from infra.repository.appointment_repository_impl import AppointmentRepositoryImpl
from infra.repository.sample_repository_impl import SampleDbRepositoryImpl
from infra.repository.user_repository_impl import UserDbRepositoryImpl
from infra.repository.session_repository_impl import SessionDbRepositoryImpl
from infra.factory.connection_pool import connection_pool


class DbModule(Module):

    def configure(self, binder: Binder) -> None:
        binder.bind(Pool, connection_pool, scope=SingletonScope)
        binder.bind(SampleRepository, SampleDbRepositoryImpl, scope=SingletonScope)
        binder.bind(UserRepository, UserDbRepositoryImpl, scope=SingletonScope)
        binder.bind(SessionRepository, SessionDbRepositoryImpl, scope=SingletonScope)
        binder.bind(AppointmentRepository, AppointmentRepositoryImpl, scope=SingletonScope)
