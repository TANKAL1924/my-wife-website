import { supabase } from "../lib/supabase";

export interface SkillData {
  id: number;
  user_id: number;
  skills: string;
  type: string;
}

let cachedPromise: Promise<SkillData[]> | null = null;

export function fetchSkills(userId: number): Promise<SkillData[]> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = Promise.resolve(
    supabase
      .from("technical_public")
      .select("id, user_id, skills, type")
      .eq("user_id", userId)
  ).then(({ data, error }) => {
    if (error) {
      cachedPromise = null;
      return [];
    }
    return (data ?? []) as SkillData[];
  });

  return cachedPromise;
}
