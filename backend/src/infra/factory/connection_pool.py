from app.enviroment import *
from pymysqlpool.pool import Pool

connection_pool = Pool(
    host=MYSQL_HOST,
    port=MYSQL_PORT,
    db=MYSQL_SCHEMA,
    user=MYSQL_USER,
    password=MYSQL_PASSWORD
)