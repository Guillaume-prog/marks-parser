const API_HOST = "http://127.0.0.1:8080";

/* Exports */

export { get_list, get_report, YearList, Report };

/* Methods */

async function get_list(): Promise<YearList> {
  const data = await fetch(`${API_HOST}/list`).then((res) => res.json());
  return <YearList>data;
}

async function get_report(id: string, year: string, semester: string) {
  const data = await fetch(
    `${API_HOST}/report?student-id=${id}&student-year=${year}&student-semester=${semester}`
  ).then((res) => res.json());

  return <Report>data;
}

/* Types */

type YearList = {
  [index: string]: string[];
};

type Stats = {
  student: number;
  max: number;
  min: number;
  average: number;
};

type Mark = Stats & {
  code: string;
  name: string;
};

type UE = Mark & {
  rank: string;
  marks: Mark[];
};

type Report = Stats & {
  id: string;
  rank: string;
  sections: UE[];
};
