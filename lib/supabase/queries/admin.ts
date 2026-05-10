import { createClient } from "@/lib/supabase/server";

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
    publishedTreks:   treksResult.count      ?? 0,
    publishedRegions: regionsResult.count    ?? 0,
    draftTreks:       unpublishedResult.count ?? 0,
  };
}
