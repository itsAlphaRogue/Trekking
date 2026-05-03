/**
 * Trek listing types.
 * When Supabase is connected, replace the static `allTrips` array
 * with a query to the `treks` table. The TripListing interface maps
 * 1:1 to the expected DB columns.
 */

import { Difficulty } from "./regions";
export type { Difficulty };

export interface TripListing {
  id: string;
  slug: string;
  title: string;
  description: string;
  region: string;           // FK → regions.slug
  regionLabel: string;
  duration: number;         // days
  difficulty: Difficulty;
  priceFrom: number;        // USD
  image: string;
}

export interface TripFilters {
  q?: string;
  difficulty?: Difficulty[];
  regions?: string[];
  minPrice?: number;
  maxPrice?: number;
  maxDuration?: number;
  sortBy?: "popular" | "price_asc" | "price_desc" | "duration_asc";
  page?: number;
}

export const TRIPS_PER_PAGE = 8;

// ---------------------------------------------------------------------------
// Static data — swap this function body for a Supabase query later:
//
//   const { data } = await supabase
//     .from("treks")
//     .select("*")
//     .ilike("title", `%${filters.q}%`)
//     .in("difficulty", filters.difficulty ?? [])
//     ...
// ---------------------------------------------------------------------------
export const allTrips: TripListing[] = [
  {
    id: "1",
    slug: "everest-base-camp",
    title: "Everest Base Camp Trek",
    description: "The quintessential Himalayan journey to the foot of the world's highest peak through Sherpa villages.",
    region: "everest",
    regionLabel: "Everest Region",
    duration: 14,
    difficulty: "Challenging",
    priceFrom: 2450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPW7Bv78AVZQEnQ7pXSepZrgYFgYuw-1yXQxmHuXQDbjDFNc5uOXO_tBrfHfYV7qzp0Oaf3sF7Se9_12oyOqVfw6Mz13Idq-Wmj5Sz4HapnGuXpJHJzfxaz0Sy00t8jc3jNuocNFN7JFxiEvpx1BfFWeqG6H6MKGR-1GIBz0ta_ZBwQB5BPNzBzviXJsb2J1h-cmaUOSe9iF3GleGhIH8s_smnSkheXQ6gRrW-Q7lXD9PYTq7xAfb-G6PWuEdX1oT-SFivHsHBo6xj",
  },
  {
    id: "2",
    slug: "annapurna-circuit",
    title: "Annapurna Circuit",
    description: "A classic diverse trek crossing the Thorong La Pass at 5,416m, offering incredible landscape variety.",
    region: "annapurna",
    regionLabel: "Annapurna Region",
    duration: 18,
    difficulty: "Strenuous",
    priceFrom: 2100,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZgp6rVKbJ0wjdYE-KnRNcDuTIxMiJLQ1vTmlka8PaoGHw3GuQc6HtSpStM5zpYcFJSYhvWfQuxvhr2JRY9lrv74z5uTm_A3yO4K2wC5L0fpuvgNzuJg5jd7wEuKRI9k_qojBHo9HBEFxjItuPu1CZkv4-K04EHt5jQSWq22u-RJq3-rTVb2nt5U3qSW9T8Cmon57MvGxAijhfZRWNQz8zsFh1QVjlunqvyxF7W8yFb5OU89VoQY4axaQ1i7UM9a1l74gS_jM2EQbs",
  },
  {
    id: "3",
    slug: "manaslu-circuit",
    title: "Manaslu Circuit Trek",
    description: "An off-the-beaten-path alternative to the Annapurna Circuit, circumnavigating the world's 8th highest mountain.",
    region: "manaslu",
    regionLabel: "Manaslu Region",
    duration: 16,
    difficulty: "Strenuous",
    priceFrom: 1950,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIP1BDB_1AJC7e8P2x6M-o1KSDAC_Jd_SlEBGeWlbDHFP8ztOwHkeHsvoTNWIvxV2koeKPKG01v6mB1-BTvjCmqqH9lqXwV353Cf0McQefA6KLpO9FFeYqTK-50_ihZlS-jGoB-CwGVJoj2UlEXRuoUc0naYcEncgg-MO6cD_AT_DXEXLbTVCWtcvtdGfGP5khom0R59NBgqGaq1be_HKROoi16WeTk-FB8h2suixeEdGCmJDfZ7zBNYjs-TevftIRe7bt7UAYJdkC",
  },
  {
    id: "4",
    slug: "gokyo-lakes",
    title: "Gokyo Lakes Trek",
    description: "Explore the turquoise glacial lakes of the Everest region and climb Gokyo Ri for incredible vistas.",
    region: "everest",
    regionLabel: "Everest Region",
    duration: 12,
    difficulty: "Moderate",
    priceFrom: 2200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuOeurPloRRhH1st2YCR1ai0LuIBNOy12d1nPCNIVUdi8AMU3qjOTPgJow8592tl99r6fLz3YUasor7OEWj475Wb8BmzuD9p4brOswUR4VYVBxZUGv9ZPdixC3T9949AHFjI3mYlE2OuVXS3fTqnwfyealhVX2VDE7Ltiy3zlQK3-Tg44wlns28aJU5-PgSk3d46lcCtM3eW9Epa8agOiI9xGlnD4xlexhX98_7F3dpnAPEXCFPSoC8NXHG8DynpUGdwy7PSHouOsp",
  },
  {
    id: "5",
    slug: "annapurna-base-camp",
    title: "Annapurna Base Camp Trek",
    description: "Trek into the heart of the Annapurna Sanctuary, surrounded by ten peaks over 6,000m.",
    region: "annapurna",
    regionLabel: "Annapurna Region",
    duration: 10,
    difficulty: "Moderate",
    priceFrom: 1200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbyilJMjg2y5GTKzj_5m7KFrQ19In2XvZaLyCyRH6JpW3HUSFxJursJFkKkqCNm6SEzKp-XacFLDSYmDToVJCWj6tSy3raHYz5hLUGKGT1NNXDTgENt0z7cmliuamyTzudgojIdUhMd-pQRFICijO7g1LBZ2jnoxKCESsRUa7xBhzpn3YsVpj_3EF4mYCXm0A03XxpfHEKOo_rbWwbaH6XTtKQEpqieDCCLUkA8TGoOcXdpT5H_9e9FLViwmFyLtWPblt6piR_813W",
  },
  {
    id: "6",
    slug: "three-passes-trek",
    title: "Three Passes Trek",
    description: "The ultimate Everest challenge — cross Kongma La, Cho La, and Renjo La for the full Khumbu experience.",
    region: "everest",
    regionLabel: "Everest Region",
    duration: 20,
    difficulty: "Challenging",
    priceFrom: 2200,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAp_FbyXWbXBdV7F2UABPScVcdQ8nt5Z_NjB0y0QUaws0xRJExVe6c_c3oZrqCCkLh84xkgL3kR92k3vmkL1oKOjxnXL0wNoJ2ktktPwaBm2bcq81xGdAze8A0MAZtdCGZ8mCkMNs68aDJeMN_75r9R06oKSWk-5A32mZnSqsUJw0x7IaOAjyhW8WV-mwlUWL8Zu79DyOWqrcuaanQlmuyRhRZIB-Y8Bo1aeWpdZhypnbIaShxtlOp7BtVQ_jnTVddNc-YxML8bt_W0",
  },
  {
    id: "7",
    slug: "langtang-valley-trek",
    title: "Langtang Valley Trek",
    description: "Follow the Langtang River through dense forests to the glaciers at the head of the valley.",
    region: "langtang",
    regionLabel: "Langtang Valley",
    duration: 7,
    difficulty: "Moderate",
    priceFrom: 850,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHSYvqHqr8HL9aGUKW68hU1yeZ_GOtdEyJcmRzjuVGbim9yaN7AKXCYFANtLHMnaKYK_kYW28urHdRcVFxpodG16vBKVYeFa0smW7cxVSzvyE5SlUZQMGaVq3gpma0959hS3R2v93lqkRGi9x0m0dsqAia6zRNczuBj2o4KecnD1raosLh9uwlJaxb_9mTVu1RQ39w7KpI8G0kGeHhNQeytAZPmwV1JPfej85gasqY_LHabG6z7Cta91cy7aFevzFDSWxF6xSf1fQk",
  },
  {
    id: "8",
    slug: "upper-mustang",
    title: "Upper Mustang Trek",
    description: "Journey through the ancient kingdom of Mustang, a restricted area preserving centuries-old Tibetan culture.",
    region: "annapurna",
    regionLabel: "Annapurna Region",
    duration: 12,
    difficulty: "Moderate",
    priceFrom: 1900,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_kstuF48RGFkQbf4KAyt8HrfqFainFIh1tz9q4BqUKc0NfpT0-gP5Ckadcgq8-tF8rarESuMGk2qPXHanIkm1_kZ_L6N7dRZZdQ2Qe7XTE8-MGMRltqAJExUsJN3iXWB2oRs45BeQQsLAf9zViThPyjW-GCYvc48P4B8U743YeX_hEJVolJbyWqxqkpF0roWpkBRvCrLD4Wmsb0sP37BKbL-M-3LaFLsR_yb5P3jWPvi1JJM4Cn-RQ-fb71fwi_E-cMFO_kp-zqS4",
  },
];

/**
 * Filter + sort + paginate trips.
 * Replace the body of this function with a Supabase call to go live.
 */
export function queryTrips(filters: TripFilters): {
  trips: TripListing[];
  total: number;
  totalPages: number;
} {
  let results = [...allTrips];

  // Keyword search
  if (filters.q) {
    const q = filters.q.toLowerCase();
    results = results.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.regionLabel.toLowerCase().includes(q)
    );
  }

  // Difficulty filter
  if (filters.difficulty && filters.difficulty.length > 0) {
    results = results.filter((t) =>
      filters.difficulty!.includes(t.difficulty)
    );
  }

  // Region filter
  if (filters.regions && filters.regions.length > 0) {
    results = results.filter((t) => filters.regions!.includes(t.region));
  }

  // Price filter
  if (filters.minPrice !== undefined) {
    results = results.filter((t) => t.priceFrom >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    results = results.filter((t) => t.priceFrom <= filters.maxPrice!);
  }

  // Duration filter
  if (filters.maxDuration !== undefined) {
    results = results.filter((t) => t.duration <= filters.maxDuration!);
  }

  // Sort
  switch (filters.sortBy) {
    case "price_asc":
      results.sort((a, b) => a.priceFrom - b.priceFrom);
      break;
    case "price_desc":
      results.sort((a, b) => b.priceFrom - a.priceFrom);
      break;
    case "duration_asc":
      results.sort((a, b) => a.duration - b.duration);
      break;
    default: // popular — keep original order
      break;
  }

  const total = results.length;
  const page = filters.page ?? 1;
  const totalPages = Math.ceil(total / TRIPS_PER_PAGE);
  const start = (page - 1) * TRIPS_PER_PAGE;
  const trips = results.slice(start, start + TRIPS_PER_PAGE);

  return { trips, total, totalPages };
}
