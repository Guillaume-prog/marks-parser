declare global {
  type User = {
    id: string;
    promotion: string;
    student_id: string;
  };

  type MarksFile = { [key: string]: string };

  // type Mark = {
  //   id?: string;
  //   promotion: string;
  //   section: number;
  //   name: string;
  //   marks: MarksFile;
  // };
}

export {};
