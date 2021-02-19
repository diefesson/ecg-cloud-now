from injector import Module, Binder, SingletonScope
from pymysqlpool.pool import Pool

from infra.contract.db_repository import DbRepository
from infra.contract.user_db_repository import UserDbRepository
from infra.repository.db_respository_impl import DbRepositoryImpl
from infra.factory.connection_pool import connection_pool
from infra.repository.user_db_repository_impl import UserDbRepositoryImpl


class DbModule(Module):

    def configure(self, binder: Binder) -> None:
        binder.bind(Pool, connection_pool, scope=SingletonScope)
        binder.bind(DbRepository, DbRepositoryImpl, scope=SingletonScope)
        binder.bind(UserDbRepository, UserDbRepositoryImpl, scope=SingletonScope)
