from flask import Flask, render_template, jsonify, request

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf'}

app = Flask(__name__)
app.secret_key = '123dJSi&JHD$jJDnk754'

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def send_message():
    text = request.form['message']
    response   = request.post('http://127.0.0.1:5000/test', json=text)
    print(response.text())
    answer = 'texto'
    response_text = { "message":  answer }
    return jsonify(response_text)

@app.route('/test', methods=['POST'])
def test_message():
    answer='texto'
    return jsonify(answer)

if __name__ == '__main__':
    app.run(debug=True)