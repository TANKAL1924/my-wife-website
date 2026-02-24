import { supabase } from "../lib/supabase";

export interface LanguageData {
  id: number;
  user_id: number;
  language: string;
  proficient: string;
}

let cachedPromise: Promise<LanguageData[]> | null = null;

export function fetchLanguages(userId: number): Promise<LanguageData[]> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = Promise.resolve(
    supabase
      .from("language_public")
      .select("id, user_id, language, proficient")
      .eq("user_id", userId)
  ).then(({ data, error }) => {
    if (error) {
      cachedPromise = null;
      return [];
    }
    return (data ?? []) as LanguageData[];
  });

  return cachedPromise;
}
