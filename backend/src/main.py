import numpy as np
import tabula as tb
import PyPDF2 as p2
import os, json

STATS_FLAG = "moy - écart type"
REPORT_BASE_PATH = "./res/reports/"
ORDER_LIST_PATH = "./res/order.json"

def get_abs(path: str) -> str:
    return os.path.join(os.getcwd(), path)

"""
Main program
=================================================================================================
"""

def get_report_list():
    _list = {}
    for file in os.listdir(get_abs(REPORT_BASE_PATH)):
        year, semester = file.split(".")[0].split("-")
        if not year in _list:
            _list[year] = []
        _list[year].append(semester)
    return _list

def get_student_report(student_id, student_year, student_semester):
    path = os.path.join(get_abs(REPORT_BASE_PATH), f"{student_year}-{student_semester}.pdf")

    if not os.path.exists(path):
        return { "error": "No report found" }

    with open(get_abs(ORDER_LIST_PATH), "r") as f:
        order_list = json.loads(f.read())
        order = order_list[f"{student_year}-{student_semester}"]

    data = get_marks(path, student_id)
    report = format_data(data, student_id, order=order)

    return report

"""
Document parsing functions
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

def format_data(data, student_id, order):
    sections = []
    marks = []

    cur_section = -1
    for (_subject, _student, _max, _min, _avg) in data[1:]:
        if "|" in _student:
            # Create section
            subject_info = _subject.split(" ")
            student_info = _student.split("|")

            sections.append({
                "code": subject_info[0],
                "name": " ".join(subject_info[1:]),
                "student": student_info[0],
                "rank": student_info[-1],
                "max": _max,
                "min": _min,
                "average": _avg,
                "marks": marks
            })

            if order:
                sections[cur_section]["marks"] = marks
            
            cur_section += 1
            marks = []
        else:
            # Add mark to section
            subject_info = _subject.split(" ")
            marks.append({
                "code": subject_info[0],
                "name": " ".join(subject_info[1:]),
                "student": _student,
                "max": _max,
                "min": _min,
                "average": _avg
            })

    # Wrap all data in student info
    (_subject, _student, _max, _min, _avg) = data[0]
    student_info = _student.split("|")

    report = {
        "id": student_id,
        "student": student_info[0],
        "rank": student_info[-1],
        "max": _max,
        "min": _min,
        "average": _avg,
        "sections": sections
    }

    return report