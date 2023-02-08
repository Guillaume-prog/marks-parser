import { Database } from "~~/types/supabase-types";

export function useSupabase() {
  return useSupabaseClient<Database>();
}

declare global {
  type SupabaseType<
    T extends keyof Database["public"]["Tables"],
    O extends keyof Database["public"]["Tables"][T]
  > = Database["public"]["Tables"][T][O];
}
