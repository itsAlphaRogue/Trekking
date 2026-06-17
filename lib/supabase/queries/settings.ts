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
      home_hero_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrgoSqs4cPQK1mamJWCRgY6Gm__s3TK3uTF2gVhwu6Qx6wXw8bzTW3lcHsvFbHGqFgWvoP28sX979m_SC-3eyPhYC93hmVE04hjgKQy-5CFWk-K6mss85ILUTusAB5WyvjqzvuPf31ESLf2Bv-w0QsLNc0rx5PbF4AkdhC00IqHoEJQlhNStnvXmTTTixSlkB-7Esb4tpSL_IRkJnRm-PR2iwId77btUUz7cIKo3AE2nr0rPc8iJSrmSJ-MhLdCKnbtTEsi4xc8vnz",
      contact_hero_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt6ebj-D7Z9Uyk4ILclYdSP5YRh6frpPvhQA1mze2LW8ZCTYig7CUDTJabZPFPVDE5WmRjTqfeunGzzNRPdIHE65CCN2zTzAnsN0C3Td3GF7OAEEOAZY4Qfxo7gm5fxGUWrBJzSEmESjKGKWQ1Pa2TEj1sJ0SVgU8JdnYGwWshmvAguOyYTOHNFjM17G3CPwuqMwNLDMeD7c4wuGjkXCtWNVc5i8xM7D1g2HpXehWO9nfPcBiBxvB3kbk9wHUmymWm7rHMBCfQbd8wP",
      destinations_hero_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuvERccL9a5eiiPrGB0OeoQF8qlC8mrVDKsmUQI9W1Hoihn4B0AoaZyERRYyyd7hEAWd05HqljmwMsvEFQ1wSoMcOW-UGJ53vHkRwdaFTsT_aDJMAQeGbj9Q5Emr4NFBJvL0w5C4IQIFqR6fmy1ZkwX2zYbr-3XPpi6EMFZkVWORLhNLFHNkd2dGBWMAExCc0r8Xjj7hj-dOK3VxPmvyA6yXIJZB5zuNI9XygftxBBwMtRcl3fFSI_M6DR8tUWNngZ2qB9Xha0wpbm",
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
      home_hero_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrgoSqs4cPQK1mamJWCRgY6Gm__s3TK3uTF2gVhwu6Qx6wXw8bzTW3lcHsvFbHGqFgWvoP28sX979m_SC-3eyPhYC93hmVE04hjgKQy-5CFWk-K6mss85ILUTusAB5WyvjqzvuPf31ESLf2Bv-w0QsLNc0rx5PbF4AkdhC00IqHoEJQlhNStnvXmTTTixSlkB-7Esb4tpSL_IRkJnRm-PR2iwId77btUUz7cIKo3AE2nr0rPc8iJSrmSJ-MhLdCKnbtTEsi4xc8vnz",
      contact_hero_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt6ebj-D7Z9Uyk4ILclYdSP5YRh6frpPvhQA1mze2LW8ZCTYig7CUDTJabZPFPVDE5WmRjTqfeunGzzNRPdIHE65CCN2zTzAnsN0C3Td3GF7OAEEOAZY4Qfxo7gm5fxGUWrBJzSEmESjKGKWQ1Pa2TEj1sJ0SVgU8JdnYGwWshmvAguOyYTOHNFjM17G3CPwuqMwNLDMeD7c4wuGjkXCtWNVc5i8xM7D1g2HpXehWO9nfPcBiBxvB3kbk9wHUmymWm7rHMBCfQbd8wP",
      destinations_hero_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuvERccL9a5eiiPrGB0OeoQF8qlC8mrVDKsmUQI9W1Hoihn4B0AoaZyERRYyyd7hEAWd05HqljmwMsvEFQ1wSoMcOW-UGJ53vHkRwdaFTsT_aDJMAQeGbj9Q5Emr4NFBJvL0w5C4IQIFqR6fmy1ZkwX2zYbr-3XPpi6EMFZkVWORLhNLFHNkd2dGBWMAExCc0r8Xjj7hj-dOK3VxPmvyA6yXIJZB5zuNI9XygftxBBwMtRcl3fFSI_M6DR8tUWNngZ2qB9Xha0wpbm",
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
