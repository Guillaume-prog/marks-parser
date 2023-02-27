declare global {
  type NameCode = {
    name: string;
    code: string;
  };

  type Coeffs = {
    section: number;
    cc: number;
    tp: number;
  };

  //////////////////////////

  type Mcc = UE[];

  type UE = NameCode & {
    subjects: Subject[];
  };

  type Subject = NameCode & {
    sub_subjects?: NameCode[];
    coeffs: Coeffs;
  };
}

export {};
