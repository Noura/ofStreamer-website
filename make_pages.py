#!/usr/bin/python

""" Script to render all my jinja templates into web pages
    Noura Howell, 2013
"""

import os, os.path, shutil, codecs, sys
import jinja2
from markdown import markdown

# relative path to output directory for rendered templates
TARGET = 'to-deploy/'

# NOTE put templates in relative dir template/
# NOTE put static files in relative dir static/

# Tells the script what web pages to make, and how.
pages = [ {
            # template jinja2 will use
            'template': 'index.html',
            # URL path after the www.mywebsite.com/ part
            'path': '',
            # Other info may be passed to the template
            'tabname': 'Introduction',
          },
          {
            'template': 'projects.html',
            'path': 'projects',
            'tabname': 'Projects',
            'projects': [
                {
                    'title': 'WaaZam!: Creative Play at a Distance',
                    'image_path': '/static/img/waazam_logo.jpg',
                    'vimeo_id': '57332391',
                },
                {
                    'title': 'Add depth to your online chats',
                    'image_path': '/static/img/seth_and_arturo.png',
                    'vimeo_id': '44718909',
                },
              ]
          },
          {
            'template': 'tutorials.html',
            'path': 'tutorials',
            'tabname': 'Tutorials',
            'steps': ['Setup', 'Calibrate', 'Code', 'Play'],
          },
          {
            'template': 'download.html',
            # URL path after the www.mywebsite.com/ part
            'path': 'download',
            # Other info may be passed to the template
            'tabname': 'Download',
          },
          {
            'template': 'about.html',
            # URL path after the www.mywebsite.com/ part
            'path': 'about',
            # Other info may be passed to the template
            'tabname': 'About',
          },
        ]
        
def safe_markdown(text):
    return jinja2.Markup(markdown(text, extensions=['fenced_code']))


def main():
    here = os.path.dirname(__file__)
    deploy_target = os.path.join(here, TARGET)
    loader = jinja2.FileSystemLoader(os.path.join(here, 'templates'))
    templates = jinja2.Environment(loader=loader)
    templates.filters['markdown'] = safe_markdown
    
    if os.path.exists(deploy_target):
        shutil.rmtree(deploy_target)
    os.makedirs(deploy_target)
    shutil.copytree(os.path.join(here, 'static'), os.path.join(deploy_target, 'static'))

    for page in pages:
        tem = templates.get_template(page['template'])
        ctx = { 'pages': pages , 'current_page': page }
        out_dir = os.path.join(deploy_target, page['path'])
        if page['path']:
            os.makedirs(out_dir)
        with codecs.open(os.path.join(out_dir, 'index.html'), 'w') as out:
            out.write(tem.render(**ctx))

if __name__ == '__main__':
    main()
