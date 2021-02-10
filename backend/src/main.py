from flask import Flask
from web.sample_endpoint import sample_endpoint

app: Flask = Flask(__name__)
app.register_blueprint(sample_endpoint)


@app.route('/')
def hello():
    return 'hello'


if __name__ == '__main__':
    app.run('0.0.0.0', 80)
