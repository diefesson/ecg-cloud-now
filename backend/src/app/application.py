from app.di.db_module import DbModule
from injector import Injector


injector = Injector([DbModule()])
