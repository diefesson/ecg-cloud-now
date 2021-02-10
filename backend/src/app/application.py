from app.di.db_module import DbModule
from app.di.sample_module import SampleModule
from injector import Injector


injector = Injector([SampleModule(), DbModule()])
