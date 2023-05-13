from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

@app.route('/sitr', methods=['GET'])
def get_data():
    # update = 'https://sitr.cnd.com.pa/m/pub/data/flow.json'
    data = 'https://sitr.cnd.com.pa/m/pub/data/gen.json'

    # updateRest = requests.get(update)
    dataRest = requests.get(data)
    dataJson = dataRest.json()
    # combined_data = {
    #     'update':updateRest.json(),
    #     'data': dataRest.json()
    # }

    # return jsonify(combined_data)
    result = {
        'TipoDeGeneracion': dataJson['pie'],
        'TipoDePlanta': dataJson['pie2'],
        'Fecha':  dataJson['update']
    }

    return jsonify(result)

# if __name__ == '__main__':
#     app.run()

def create_app():
   return app