from flask import Flask, g, render_template, abort, url_for
import sqlite3
import os

BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, 'blog.db')

app = Flask(__name__, static_folder='static', template_folder='templates')


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB_PATH)
        db.row_factory = sqlite3.Row
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


@app.route('/blog')
def blog_index():
    db = get_db()
    cur = db.execute('SELECT id, title, excerpt, image_url, created_at FROM posts ORDER BY created_at DESC')
    posts = cur.fetchall()
    return render_template('blog_list.html', posts=posts)


@app.context_processor
def utility_processor():
    def static_post_url(post_id):
        return f"/blog/{post_id}/"
    return dict(static_post_url=static_post_url)


@app.route('/blog/<int:post_id>')
def blog_post(post_id):
    db = get_db()
    cur = db.execute('SELECT * FROM posts WHERE id = ?', (post_id,))
    post = cur.fetchone()
    if not post:
        abort(404)
    return render_template('post.html', post=post)


@app.route('/')
def home_redirect():
    # Minimal helper: link to main site index if exists
    return ('<p>Site root. <a href="/blog">Ir al blog de ejemplo</a> | '
            '<a href="/index.html">Volver al sitio</a></p>')


if __name__ == '__main__':
    # Use port 5000 to not conflict with existing preview (8000)
    app.run(host='0.0.0.0', port=5000, debug=True)
