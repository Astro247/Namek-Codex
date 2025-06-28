from flask import Flask, render_template, request, jsonify
from charInfos import charactersInfo, charactersNames

app = Flask(__name__)


@app.route('/')
def goToHome():
    return render_template('home.html', page='home')


@app.route('/characters')
def goToChar():
    return render_template('characters.html', page='char')


@app.route('/getCharInfo', methods=['POST'])
def charInfo():
    datas = request.get_json()
    charName = str(charactersNames[int(datas['index'])])
    charDesc = str(charactersInfo[int(datas['index'])])
    return jsonify({"name": charName, "desc": charDesc})


@app.route('/sagas')
def goToSagas():
    return render_template('sagas.html', page='sagas')


def create_app():
    return app


if __name__ == '__main__':
    app.run(debug=True)
