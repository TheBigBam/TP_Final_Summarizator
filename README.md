Abrir cada subcarpeta en Visual Code y abrir un nuevo terminal. 

Backend - Summarize
* pipenv shell

* pip install -r .\summarize_model-main\requirements.txt

* cd .\summarize_model-main\

* SET FLASK_APP=src/backend

* $env:FLASK_APP = "src/backend"

* python -m flask run

Frontend - text-analysis
* pipenv shell

* pip install -r .\text-analysis-web\requirements.txt

* cd \text-analysis-web\

* python -m flask run -h localhost -p 3001
