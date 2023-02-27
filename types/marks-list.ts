export type MarksList = Record<string, Mark[]>;
export type Mark = "ABS" | "ABJ" | "N/A" | number;

export default class MarksRegister {
  private register: MarksList;
  private num_marks: number;

  constructor(marks: MarksList = {}) {
    this.register = marks;
    this.num_marks = Object.values(marks)[0]?.length ?? 0;
  }

  add_student(student_id: string) {
    if (this.register[student_id] != null) return;
    this.register[student_id] = [];
  }

  private to_mark(str: string): Mark {
    if (str == "ABS") return "ABS";
    if (str == "ABJ") return "ABJ";
    return parseFloat(str);
  }

  add(student_id: string, mark_str: any) {
    this.register[student_id].push(this.to_mark(mark_str));

    if (this.register[student_id].length > this.num_marks)
      this.num_marks = this.register[student_id].length;
  }

  fill_missing_marks() {
    for (const student_id in this.register) {
      const missing_marks = this.num_marks - this.register[student_id].length;

      for (let i = 0; i < missing_marks; i++) {
        this.register[student_id].push("N/A");
      }
    }
  }

  get(student_id: string): Mark[] {
    return this.register[student_id];
  }

  get_column(column: number): Record<string, Mark> {
    const column_marks: Record<string, Mark> = {};
    for (const student_id in this.register) {
      column_marks[student_id] = this.register[student_id][column];
    }

    return column_marks;
  }

  get_all(): MarksList {
    return this.register;
  }

  get_num_marks(): number {
    return this.num_marks;
  }

  get_num_students(): number {
    return Object.keys(this.register).length;
  }
}
