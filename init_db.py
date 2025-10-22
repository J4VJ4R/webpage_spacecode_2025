import sqlite3
import os
from datetime import datetime

BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, 'blog.db')

def init_db():
    if os.path.exists(DB_PATH):
        print('DB already exists at', DB_PATH)
        return
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
    CREATE TABLE posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        excerpt TEXT,
        content TEXT,
        image_url TEXT,
        created_at TEXT
    )
    ''')

    now = datetime.utcnow().isoformat()
    sample = [
        (
            'Cómo construimos una landing page moderna',
            'Resumen: pasos para construir una landing page que convierte.',
            '<p>En esta entrada explicamos los pasos para construir una landing page con enfoque en conversión...</p>',
            'https://picsum.photos/seed/landing/800/450',
            now
        ),
        (
            'Optimización de imágenes para web',
            'Resumen: uso de WebP y técnicas de carga diferida.',
            '<p>Las imágenes son clave para la velocidad. Aquí mostramos cómo convertir a WebP y usar srcset...</p>',
            'https://picsum.photos/seed/images/800/450',
            now
        ),
        (
            'Buenas prácticas para formularios de contacto',
            'Resumen: validación y UX en formularios.',
            '<p>Los formularios deben ser simples. En esta entrada hablamos de validación, accesibilidad y UX...</p>',
            'https://picsum.photos/seed/form/800/450',
            now
        ),
    ]

    c.executemany('INSERT INTO posts (title, excerpt, content, image_url, created_at) VALUES (?,?,?,?,?)', sample)
    conn.commit()
    conn.close()
    print('Initialized DB with sample posts at', DB_PATH)

if __name__ == '__main__':
    init_db()
