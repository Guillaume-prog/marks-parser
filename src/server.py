from main import get_student_report, get_report_list
from bottle import post, get, request, run

import json

@post("/")
def get_marks():
    user_id = request.forms.get("student-id")
    user_year = request.forms.get("student-year")
    user_semester = request.forms.get("student-semester")

    if user_id is None or user_year is None or user_semester is None:
        return { "error": "Missing parameters" }

    report = get_student_report(user_id, user_year, user_semester)
    return report

@get("/list")
def get_list():
    return get_report_list()

run(host="0.0.0.0", port=8080)