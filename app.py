from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint
from werkzeug.exceptions import BadRequest
import os

# Configuración de Flask
app = Flask(__name__)

# Configuración de la base de datos
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///' + os.path.join(basedir, 'caballeros.db'))
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar SQLAlchemy
db = SQLAlchemy(app)

# Configuración de Swagger UI
SWAGGER_URL = '/api/docs'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Caballeros del Zodiaco API"
    }
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

# Modelo de Base de Datos
class Caballero(db.Model):
    """
    Modelo de datos para Caballeros del Zodiaco
    """
    __tablename__ = 'caballeros'
    
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    edad = db.Column(db.Integer)
    altura = db.Column(db.Float)
    constelacion = db.Column(db.String(100))
    imagen_url = db.Column(db.String(500), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'edad': self.edad,
            'altura': self.altura,
            'constelacion': self.constelacion,
            'imagen_url': self.imagen_url
        }

# Rutas de la API

@app.route('/', methods=['GET'])
def home():
    """
    Endpoint principal que muestra información de la API
    """
    return jsonify({
        'mensaje': 'API de Caballeros del Zodiaco',
        'version': '1.0.0',
        'endpoints': {
            'consultar_todos': '/api/caballeros',
            'consultar_por_id': '/api/caballeros/<id>',
            'insertar': '/api/caballeros',
            'swagger': '/api/docs'
        }
    })

@app.route('/api/caballeros', methods=['GET'])
def obtener_todos():
    """
    Microservicio de consulta - Obtiene todos los caballeros
    
    ---
    tags:
      - Consulta
    responses:
      200:
        description: Lista de todos los caballeros
        schema:
          type: object
          properties:
            total:
              type: integer
            caballeros:
              type: array
    """
    try:
        caballeros = Caballero.query.all()
        return jsonify({
            'total': len(caballeros),
            'caballeros': [caballero.to_dict() for caballero in caballeros]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/caballeros/<int:id>', methods=['GET'])
def obtener_por_id(id):
    """
    Microservicio de consulta - Obtiene un caballero por ID
    
    ---
    tags:
      - Consulta
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID del caballero
    responses:
      200:
        description: Datos del caballero
      404:
        description: Caballero no encontrado
    """
    try:
        caballero = Caballero.query.get_or_404(id)
        return jsonify(caballero.to_dict()), 200
    except Exception as e:
        return jsonify({'error': 'Caballero no encontrado'}), 404

@app.route('/api/caballeros', methods=['POST'])
def insertar():
    """
    Microservicio de inserción - Crea un nuevo caballero
    
    ---
    tags:
      - Inserción
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - nombre
            - imagen_url
          properties:
            nombre:
              type: string
              description: Nombre del caballero
            edad:
              type: integer
              description: Edad del caballero
            altura:
              type: number
              description: Altura en cm
            constelacion:
              type: string
              description: Constelación del caballero
            imagen_url:
              type: string
              description: URL de la imagen
    responses:
      201:
        description: Caballero creado exitosamente
      400:
        description: Datos inválidos
    """
    try:
        data = request.get_json()
        
        # Validar campos obligatorios
        if not data or not data.get('nombre') or not data.get('imagen_url'):
            return jsonify({
                'error': 'Los campos nombre e imagen_url son obligatorios'
            }), 400
        
        # Crear nuevo caballero
        nuevo_caballero = Caballero(
            nombre=data['nombre'],
            edad=data.get('edad'),
            altura=data.get('altura'),
            constelacion=data.get('constelacion'),
            imagen_url=data['imagen_url']
        )
        
        db.session.add(nuevo_caballero)
        db.session.commit()
        
        return jsonify({
            'mensaje': 'Caballero creado exitosamente',
            'caballero': nuevo_caballero.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@app.route('/api/caballeros/<int:id>', methods=['DELETE'])
def eliminar(id):
    """
    Microservicio de eliminación - Elimina un caballero por ID
    
    ---
    tags:
      - Eliminación
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID del caballero a eliminar
    responses:
      200:
        description: Caballero eliminado exitosamente
      404:
        description: Caballero no encontrado
    """
    try:
        caballero = Caballero.query.get_or_404(id)
        db.session.delete(caballero)
        db.session.commit()
        return jsonify({'mensaje': 'Caballero eliminado exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': 'Caballero no encontrado'}), 404

# Inicializar base de datos al arrancar la aplicación
def init_db():
    with app.app_context():
        db.create_all()
        
        # Insertar datos iniciales si la base de datos está vacía
        if Caballero.query.count() == 0:
            caballeros_iniciales = [
                Caballero(
                    nombre="Seiya de Pegaso",
                    edad=13,
                    altura=165.0,
                    constelacion="Pegaso",
                    imagen_url="https://i.imgur.com/OvXjbxO.jpg"
                ),
                Caballero(
                    nombre="Shiryu del Dragón",
                    edad=14,
                    altura=172.0,
                    constelacion="Dragón",
                    imagen_url="https://i.imgur.com/Rtc6pSd.jpg"
                ),
                Caballero(
                    nombre="Hyoga del Cisne",
                    edad=14,
                    altura=173.0,
                    constelacion="Cisne",
                    imagen_url="https://i.imgur.com/9m8J2aC.jpg"
                ),
                Caballero(
                    nombre="Shun de Andrómeda",
                    edad=13,
                    altura=165.0,
                    constelacion="Andrómeda",
                    imagen_url="https://i.imgur.com/JxK3fLd.jpg"
                ),
                Caballero(
                    nombre="Ikki del Fénix",
                    edad=15,
                    altura=175.0,
                    constelacion="Fénix",
                    imagen_url="https://i.imgur.com/M7wP4nJ.jpg"
                ),
                Caballero(
                    nombre="Aldebarán de Tauro",
                    edad=20,
                    altura=210.0,
                    constelacion="Tauro",
                    imagen_url="https://i.imgur.com/QrN8KxL.jpg"
                ),
                Caballero(
                    nombre="Saga de Géminis",
                    edad=28,
                    altura=188.0,
                    constelacion="Géminis",
                    imagen_url="https://i.imgur.com/V3mK7nP.jpg"
                ),
                Caballero(
                    nombre="Máscara de la Muerte de Cáncer",
                    edad=23,
                    altura=184.0,
                    constelacion="Cáncer",
                    imagen_url="https://i.imgur.com/W9xJ8nM.jpg"
                ),
                Caballero(
                    nombre="Aioria del León",
                    edad=20,
                    altura=185.0,
                    constelacion="León",
                    imagen_url="https://i.imgur.com/X4mJ9nR.jpg"
                ),
                Caballero(
                    nombre="Shaka de Virgo",
                    edad=20,
                    altura=182.0,
                    constelacion="Virgo",
                    imagen_url="https://i.imgur.com/Y5mJ0nS.jpg"
                ),
                Caballero(
                    nombre="Dohko de Libra",
                    edad=261,
                    altura=170.0,
                    constelacion="Libra",
                    imagen_url="https://i.imgur.com/Z6mJ1nT.jpg"
                ),
                Caballero(
                    nombre="Milo de Escorpio",
                    edad=20,
                    altura=185.0,
                    constelacion="Escorpio",
                    imagen_url="https://i.imgur.com/A7mJ2nU.jpg"
                )
            ]
            
            for caballero in caballeros_iniciales:
                db.session.add(caballero)
            
            db.session.commit()
            print("Datos iniciales insertados correctamente")

if __name__ == '__main__':
    init_db()
    # Para producción en Heroku
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

