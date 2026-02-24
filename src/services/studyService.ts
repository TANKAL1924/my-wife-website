import { supabase } from "../lib/supabase";

export interface Achievement {
  date: string;
  title: string;
}

export interface StudyData {
  id: number;
  user_id: number;
  uni_name: string;
  course: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  cgpa: number | null;
  location: string | null;
  achievement: Achievement[] | null;
}

// Module-level cache keyed by userId
let cachedPromise: Promise<StudyData[]> | null = null;

export function fetchStudies(userId: number): Promise<StudyData[]> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = Promise.resolve(
    supabase
      .from("study_public")
      .select(
        "id, user_id, uni_name, course, description, start_date, end_date, cgpa, location, achievement"
      )
      .eq("user_id", userId)
      .order("start_date", { ascending: false })
  ).then(({ data, error }) => {
    if (error) {
      cachedPromise = null;
      return [];
    }
    return (data ?? []) as StudyData[];
  });

  return cachedPromise;
}

/** Format "2023-01-01" -> "Jan 2023", null/undefined -> "Present" */
export function formatStudyYear(date: string | null | undefined): string {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short" });
}
