import os
import argparse
from typing import List
import re

import json5


BLOG_HOME = 'blogs'
DOC_HOME = 'docs'

def check_exists(path: str):
    assert os.path.exists(path)

def find_first_number(s):  
    match = re.search(r'\d+', s)  
    if match:  
        return int(match.group())  
    else:  
        return None  

def sorted_by_postfix_number(lists: List[str]) -> List[str]:
    result = sorted(lists, key=lambda name: find_first_number(name))
    return result

def make_cover_config(book_name: str) -> str:
    cover_key_name = f'/{BLOG_HOME}/{book_name}/main.html'
    doc_path = os.path.join(DOC_HOME, book_name)
    configs = [{'text': '目录', 'children': []}]
    for markdown in os.listdir(doc_path):
        markdown_name = markdown.rstrip('.md')
        if markdown_name.lower() == 'readme':
            continue

        sub_path = f'/{DOC_HOME}/{book_name}/{markdown_name}'
        configs[0]['children'].append(sub_path)
    configs[0]['children'] = sorted_by_postfix_number(configs[0]['children'])
    return cover_key_name, configs

def make_content_category_config(book_name: str) -> str:
    category_key_name = f'/{DOC_HOME}/{book_name}/'
    configs = [{'text': '目录', 'children': []}]
    for markdown in os.listdir(doc_path):
        markdown_name = markdown.rstrip('.md')
        if markdown_name.lower() == 'readme':
            continue
        configs[0]['children'].append(markdown_name)
    configs[0]['children'] = sorted_by_postfix_number(configs[0]['children'])
    
    return category_key_name, configs

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--name', help='书的名字，比如 no-longer-human')
    args = parser.parse_args()

    blog_path = os.path.join(BLOG_HOME, args.name)
    doc_path = os.path.join(DOC_HOME, args.name)

    check_exists(blog_path)
    check_exists(doc_path)

    cover_key, cover_config = make_cover_config(args.name)
    category_key, category_config = make_content_category_config(args.name)
    configs = {}
    configs[cover_key] = cover_config
    configs[category_key] = category_config
    string = json5.dumps(configs, indent=4, ensure_ascii=False)
    print(string)