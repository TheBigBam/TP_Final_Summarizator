from http import HTTPStatus

from flask import Flask, jsonify, make_response

from backend.model.web import model_blueprint, model_blueprint2

__version__ = "0.0.1"
__author__ = 'Richard Cancino'

def BackendApplication():
    app = Flask("backend")
    app.register_blueprint(model_blueprint)
    app.register_blueprint(model_blueprint2)
    
    @app.route("/")
    def metadata():
        return make_response(jsonify(version=__version__), HTTPStatus.OK)

    return app
