# import PyPDF2 as p2

# student_id = "22108939"
# marks_path = "res/marks.pdf"

# reader = p2.PdfReader(marks_path)
# writer = p2.PdfWriter()

# with open("res/marks-raw.txt", "w") as f:
#     for page_index in range(len(reader.pages)):
#         page = reader.pages[page_index]
#         if student_id in page.extract_text():
#             print(page_index + 1)
#             writer.add_page(page)
#             f.write(page.extract_text())

# with open("res/marks-edited.pdf", "wb") as f:
#     writer.write(f)

import numpy as np
import tabula as tb
import PyPDF2 as p2

STATS_FLAG = "moy - écart type"

"""
Main program
=================================================================================================
"""

def get_marks(path, student_id):
    # Step 1 - Extract data from PDF
    header = []
    marks = []
    stats = []

    for i in get_pages(path, student_id):
        page = tb.read_pdf(path, pages = f"{i}", multiple_tables=True)
        header += parse_header(page) 
        marks += parse_content(page, student_id)

    for i in get_pages(path, STATS_FLAG):
        page = tb.read_pdf(path, pages = f"{i}", multiple_tables=True)
        stats += parse_stats(page)

    # Step 2 - Merge data
    result = []

    for i in range(len(header)):
        result.append([ header[i], marks[i] ] + stats[i])

    return result

"""
Document parsing functions
=================================================================================================
"""

def get_pages(pdf_path, student_id):
    reader = p2.PdfReader(pdf_path)
    pages = filter(lambda i: student_id in reader.pages[i].extract_text(), range(len(reader.pages)))
    return [ x+1 for x in list(pages) ]


def parse_header(data):
    header = [ x.columns for x in data ][0]
    header = [ h.replace('\r', ' ').replace(" Ado / 20", "") for h in header ]
    return header[1:-1]


def parse_content(data, student_id):
    rows = list(filter(lambda x: student_id in x[0], np.concatenate(data)))
    return [ f"{x}".replace('\r', '|') for x in rows[0][2:]] if len(rows) == 1 else []


def parse_stats(data):
    stats = [ col.values[-1] for col in data ][0][1:-1]
    stats = [ s.split("\r")[:-2] for s in stats ] 
    return stats

"""
Organisation functions
=================================================================================================
"""

