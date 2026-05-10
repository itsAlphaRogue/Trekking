import { createClient } from "@/lib/supabase/server";
import { createClient as createBrowserClient } from "@supabase/supabase-js";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RegionListing {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  badge: string | null;
  cardDescription: string | null;
  heroImage: string | null;
  heroLabel: string | null;
  sortOrder: number;
  isPublished: boolean;
}

export interface RegionDetail {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  card_description: string | null;
  hero_image: string | null;
  hero_label: string | null;
  specialty_image: string | null;
  badge: string | null;
  elevation: string | null;
  difficulty: string | null;
  best_season: string | null;
  sort_order: number;
}

export interface RegionSpecialty {
  id: string;
  number: string;
  title: string;
  description: string | null;
  sort_order: number;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Fetch all published regions ordered by sort_order.
 * Used on the /destinations bento grid.
 * Reads from v_region_listing view.
 */
export async function getRegions(): Promise<RegionListing[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("v_region_listing")
    .select("*")
    .order("sortOrder", { ascending: true });

  if (error) {
    console.error("getRegions error:", error.message);
    return [];
  }

  return (data as RegionListing[]) ?? [];
}


/**
 * Fetch a single region's full detail by slug.
 * Used on /destinations/[slug].
 */
export async function getRegionBySlug(
  slug: string
): Promise<RegionDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("regions")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    console.error("getRegionBySlug error:", error.message);
    return null;
  }

  return data as RegionDetail;
}


/**
 * Fetch all specialties for a region.
 * Used on /destinations/[slug].
 */
export async function getRegionSpecialties(
  regionId: string
): Promise<RegionSpecialty[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("region_specialties")
    .select("id, number, title, description, sort_order")
    .eq("region_id", regionId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getRegionSpecialties error:", error.message);
    return [];
  }

  return (data as RegionSpecialty[]) ?? [];
}


/**
 * Fetch treks belonging to a region (for region detail page).
 * Returns a lightweight subset — enough for the trek cards.
 */
export async function getTreksByRegion(regionSlug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("treks")
    .select("id, slug, title, description, difficulty, duration, price_from, image")
    .eq("region_slug", regionSlug)
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getTreksByRegion error:", error.message);
    return [];
  }

  return data ?? [];
}


/**
 * Fetch all published region slugs.
 * Used for generateStaticParams on /destinations/[slug].
 */
export async function getAllRegionSlugs(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("regions")
    .select("slug")
    .eq("is_published", true);

  if (error) {
    console.error("getAllRegionSlugs error:", error.message);
    return [];
  }

  return (data ?? []).map((r: { slug: string }) => r.slug);
}

/**
 * Static client — no cookies, safe to call from generateStaticParams at build time.
 * generateStaticParams runs without an HTTP request so cookies() is not available.
 */
export async function getAllRegionSlugsStatic(): Promise<string[]> {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("regions")
    .select("slug")
    .eq("is_published", true);

  if (error) {
    console.error("getAllRegionSlugsStatic error:", error.message);
    return [];
  }

  return (data ?? []).map((r: { slug: string }) => r.slug);
}
