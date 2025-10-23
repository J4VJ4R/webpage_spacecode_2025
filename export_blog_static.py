import sqlite3
import os
from jinja2 import Environment, FileSystemLoader
from datetime import datetime
from xml.etree.ElementTree import Element, SubElement, tostring

BASE = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE, 'blog.db')
TEMPLATES_DIR = os.path.join(BASE, 'templates')
DIST_DIR = os.path.join(BASE, 'dist')


def load_posts():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute('SELECT * FROM posts ORDER BY created_at DESC')
    posts = cur.fetchall()
    conn.close()
    return posts


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def render():
    ensure_dir(DIST_DIR)
    env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))
    # helper for templates: generate static/blog/<id>/ links
    def static_post_url(post_id):
        return f"/blog/{post_id}/"
    env.globals['static_post_url'] = static_post_url
    list_tpl = env.get_template('blog_list.html')
    post_tpl = env.get_template('post.html')

    posts = load_posts()

    # render list
    list_html = list_tpl.render(posts=posts)
    with open(os.path.join(DIST_DIR, 'blog.html'), 'w', encoding='utf-8') as f:
        f.write(list_html)

    # render each post into dist/blog/<id>/index.html
    for p in posts:
        post_dir = os.path.join(DIST_DIR, 'blog', str(p['id']))
        ensure_dir(post_dir)
        content = post_tpl.render(post=p)
        with open(os.path.join(post_dir, 'index.html'), 'w', encoding='utf-8') as f:
            f.write(content)

    # sitemap
    make_sitemap(posts)
    make_rss(posts)
    print('Exported', len(posts), 'posts to', DIST_DIR)


def make_sitemap(posts):
    urlset = Element('urlset', xmlns='http://www.sitemaps.org/schemas/sitemap/0.9')
    base_url = 'https://spacecode.com.co'
    for p in posts:
        url = SubElement(urlset, 'url')
        loc = SubElement(url, 'loc')
        loc.text = f"{base_url}/blog/{p['id']}/"
        lastmod = SubElement(url, 'lastmod')
        lastmod.text = p['created_at'][:10]
    xml = tostring(urlset, encoding='utf-8', method='xml')
    with open(os.path.join(DIST_DIR, 'sitemap.xml'), 'wb') as f:
        f.write(xml)


def make_rss(posts):
    rss = Element('rss', version='2.0')
    channel = SubElement(rss, 'channel')
    SubElement(channel, 'title').text = 'SpaceCode Demo Blog'
    SubElement(channel, 'link').text = 'https://spacecode.com.co/blog'
    SubElement(channel, 'description').text = 'Entradas de ejemplo'
    for p in posts:
        item = SubElement(channel, 'item')
        SubElement(item, 'title').text = p['title']
        SubElement(item, 'link').text = f"https://spacecode.com.co/blog/{p['id']}/"
        SubElement(item, 'description').text = p['excerpt']
        SubElement(item, 'pubDate').text = p['created_at']
    xml = tostring(rss, encoding='utf-8', method='xml')
    with open(os.path.join(DIST_DIR, 'rss.xml'), 'wb') as f:
        f.write(xml)


if __name__ == '__main__':
    render()
