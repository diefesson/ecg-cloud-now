from injector import Module, Binder, singleton
from pymysqlpool.pool import Pool

from infra.contract.db_repository import DbRepository
from infra.repository.db_respository_impl import DbRepositoryImpl
from infra.factory.connection_pool import connection_pool


class DbModule(Module):

    def configure(self, binder: Binder) -> None:
        binder.bind(Pool, connection_pool, scope=singleton)
        binder.bind(DbRepository, DbRepositoryImpl, scope=singleton)
