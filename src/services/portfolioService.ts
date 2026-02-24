import { supabase } from "../lib/supabase";

export interface PortfolioData {
  id: number;
  linkedin: string;
  fullname: string;
  work_profile: string;
  main_course: string;
  district: string;
  country: string;
  email: string;
  phone: string;
}

// Module-level cache — created once, reused by every caller
let cachedPromise: Promise<PortfolioData | null> | null = null;

export function fetchPortfolio(): Promise<PortfolioData | null> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = Promise.resolve(
    supabase
      .from("portfolio_public")
      .select("id, linkedin, fullname, work_profile, main_course, district, country, email, phone")
      .eq("fullname", "Dayang Ariana Binti Mohd Rizal")
      .single()
  ).then(({ data, error }) => {
      if (error) {
        // Reset so it can retry on next mount if it was a transient error
        cachedPromise = null;
        return null;
      }
      return data as PortfolioData;
    });

  return cachedPromise;
}
