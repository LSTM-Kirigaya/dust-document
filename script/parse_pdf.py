import pdfplumber
from pprint import pprint

def parse_page_str(page_str: str) -> list[str]:
    paragraphs = []
    cache_paragraph = ''
    for line in page_str.split('\n'):
        if line.isdigit():
            pass
        elif line.endswith('。'):
            cache_paragraph += line.strip()
            paragraphs.append(cache_paragraph)
            cache_paragraph = ''
        else:
            cache_paragraph += line.strip()

    return paragraphs


if __name__ == '__main__':
    pdf_file = './pdf/置身事内：中国政府与经济发展.pdf'
    pdf = pdfplumber.open(pdf_file)
    target_page = pdf.pages[10]
    line_infos = target_page.extract_text_lines(return_chars=False)
    
    for info in line_infos:
        pprint(info)