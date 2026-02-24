import { supabase } from "../lib/supabase";

export interface ExperienceData {
  id: number;
  company_name: string;
  description: Array<{ work: string }> | string | null;
  start_date: string;
  end_date: string | null;
  title_company: string;
  user_id: number;
}

// Module-level cache keyed by userId
let cachedPromise: Promise<ExperienceData[]> | null = null;

export function fetchExperiences(userId: number): Promise<ExperienceData[]> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = Promise.resolve(
    supabase
      .from("experiences_public")
      .select("id, company_name, description, start_date, end_date, title_company, user_id")
      .eq("user_id", userId)
      .order("start_date", { ascending: true })
  ).then(({ data, error }) => {
    if (error) {
      cachedPromise = null;
      return [];
    }
    const rows = (data ?? []) as ExperienceData[];
    // Sort client-side ascending by start_date as a reliable fallback
    return rows.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  });

  return cachedPromise;
}

/** Format "2023-01-01" -> "Jan 2023", null/undefined -> "Present" */
export function formatYear(date: string | null | undefined): string {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short" });
}
