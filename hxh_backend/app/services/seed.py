from app.db.client import get_hunters_collection


def seed_hunters():
    collection = get_hunters_collection()
    if collection.count_documents({}) > 0:
        return

    initial_hunters = [
        {
            "nombre": "Gon Freecss",
            "edad": 12,
            "nen_tipo": "Refuerzo",
            "afiliacion": "Cazador",
            "imagen_url": "https://i.pinimg.com/736x/d7/2e/64/d72e64e53ce38afcb7631c6fba588693.jpg",
        },
        {
            "nombre": "Killua Zoldyck",
            "edad": 12,
            "nen_tipo": "Transmutación",
            "afiliacion": "Cazador / Familia Zoldyck",
            "imagen_url": "https://i.pinimg.com/736x/25/46/39/2546398e742dc4a5e7412ab1c0381353.jpg",
        },
        {
            "nombre": "Kurapika",
            "edad": 17,
            "nen_tipo": "Especialización",
            "afiliacion": "Clan Kurta",
            "imagen_url": "https://i.pinimg.com/736x/da/1f/57/da1f57bfcfa39b2b59f1ba673fbea726.jpg",
        },
        {
            "nombre": "Leorio Paradinight",
            "edad": 19,
            "nen_tipo": "Emisión",
            "afiliacion": "Cazador / Médico",
            "imagen_url": "https://i.pinimg.com/736x/87/6c/43/876c43b4c0cf42f6b75e4f0e6a85ab8d.jpg",
        },
        {
            "nombre": "Hisoka Morow",
            "edad": 28,
            "nen_tipo": "Transmutación",
            "afiliacion": "Cazador / Fantasma",
            "imagen_url": "https://i.pinimg.com/736x/d7/f1/76/d7f17607580b3a3d237b640a35b97e16.jpg",
        },
        {
            "nombre": "Chrollo Lucilfer",
            "edad": 26,
            "nen_tipo": "Especialización",
            "afiliacion": "Genei Ryodan",
            "imagen_url": "https://i.pinimg.com/736x/84/1f/f6/841ff6be8f47935d69be6c360234a2ef.jpg",
        },
        {
            "nombre": "Biscuit Krueger",
            "edad": 57,
            "nen_tipo": "Transmutación",
            "afiliacion": "Cazadora",
            "imagen_url": "https://i.pinimg.com/736x/2b/9b/b1/2b9bb12998b39d8e66d2ada25b3f1b62.jpg",
        },
        {
            "nombre": "Isaac Netero",
            "edad": 110,
            "nen_tipo": "Refuerzo",
            "afiliacion": "Asociación de Cazadores",
            "imagen_url": "https://i.pinimg.com/736x/02/9f/55/029f55fa9de72152a605f248a94b44bd.jpg",
        },
        {
            "nombre": "Meruem",
            "edad": 0,
            "nen_tipo": "Especialización",
            "afiliacion": "Hormigas Quimera",
            "imagen_url": "https://i.pinimg.com/736x/c4/ef/63/c4ef634729df66b236a2255a60365aa9.jpg",
        },
        {
            "nombre": "Neferpitou",
            "edad": 1,
            "nen_tipo": "Especialización",
            "afiliacion": "Guardia Real",
            "imagen_url": "https://i.pinimg.com/736x/1a/a0/1e/1aa01e28050ad73e6705b83d6d0bca68.jpg",
        },
        {
            "nombre": "Morel Mackernasey",
            "edad": 45,
            "nen_tipo": "Materialización",
            "afiliacion": "Cazador",
            "imagen_url": "https://i.pinimg.com/736x/d9/a0/30/d9a03095361221f9cec1f1d0cd3bcbf8.jpg",
        },
        {
            "nombre": "Knuckle Bine",
            "edad": 28,
            "nen_tipo": "Emisión",
            "afiliacion": "Cazador",
            "imagen_url": "https://i.pinimg.com/736x/9f/52/80/9f5280aa3c2c5d5f0cc0c8c30c112b62.jpg",
        },
    ]

    collection.insert_many(initial_hunters)
    print("Hunters iniciales insertados correctamente")

