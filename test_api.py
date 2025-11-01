"""
Script de prueba para la API de Caballeros del Zodiaco
Ejecutar después de iniciar la aplicación: python app.py
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_get_all():
    """Prueba GET /api/caballeros"""
    print("\n🔍 Probando GET /api/caballeros...")
    response = requests.get(f"{BASE_URL}/api/caballeros")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Total caballeros: {data['total']}")
    print(f"✅ Primeros 3 personajes:")
    for caballero in data['caballeros'][:3]:
        print(f"  - {caballero['nombre']} ({caballero['constelacion']})")

def test_get_by_id():
    """Prueba GET /api/caballeros/1"""
    print("\n🔍 Probando GET /api/caballeros/1...")
    response = requests.get(f"{BASE_URL}/api/caballeros/1")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"✅ Caballero: {data['nombre']} - Edad: {data['edad']} - Altura: {data['altura']}cm")

def test_post():
    """Prueba POST /api/caballeros"""
    print("\n🔍 Probando POST /api/caballeros...")
    nuevo_caballero = {
        "nombre": "Mu de Aries",
        "edad": 20,
        "altura": 182.0,
        "constelacion": "Aries",
        "imagen_url": "https://i.imgur.com/test-mu.jpg"
    }
    response = requests.post(
        f"{BASE_URL}/api/caballeros",
        json=nuevo_caballero,
        headers={"Content-Type": "application/json"}
    )
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"✅ {data['mensaje']}")
    print(f"   ID creado: {data['caballero']['id']}")
    return data['caballero']['id']

def test_delete(caballero_id):
    """Prueba DELETE /api/caballeros/{id}"""
    print(f"\n🔍 Probando DELETE /api/caballeros/{caballero_id}...")
    response = requests.delete(f"{BASE_URL}/api/caballeros/{caballero_id}")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"✅ {data['mensaje']}")

def test_home():
    """Prueba GET /"""
    print("\n🔍 Probando GET /...")
    response = requests.get(BASE_URL)
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"✅ {data['mensaje']} - Version: {data['version']}")

def main():
    """Ejecuta todas las pruebas"""
    print("=" * 50)
    print("🧪 PRUEBAS DE LA API CABALLEROS DEL ZODIACO")
    print("=" * 50)
    
    try:
        test_home()
        test_get_all()
        test_get_by_id()
        nuevo_id = test_post()
        test_get_all()
        test_delete(nuevo_id)
        
        print("\n" + "=" * 50)
        print("✅ TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE")
        print("=" * 50)
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: No se puede conectar a la API")
        print("Asegúrate de que la aplicación esté ejecutándose:")
        print("  python app.py")
    except Exception as e:
        print(f"\n❌ Error: {e}")

if __name__ == "__main__":
    main()

