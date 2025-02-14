from dotenv import load_dotenv
from os import getenv

load_dotenv("../.env")

MYSQL_HOST = getenv("MYSQL_HOST", "127.0.0.1")
MYSQL_PORT = int(getenv("MYSQL_PORT", "3306"))
MYSQL_SCHEMA = getenv("MYSQL_SCHEMA", "ecn")
MYSQL_USER = getenv("MYSQL_USER")
MYSQL_PASSWORD = getenv("MYSQL_PASSWORD")

HTTP_HOST = getenv("HTTP_HOST", "0.0.0.0")
HTTP_PORT = int(getenv("HTTP_PORT", "8080"))

FRONTEND_ORIGIN = getenv("FRONTEND_ORIGIN", "http://localhost:3000")

DEPLOY_MODE = getenv("DEPLOY_MODE", "dev")
