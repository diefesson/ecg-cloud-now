from flask.app import Flask

app: Flask = Flask(import_name="test application")


@app.route("/")
def index():
    return "it works"


if __name__ == "__main__":
    try:
        app.run(host="0.0.0.0", port=8080, debug=True)
    except KeyboardInterrupt:
        pass
