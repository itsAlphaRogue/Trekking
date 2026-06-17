"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin_client";

export type Settings = {
  id: number;
  company_name: string;
  email: string;
  phone: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  tiktok_url: string;
  default_currency: string;
  home_hero_image: string;
  contact_hero_image: string;
  destinations_hero_image: string;
  why_trek_image: string;
};

export async function getSettings(): Promise<Settings> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching settings:", error);
    // Return defaults if table is empty or error occurs
    return {
      id: 1,
      company_name: "Himalayan Vistas",
      email: "info@himalayanvistas.com",
      phone: "+977 980 0000000",
      facebook_url: "",
      instagram_url: "",
      youtube_url: "",
      tiktok_url: "",
      default_currency: "USD",
      home_hero_image: "/default.png",
      contact_hero_image: "/default.png",
      destinations_hero_image: "/default.png",
      why_trek_image: "https://images.unsplash.com/photo-1551632432-c735e8326f67?q=80&w=2070&auto=format&fit=crop",
    };
  }

  if (!data) {
     // If no row exists, we might want to seed it or just return defaults
     return {
      id: 1,
      company_name: "Himalayan Vistas",
      email: "info@himalayanvistas.com",
      phone: "+977 980 0000000",
      facebook_url: "",
      instagram_url: "",
      youtube_url: "",
      tiktok_url: "",
      default_currency: "USD",
      home_hero_image: "/default.png",
      contact_hero_image: "/default.png",
      destinations_hero_image: "/default.png",
      why_trek_image: "https://images.unsplash.com/photo-1551632432-c735e8326f67?q=80&w=2070&auto=format&fit=crop",
    };
  }

  return data as Settings;
}

export async function updateSettings(settings: Partial<Settings>) {
  const supabase = await createClient();

  // Check if user is authenticated and is admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Upsert settings (id=1 is enforced by constraint)
  const { data, error } = await supabase
    .from("settings")
    .upsert({
      id: 1,
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error updating settings:", error);
    throw new Error(error.message);
  }

  return data;
}
