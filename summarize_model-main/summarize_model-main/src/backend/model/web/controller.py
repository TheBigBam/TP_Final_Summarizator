from http import HTTPStatus

from backend.model import T5Model
from backend.model import BARTModel
from flask import Blueprint, jsonify, make_response, request

model_blueprint = Blueprint("predict", __name__, url_prefix="/predict")
model_blueprint2 = Blueprint("predict2", __name__, url_prefix="/predict2")

Model = T5Model()


@model_blueprint.route("/", methods=["POST"])
def summarize():
    return make_response(
        jsonify(Model.generate_summary(request.get_json())), HTTPStatus.OK
    )
    
Model2 = BARTModel()

@model_blueprint2.route("/", methods=["POST"])
def summarize():
    return make_response(
        jsonify(Model2.generate_summary(request.get_json())), HTTPStatus.OK
    )

