import { supabase } from "../lib/supabase";

export interface ReferenceData {
  id: number;
  user_id: number;
  name: string;
  uni: string;
  fac: string;
  position: string;
  email: string;
  number: string;
}

let cachedPromise: Promise<ReferenceData[]> | null = null;

export function fetchReferences(userId: number): Promise<ReferenceData[]> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = Promise.resolve(
    supabase
      .from("references_public")
      .select("id, user_id, name, uni, fac, position, email, number")
      .eq("user_id", userId)
  ).then(({ data, error }) => {
    if (error) {
      cachedPromise = null;
      return [];
    }
    return (data ?? []) as ReferenceData[];
  });

  return cachedPromise;
}
