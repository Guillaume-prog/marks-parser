from main import get_student_report, get_report_list
from bottle import Bottle, request, run, response

app = Bottle()

@app.hook("after_request")
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@app.get("/")
def hello():
    return { "message": "hello" }

@app.get("/report")
def get_marks():
    user_id = request.query.get("student-id")
    user_year = request.query.get("student-year")
    user_semester = request.query.get("student-semester")


    if user_id is None or user_year is None or user_semester is None:
        print("hellow")
        return { "error": "Missing parameters" }

    report = get_student_report(user_id, user_year, user_semester)
    return report

@app.get("/list")
def get_list():
    return get_report_list()

run(app)
