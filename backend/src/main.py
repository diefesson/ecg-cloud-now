from flask import Flask
from flask_cors import CORS

import enviroment
from web.session_blueprint import session_blueprint
from web.user_blueprint import user_blueprint
from web.patient_blueprint import patient_blueprint
from web.sample_blueprint import sample_blueprint

app: Flask = Flask(__name__)
app.register_blueprint(sample_blueprint)
app.register_blueprint(patient_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(session_blueprint)

CORS(app)


@app.route('/')
def hello():
    return f"deploy mode: {enviroment.DEPLOY_MODE}"


app.run(enviroment.HTTP_HOST, enviroment.HTTP_PORT)
