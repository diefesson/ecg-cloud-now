from py_dotenv import read_dotenv
from os import getenv

read_dotenv("../.env")

MYSQL_HOST = getenv("MYSQL_HOST", "127.0.0.1")
MYSQL_PORT = int(getenv("MYSQL_PORT", "3306"))
MYSQL_SCHEMA = getenv("MYSQL_SCHEMA", "ecn")
MYSQL_USER = getenv("MYSQL_USER")
MYSQL_PASSWORD = getenv("MYSQL_PASSWORD")