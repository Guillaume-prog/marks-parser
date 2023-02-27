import { PdfData } from "pdfdataextract";
import formidable from "formidable";
import { readFileSync } from "fs";

import MarksRegister from "~~/types/marks-list";

type Form = { fields: formidable.Fields; files: formidable.Files };

export default defineEventHandler(async (event) => {
  const { files } = await parseForm(event);
  const text = await load_text(files.file as formidable.File);
  const lines = preprocess_data(text);

  let cur_student: string | null = null;
  let register = new MarksRegister();

  for (const line of lines) {
    if (is_student_id(line)) {
      register.add_student(line);
      cur_student = line;
      continue;
    }

    if (cur_student == null) continue;
    register.add(cur_student, line);
  }

  console.log("\n=== DONE ===\n\n\n");
  register.fill_missing_marks();
  return { marks: register.get_all() };
});

const is_absent = (line: string) => /^AB/.test(line);
const is_mark = (line: string) => /^\d{1,2}(\.\d{1,2})?\b/.test(line);
const is_student_id = (line: string) => /^\d{8}\S?/.test(line);

function preprocess_data(data: string) {
  data = data.split(/moyenne/gi)[0];

  return data
    .split("\n")
    .map((line) => line.replace(",", ".").trim())
    .filter((line) => is_absent(line) || is_mark(line) || is_student_id(line))
    .flatMap((line) => line.split(" "));
}

async function load_text(file: formidable.File) {
  const buffer = readFileSync(file.filepath);
  const data = await PdfData.extract(buffer);

  return data.text!.join("\n");
}

function parseForm(event: any): Promise<Form> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
