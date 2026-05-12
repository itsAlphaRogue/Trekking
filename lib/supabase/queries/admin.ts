"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin_client";

// ─── Region CRUD ──────────────────────────────────────────────────────────────

export async function adminGetRegions() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("regions")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function adminUpsertRegion(region: {
  id?: string;
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  card_description?: string;
  hero_image?: string;
  hero_label?: string;
  specialty_image?: string;
  badge?: string;
  elevation?: string;
  difficulty?: string;
  best_season?: string;
  sort_order?: number;
  is_published?: boolean;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("regions")
    .upsert(region, { onConflict: "id" })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function adminDeleteRegion(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("regions")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}

// ─── Region Specialties CRUD ──────────────────────────────────────────────────

export async function adminGetSpecialties(regionId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("region_specialties")
    .select("*")
    .eq("region_id", regionId)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function adminUpsertSpecialty(specialty: {
  id?: string;
  region_id: string;
  number: string;
  title: string;
  description?: string;
  sort_order?: number;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("region_specialties")
    .upsert(specialty, { onConflict: "id" })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function adminDeleteSpecialty(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("region_specialties")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}

// ─── Trek CRUD ────────────────────────────────────────────────────────────────

export async function adminGetTreks() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("treks")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function adminUpsertTrek(trek: {
  id?: string;
  slug: string;
  title: string;
  description?: string;
  tagline?: string;
  region_slug: string;
  region_label?: string;
  duration?: number;
  difficulty?: string;
  price_from?: number;
  image?: string;
  hero_image?: string;
  max_altitude?: string;
  group_size?: string;
  next_departure?: string;
  guide_name?: string;
  guide_title?: string;
  guide_image?: string;
  guide_quote?: string;
  avg_temp?: string;
  wind_speed?: string;
  is_published?: boolean;
  is_featured?: boolean;
  sort_order?: number;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("treks")
    .upsert(trek, { onConflict: "id" })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function adminDeleteTrek(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("treks")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}

// ─── Itinerary CRUD ───────────────────────────────────────────────────────────

export async function adminGetItinerary(trekId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("itinerary_days")
    .select("*")
    .eq("trek_id", trekId)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function adminUpsertItineraryDay(day: {
  id?: string;
  trek_id: string;
  day: string;
  title: string;
  description?: string;
  is_collapsed?: boolean;
  sort_order?: number;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("itinerary_days")
    .upsert(day, { onConflict: "id" })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function adminDeleteItineraryDay(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("itinerary_days")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}

// ─── Gallery CRUD ─────────────────────────────────────────────────────────────

export async function adminGetGallery(trekId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("trek_id", trekId)
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function adminUpsertGalleryImage(image: {
  id?: string;
  trek_id: string;
  src: string;
  alt?: string;
  span?: "normal" | "wide";
  sort_order?: number;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_images")
    .upsert(image, { onConflict: "id" })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function adminDeleteGalleryImage(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("gallery_images")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}

// ─── Dashboard KPIs ───────────────────────────────────────────────────────────

export async function adminGetDashboardStats() {
  const supabase = await createClient();

  const [treksResult, regionsResult, unpublishedResult] = await Promise.all([
    supabase
      .from("treks")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true),
    supabase
      .from("regions")
      .select("id", { count: "exact", head: true })
      .eq("is_published", true),
    supabase
      .from("treks")
      .select("id", { count: "exact", head: true })
      .eq("is_published", false),
  ]);

  return {
    publishedTreks: treksResult.count ?? 0,
    publishedRegions: regionsResult.count ?? 0,
    draftTreks: unpublishedResult.count ?? 0,
  };
}

// ─── Profile & Settings ────────────────────────────────────────────────────────

export async function adminGetProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.error("Profile fetch error:", JSON.stringify(error, null, 2));
  }

  return {
    full_name: data?.full_name || user.user_metadata?.full_name || "",
    role_label: data?.role_label || user.user_metadata?.role_label || "",
    email: user.email || data?.email || "",
    phone: user.phone || data?.phone || "",
    avatar_url: data?.avatar_url || user.user_metadata?.avatar_url || "",
  };
}

export async function adminUpdateProfile(profile: {
  full_name?: string;
  role_label?: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
}) {
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // 1. Update the Auth User (the "authentication tab" row)
  const { error: authError } = await adminSupabase.auth.admin.updateUserById(
    user.id,
    {
      email: profile.email,
      phone: profile.phone,
      user_metadata: {
        full_name: profile.full_name,
        role_label: profile.role_label,
        avatar_url: profile.avatar_url,
      },
      email_confirm: true,
      phone_confirm: true,
    }
  );

  if (authError) throw new Error(authError.message);

  // 2. Update the public.profiles table (for public visibility)
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      full_name: profile.full_name,
      role_label: profile.role_label,
      email: profile.email,
      phone: profile.phone,
      avatar_url: profile.avatar_url,
      role: "admin", // Ensure the role is preserved for public contact queries
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function adminUpdatePassword(currentPassword: string, newPassword: string) {
  const supabase = await createClient();

  // 1. Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) throw new Error("Not authenticated");

  // 2. Verify current password by attempting to sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    throw new Error("Invalid current password");
  }

  // 3. Update to new password
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw new Error(error.message);
  return { success: true };
}

import { getSettings } from "./settings";

/**
 * Publicly accessible function to get the primary admin's contact info.
 * This is used for WhatsApp and Email links across the site.
 */
export async function getAdminContact() {
  const settings = await getSettings();
  return {
    email: settings.email,
    phone: settings.phone,
  };
}
