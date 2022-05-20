from .backend import BackendApplication
from flask_cors import CORS

application = BackendApplication()
CORS(application)