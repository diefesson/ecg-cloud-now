from flask import Flask
from flask_cors import CORS

import enviroment
from web.appointment_blueprint import appointment_blueprint
from web.sample_blueprint import sample_blueprint
from web.session_blueprint import session_blueprint
from web.user_blueprint import user_blueprint

app: Flask = Flask(__name__)
app.register_blueprint(sample_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(session_blueprint)
app.register_blueprint(appointment_blueprint)
CORS(app, origin=enviroment.FRONTEND_ORIGIN, supports_credentials=True)


@app.route('/')
def hello():
    return (f"deploy mode: {enviroment.DEPLOY_MODE}, "
            f"frontend origin: {enviroment.FRONTEND_ORIGIN}")


# noinspection PyUnusedLocal
@app.errorhandler(500)
def handle_internal(exception):
    return {"success": False, "cause": "Internal error"}, 500


app.run(enviroment.HTTP_HOST, enviroment.HTTP_PORT)
