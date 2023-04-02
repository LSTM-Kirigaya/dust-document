from html.parser import HTMLParser
import os

class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for attr_name, attr_value in attrs:
            if attr_name == 'href' or attr_name == 'src':
                if not attr_value.startswith('http') and attr_value.startswith('/') and len(attr_value) > 2:
                    _global_args['hrefs'].append(attr_value)

_global_args = {
    'args': None,
    'temps': [],        # 通过 dev 和 build 临时创建的文件
    'hrefs': [],   # index.html中的所有的 href 的值
    'srcs': []
}

def change_spa_html(path, prefix):
    parser = MyHTMLParser()
    with open(path, 'r', encoding='utf-8') as fp:
        html = fp.read()
        parser.feed(html)

    replaced = set()
    for old_value in _global_args['hrefs']:
        if old_value in replaced:
            continue
        if not old_value.startswith(prefix):
            new_value = prefix + old_value
            html = html.replace(old_value, new_value)
            replaced.add(old_value)


    for old_value in _global_args['srcs']:
        if old_value in replaced:
            continue
        if not old_value.startswith(prefix):
            new_value = prefix + old_value
            html = html.replace(old_value, new_value) 
            replaced.add(old_value)
    
    if not '/bg.png' in replaced:
        html = html.replace('/bg.png', prefix + '/bg.png')

    with open(path, 'w', encoding='utf-8') as fp:
        fp.write(html)


def change_spa_css(path, prefix):
    with open(path, 'r', encoding='utf-8') as fp:
        css = fp.read()
    css.replace('/assets', prefix + '/assets')
    with open(path, 'w', encoding='utf-8') as fp:
        fp.write(css)

def change_spa_js(path, prefix):
    pass

def change_spa_relative_resource(path, prefix):
    for curDir, dirs, files in os.walk(path):
        for file in files:
            file_path = os.path.join(curDir, file)
            print('[handle]', file_path)
            if file.endswith('.html'):
                change_spa_html(file_path, prefix)
            if file.endswith('.css'):
                change_spa_css(file_path, prefix)
            if file.endswith('.js'):
                change_spa_js(file_path, prefix)

if __name__ == "__main__":
    change_spa_relative_resource('./.vuepress/dist', '/document/system-for-ai')