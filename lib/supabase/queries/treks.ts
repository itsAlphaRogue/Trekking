"use server";

import { createClient } from "@/lib/supabase/server";


import { createClient as createBrowserClient } from "@supabase/supabase-js";

// ─── Types ────────────────────────────────────────────────────────────────────
// These mirror the DB columns exactly (snake_case) and camelCase aliases
// from the v_trek_listing and v_trek_detail views.

export type Difficulty =
  | "Easy"
  | "Moderate"
  | "Strenuous"
  | "Challenging"
  | "Remote";

export interface TrekListing {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  duration: number;
  priceFrom: number;
  image: string | null;
  is_featured: boolean;
  sort_order: number;
  region: string;
  regionLabel: string;
}

export interface TrekDetail {
  id: string;
  slug: string;
  title: string;
  tagline: string | null;
  heroImage: string | null;
  regionLabel: string | null;
  regionSlug: string;
  duration: number;
  maxAltitude: string | null;
  difficulty: Difficulty;
  groupSize: string | null;
  priceFrom: number;
  nextDeparture: string | null;
  avgTemp: string | null;
  windSpeed: string | null;
  guideName: string | null;
  guideTitle: string | null;
  guideQuote: string | null;
  guideImage: string | null;
}

export interface ItineraryDay {
  id: string;
  day: string;
  title: string;
  description: string | null;
  is_collapsed: boolean;
  sort_order: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string | null;
  span: "normal" | "wide";
  sort_order: number;
}

export interface TrekFilters {
  q?: string;
  difficulty?: Difficulty[];
  regions?: string[];
  minPrice?: number;
  maxPrice?: number;
  maxDuration?: number;
  sortBy?: "popular" | "price_asc" | "price_desc" | "duration_asc";
  page?: number;
  isFeatured?: boolean;
}

const TREKS_PER_PAGE = 8;

// ─── Queries ──────────────────────────────────────────────────────────────────

/**
 * Query trek listings with filters, sorting, and pagination.
 * Used on the /treks listing page.
 * Reads from the v_trek_listing view.
 */
export async function queryTreks(filters: TrekFilters = {}): Promise<{
  treks: TrekListing[];
  total: number;
  totalPages: number;
}> {
  const supabase = await createClient();
  const page = filters.page ?? 1;
  const from = (page - 1) * TREKS_PER_PAGE;
  const to = from + TREKS_PER_PAGE - 1;

  let query = supabase
    .from("v_trek_listing")
    .select("*", { count: "exact" });

  // Keyword search (uses pg_trgm index via ilike)
  if (filters.q) {
    query = query.or(
      `title.ilike.%${filters.q}%,description.ilike.%${filters.q}%`
    );
  }

  // Difficulty filter
  if (filters.difficulty && filters.difficulty.length > 0) {
    query = query.in("difficulty", filters.difficulty);
  }

  // Region filter
  if (filters.regions && filters.regions.length > 0) {
    query = query.in("region", filters.regions);
  }

  // Price filter
  if (filters.minPrice !== undefined) {
    query = query.gte("priceFrom", filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte("priceFrom", filters.maxPrice);
  }

  // Duration filter
  if (filters.maxDuration !== undefined) {
    query = query.lte("duration", filters.maxDuration);
  }

  // Featured filter
  if (filters.isFeatured !== undefined) {
    query = query.eq("is_featured", filters.isFeatured);
  }

  // Sort
  switch (filters.sortBy) {
    case "price_asc":
      query = query.order("priceFrom", { ascending: true });
      break;
    case "price_desc":
      query = query.order("priceFrom", { ascending: false });
      break;
    case "duration_asc":
      query = query.order("duration", { ascending: true });
      break;
    default:
      // "popular" — use sort_order defined by admin
      query = query.order("sort_order", { ascending: true });
      break;
  }

  // Pagination
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error("queryTreks error:", error.message);
    return { treks: [], total: 0, totalPages: 0 };
  }

  const total = count ?? 0;
  const totalPages = Math.ceil(total / TREKS_PER_PAGE);

  return { treks: (data as TrekListing[]) ?? [], total, totalPages };
}


/**
 * Fetch a single trek's full detail by slug.
 * Used on /treks/[slug].
 * Reads from the v_trek_detail view.
 */
export async function getTrekBySlug(slug: string): Promise<TrekDetail | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("v_trek_detail")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("getTrekBySlug error:", error.message);
    return null;
  }

  return data as TrekDetail;
}


/**
 * Fetch all itinerary days for a trek.
 * Used on /treks/[slug].
 */
export async function getTrekItinerary(trekId: string): Promise<ItineraryDay[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("itinerary_days")
    .select("id, day, title, description, is_collapsed, sort_order")
    .eq("trek_id", trekId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getTrekItinerary error:", error.message);
    return [];
  }

  return (data as ItineraryDay[]) ?? [];
}


/**
 * Fetch all gallery images for a trek.
 * Used on /treks/[slug].
 */
export async function getTrekGallery(trekId: string): Promise<GalleryImage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, src, alt, span, sort_order")
    .eq("trek_id", trekId)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getTrekGallery error:", error.message);
    return [];
  }

  return (data as GalleryImage[]) ?? [];
}


/**
 * Fetch all published trek slugs.
 * Used for generateStaticParams on /treks/[slug].
 */
export async function getAllTrekSlugs(): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("treks")
    .select("slug")
    .eq("is_published", true);

  if (error) {
    console.error("getAllTrekSlugs error:", error.message);
    return [];
  }

  return (data ?? []).map((t: { slug: string }) => t.slug);
}

/**
 * Static client — no cookies, safe to call from generateStaticParams at build time.
 * generateStaticParams runs without an HTTP request so cookies() is not available.
 */
export async function getAllTrekSlugsStatic(): Promise<string[]> {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("treks")
    .select("slug")
    .eq("is_published", true);

  if (error) {
    console.error("getAllTrekSlugsStatic error:", error.message);
    return [];
  }

  return (data ?? []).map((t: { slug: string }) => t.slug);
}
