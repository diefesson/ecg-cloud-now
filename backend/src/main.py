from flask import Flask
from flask_cors import CORS

import enviroment
from web.patient_endpoint import patient_endpoint
from web.sample_endpoint import sample_endpoint

app: Flask = Flask(__name__)
app.register_blueprint(sample_endpoint)
app.register_blueprint(patient_endpoint)

CORS(app)


@app.route('/')
def hello():
    return 'hello'


if __name__ == '__main__':
    app.run('0.0.0.0', enviroment.HTTP_PORT)
