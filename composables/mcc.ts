export const useMcc = async (semester: number) => {
  const { data, error } = await useSupabase()
    .from("mcc")
    .select("*")
    .eq("semester", semester)
    .single();

  if (error) return null;
  return data.mcc as Mcc;
};

export const useMccOld = async (semester: number) => {
  const mcc_files = import.meta.glob("../data/mcc/*.json");
  const filename = `../data/mcc/S${semester}.json`;
  if (!Object.keys(mcc_files).includes(filename)) return null;

  const data = await mcc_files[filename]();

  return data.default as Mcc;
};
