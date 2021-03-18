# Setup instructions

### Pre requirements

 - Python 3.9
 - MySQL

### 1. Virtual enviroment setup
Many Python modern IDEs already offer virtual enviroment creation and management.

The command bellow can be used to create a virtual enviroment in the folder "myenv" using the Python Venv module.

~~~ sh
python -m venv myenv
~~~

### 2. Virtual enviroment activation

#### On Linux

~~~ sh
source myenv/Scripts/activate
~~~

#### On Windows

~~~ bat
myenv\Scripts\activate.bat
~~~

### 3. Python dependecies

Inside the the virtual enviroment, to install all the necessary dependecies run.

~~~ sh
pip install -r requirements.txt
~~~

### 3. Configure the enviroment file

The application configuration can be loaded from enviroments variables,
or from file named ".env" created in the project root.

~~~ env
MYSQL_HOST=
MYSQL_PORT=
MYSQL_SCHEMA=
MYSQL_USER=
MYSQL_PASSWORD=
HTTP_HOST=
HTTP_PORT=
FRONTEND_ORIGIN=
~~~

The frontend origin must be specified to allow browser applications to consume the API
without raising CORS related errors.

### 4. Application execution

~~~ sh
python src/main.py
~~~
