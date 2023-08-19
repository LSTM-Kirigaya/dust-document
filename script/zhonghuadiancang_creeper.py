import requests
from bs4 import BeautifulSoup
import bs4
import os
from tqdm import tqdm

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.0.0'
}

proxies = {
    "http": "http://127.0.0.1:49760",
    "https": "http://127.0.0.1:49760"
}

def create_cover_md():
    template = """---
title: 千只鹤
date: 2023-08-19
heroImage: /logo.png
heroText: Welcome to hep.
categories:
 - 读物
tags:
 - 日本文学
 - 川端康成

isShowTitleInHome: true
actionText: About
---
:::info 版权说明
这本书来自 [中华典藏](https://www.zhonghuadiancang.com/)。我使用一些编程技术将它变成您能看到的一本书。
:::

"""
    return template

def get_one_chapter(url: str, title: str, book_name: str, book_seq: int):
    res = requests.get(url, headers=headers, proxies=proxies)
    content = f'---\ntitle: {title}\n---\n\n'

    if res.status_code == 200:
        soup = BeautifulSoup(res.content, 'html.parser')
        content_div = soup.find('div', {'id': 'content'})
        for p in content_div.find_all('p'):
            content += p.text + '\n\n'

    md_path = f'./docs/{book_name}/chapter{book_seq}.md'
    with open(md_path, 'w', encoding='utf-8') as fp:
        fp.write(content.strip())

def get_book(url: str, book_name: str):
    res = requests.get(url, headers=headers, proxies=proxies)

    book_folder = f'./docs/{book_name}'
    if not os.path.exists(book_folder):
        print('create ' + book_folder)
        os.makedirs(book_folder)

    cover_folder = f'./blogs/{book_name}'
    if not os.path.exists(cover_folder):
        print('create ' + cover_folder)
        os.makedirs(cover_folder)

    if res.status_code == 200:
        soup = BeautifulSoup(res.content, 'html.parser')
        count = 1
        valid_lis = [li for li in soup.find('ul', {'id': 'booklist'}) if li.find('a') != -1]
        meta_desc = soup.find('meta', {'name': 'description'})
        description = meta_desc.attrs['content']

        titles = []
        for li in tqdm(valid_lis):
            href_a: bs4.element.Tag = li.find('a')
            title = href_a.text.strip()
            href = href_a.attrs['href']
            get_one_chapter(href, title, book_name, count)
            count += 1

            titles.append(title)
        
        template = create_cover_md()
        template += description + '\n\n'

        count = 1
        for title in titles:
            un_list = f'- [{title}](../../docs/{book_name}/chapter{count}.md)'
            count += 1
            template += un_list + '\n'
        
        main_path = f'./blogs/{book_name}/main.md'
        with open(main_path, 'w', encoding='utf-8') as fp:
            fp.write(template)

if __name__ == '__main__':
    get_book('https://www.zhonghuadiancang.com/waiguomingzhu/9742/', 'lake')
    get_book('https://www.zhonghuadiancang.com/waiguomingzhu/9729/', 'thousand-cranes')
    get_book('https://www.zhonghuadiancang.com/waiguomingzhu/9726/', 'snow-country')