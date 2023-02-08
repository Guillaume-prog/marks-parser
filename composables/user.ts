export async function useUser() {
  const uid = useSupabaseUser().value?.id;
  if (!uid) return null;

  const { data } = await useSupabase()
    .from("users")
    .select("*")
    .eq("id", uid)
    .single();

  return data;
}
