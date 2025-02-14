import traceback

from flask import Flask
from flask_cors import CORS
from waitress import serve

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
CORS(app, origins=enviroment.FRONTEND_ORIGIN, supports_credentials=True)


@app.route('/')
def hello():
    return (f"deploy mode: {enviroment.DEPLOY_MODE}, "
            f"frontend origin: {enviroment.FRONTEND_ORIGIN}")


# noinspection PyUnusedLocal
@app.errorhandler(500)
def handle_internal(exception):
    tb = str(traceback.format_exc())
    return {"success": False, "cause": "Internal error", "traceback": tb}, 500


if enviroment.DEPLOY_MODE == "dev":
    app.run(enviroment.HTTP_HOST, enviroment.HTTP_PORT)
else:
    serve(app, host=enviroment.HTTP_HOST, port=enviroment.HTTP_PORT)
