from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita o CORS para todas as rotas

@app.route('/report-fire', methods=['POST'])
def report_fire():
    data = request.json
    print(data)
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    intensidade = data.get('intensidade')
    dataFoco = data.get('dataFoco')
    
    return jsonify(message='Dados recebidos com sucesso')

if __name__ == '__main__':
    app.run(port=3000)
