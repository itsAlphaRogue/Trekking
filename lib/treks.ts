import { Difficulty } from "./regions";

export interface ItineraryDay {
  day: string;
  title: string;
  description: string;
  isCollapsed?: boolean;
}

export interface GalleryImage {
  src: string;
  alt: string;
  span?: "wide";
}

export interface TrekDetail {
  slug: string;
  regionSlug: string;
  title: string;
  tagline: string;
  heroImage: string;
  regionLabel: string;
  stats: {
    duration: string;
    maxAltitude: string;
    difficulty: Difficulty;
    groupSize: string;
  };
  nextDeparture: string;
  priceFrom: number;
  guideImage: string;
  guideName: string;
  guideTitle: string;
  guideQuote: string;
  weather: { avgTemp: string; windSpeed: string };
  itinerary: ItineraryDay[];
  gallery: GalleryImage[];
}

export const trekDetails: TrekDetail[] = [
  {
    slug: "everest-base-camp",
    regionSlug: "everest",
    title: "Everest Base Camp Trek",
    tagline: "The world's most iconic trek. Journey through the heart of the Khumbu, passing Sherpa villages and ancient monasteries to the foot of the world's highest peak.",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSLnKeOLozFjtiQz8B8ijS4jABgoQEPd7UwCJ6SwwClEAEl9gJd_lrNmAVxrwlDF9_YVvKugu77y6bx6hWtErZyQ8iCNnHqWtpdugDK_ddc7ZiiTkypEKsVuMKq00K5JuvSoiXPJ-Vl6ImxlV8gB6aqiOT0nJgdN6PPsK3dZFakugzIrKF48XzyAXmKKMi3XFACjbARkVLU0cyMWtC6L_yuERlVUS2H_eQKfNxzUZm2D4rdi8lrIIDtGtCt062mThU-6zQbt7k3rDd",
    regionLabel: "Nepal • High Altitude",
    stats: { duration: "14 Days", maxAltitude: "5,364m", difficulty: "Challenging", groupSize: "2 – 12 People" },
    nextDeparture: "12 Oct 2024",
    priceFrom: 2450,
    guideImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAzndNoXl4mK3K2JEmB-aNPoVQHr-dC_qGJpfUzD13nyanT36o4JPguxWAQwvEhvB0-VOwumjs3bJj1y7FcHKGBv_h7Ssi1HLi53tpNEKIGci-2_QuB1MAVp9w5iVFPyE1a99bfNmrRaJA1T67fhKK-tVf_v7I1XRZgnLN-BDc7jvWHWf01RUVLq2S1BQT_AgrEDGD9-rBChGAvQDDJadgkVUE932w5mTcMIP2pGB3K-duREn8qOZJA_i8W6Vs0HyExpL2yShFoavz",
    guideName: "Lhakpa Sherpa",
    guideTitle: "Expedition Lead, 12× Summiter",
    guideQuote: "We don't just guide; we ensure you feel the spirit of the mountains safely.",
    weather: { avgTemp: "-10°C / 14°F", windSpeed: "15 km/h" },
    itinerary: [
      { day: "Day 1", title: "Arrival in Kathmandu", description: "Arrival at Tribhuvan International Airport. Transfer to your hotel in Thamel. Group briefing in the evening." },
      { day: "Day 2", title: "Flight to Lukla & Trek to Phakding", description: "Experience one of the world's most thrilling flights to Lukla (2,860m), then a 3-hour trek to Phakding." },
      { day: "Day 3", title: "Namche Bazaar", description: "A steep ascent into the Sagarmatha National Park, crossing the iconic Hillary Suspension Bridge to reach the Sherpa capital." },
      { day: "Days 4 – 13", title: "Acclimatization & High Altitude Passes", description: "High altitude acclimatization, Tengboche Monastery, Lobuche, and the final push to Base Camp.", isCollapsed: true },
      { day: "Day 14", title: "Final Departure", description: "Transfer to Kathmandu Airport for your flight home, carrying memories of the high Himalayas." },
    ],
    gallery: [
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9aT551VCfLaCHIeGZNAxxX09o68Wwypr2aGzDfOUcn4rX2gy66nnJ56Wx8J_ub8jIb-TxP2FIeSF-q7UFkjIf4CNDJeYGYRTF2_S3UF3Q2vn8XNe158sRUBjwhAW4N4sVqbJ75znsu3wqeoZqIMYi8krvnfjoz_Cfkyv0C2-L9t7Kny7AmBF5VaXTa-F1a6YoHnZIM25Jn3wdu9To9wvTfSXz-tTp9lU2XfEGOlRXKzUxcFyKwdBuIWHOaLNSAXjUqguC4vpMip3h", alt: "Mountain View" },
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVwnQ7Cp-3E3Ge-nLj7h6BykmM3Vyy2-Kggg_MQvPqY8EG8sR5eNnlNKeuqeR8tpzK7rZFzNhKnxa8sPCalBlcPhdV6wb9KGYMlPgpbqi557tOkn0dveiZA1eqOOixlT8AwxB5PFqGi7cGAj9Yu2i36Q4qmC40elPx-1oFmZMQMuN1YAxF1UxUocXMm_iTc5ZZIZ4H5HnDTFoMZrI4dANELYvQhs_R7EwfW0vcbqD-Phy82nb5UHkUuMVLtcVGOEjCuTw-QC58H0Lq", alt: "Prayer Flags" },
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEiet9sZvMtC0XRcdeWSwn6d4KOo4QvAjzOq4VQR39v-GWUUIlMird7KClrtnlDE-BCjVSsw3qJ7o8cZnnuJP4MybiujvzagtOEbwsW9XLjRoc8DOx0-uTvG75_2-wSMdI2YGNGfyVtaxtsBD75E2-dhiUWGQCkMI5T9dwSDl_iT114RZK8cnbZqcYVGaVrEQBMZek7mAkrWGLI_jrkdqOwsnTwGoC-BPcRj1rRPmrzxwS0NcakmpmrEA6QiajVvIW4bbORmTNCuOX", alt: "Sherpa Village" },
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQbMAvsDPyk9maCMEo2_ChiNU3iYuWZ8fyMDpBA_elsxoQWTXZRCeLzxI44dDG0-eQlI0i8tC7PzMK3Axk--bKNoOwX-PeQdADr3iYUvp_YdMf96RD4GNfneTtfcTuVtV-gSnhPE9uoBfmlEo4osAcpiMe5jVhsadwEmsJyNWY1EV-jFv65fm0kXfViBvH37nd1afKvQroYruvLbxnentUfcV4HYko48oaVbINpahcMOV76ldN5M_S9KCmKstzAorwwNHVao2Dg3QY", alt: "Base Camp", span: "wide" },
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrYUOKm1Ee2AjQIsYUQiGnjrKI8I5WGkiEy3sVIRsDD5yFE-MyZqA3NptSp8mxG2ag4sl1wZRXIvQTuxB6Ewdtg208WgxM-9jY4Lb_38pSovPiTEpNh7PoTXXWZTtFLEJbj2nUMn0VGL4XBNdwuWFTlFh078Osdx-bqaO8pcUl0nW7eRxaN7O4j5DShIo7X536in_EDeWcip8_FYbj2EsvXZaZoNPiYrcycuO_5A8xYNKcCmbTVSZZNrGKo6_L99TlqUJ-W-BS9GT4", alt: "Trekker" },
    ],
  },
  {
    slug: "gokyo-lakes",
    regionSlug: "everest",
    title: "Gokyo Lakes Trek",
    tagline: "A stunning alternative to the main trail, featuring high-altitude glacial lakes and panoramic views from Gokyo Ri.",
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpo4cAzO44kpOJMDqmUHSr5ym12PsWsyj_0F9bYK1P5_HlwwiTjZA0IcTbZsUE2o8ValuClufH6lhpMTuhGlKazIkhrdVWbZXXMf7yugB6HUU-osVGTzfwPJDg-5GFbw--7azHkBLr-jKO-s-GXeb4jmnsx9kJBht7uQ8fyr-4Jm-HnXgBBUvMUyAt2bw7UYkHDzax6JrUpQJGvOOJOgKsZiK-h6a8IIoUloQdvP6wtnFeKJE3KF_-t42qx--7ivELCEGCeQIkPqWY",
    regionLabel: "Nepal • Khumbu",
    stats: { duration: "12 Days", maxAltitude: "5,357m", difficulty: "Moderate", groupSize: "2 – 10 People" },
    nextDeparture: "15 Oct 2024",
    priceFrom: 1650,
    guideImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAzndNoXl4mK3K2JEmB-aNPoVQHr-dC_qGJpfUzD13nyanT36o4JPguxWAQwvEhvB0-VOwumjs3bJj1y7FcHKGBv_h7Ssi1HLi53tpNEKIGci-2_QuB1MAVp9w5iVFPyE1a99bfNmrRaJA1T67fhKK-tVf_v7I1XRZgnLN-BDc7jvWHWf01RUVLq2S1BQT_AgrEDGD9-rBChGAvQDDJadgkVUE932w5mTcMIP2pGB3K-duREn8qOZJA_i8W6Vs0HyExpL2yShFoavz",
    guideName: "Pemba Dorje",
    guideTitle: "Senior Guide, 8× Summiter",
    guideQuote: "The Gokyo lakes hold a magic that Everest Base Camp alone cannot offer.",
    weather: { avgTemp: "-8°C / 18°F", windSpeed: "12 km/h" },
    itinerary: [
      { day: "Day 1", title: "Arrival in Kathmandu", description: "Arrive at Tribhuvan International Airport. Hotel check-in and orientation briefing." },
      { day: "Day 2", title: "Flight to Lukla & Trek to Phakding", description: "Morning flight to Lukla (2,860m) followed by an easy trek to Phakding along the Dudh Koshi River." },
      { day: "Day 3", title: "Trek to Namche Bazaar", description: "Climb steeply through pine forests into Sagarmatha National Park to reach the vibrant Sherpa hub." },
      { day: "Days 4 – 11", title: "Gokyo Valley & Lakes", description: "Acclimatization hike, onward trek to Dole, Machhermo, and the stunning Gokyo Lakes, with a summit of Gokyo Ri (5,357m).", isCollapsed: true },
      { day: "Day 12", title: "Return & Departure", description: "Descend to Lukla for your return flight to Kathmandu and onward connections." },
    ],
    gallery: [
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpo4cAzO44kpOJMDqmUHSr5ym12PsWsyj_0F9bYK1P5_HlwwiTjZA0IcTbZsUE2o8ValuClufH6lhpMTuhGlKazIkhrdVWbZXXMf7yugB6HUU-osVGTzfwPJDg-5GFbw--7azHkBLr-jKO-s-GXeb4jmnsx9kJBht7uQ8fyr-4Jm-HnXgBBUvMUyAt2bw7UYkHDzax6JrUpQJGvOOJOgKsZiK-h6a8IIoUloQdvP6wtnFeKJE3KF_-t42qx--7ivELCEGCeQIkPqWY", alt: "Gokyo Lakes", span: "wide" },
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9aT551VCfLaCHIeGZNAxxX09o68Wwypr2aGzDfOUcn4rX2gy66nnJ56Wx8J_ub8jIb-TxP2FIeSF-q7UFkjIf4CNDJeYGYRTF2_S3UF3Q2vn8XNe158sRUBjwhAW4N4sVqbJ75znsu3wqeoZqIMYi8krvnfjoz_Cfkyv0C2-L9t7Kny7AmBF5VaXTa-F1a6YoHnZIM25Jn3wdu9To9wvTfSXz-tTp9lU2XfEGOlRXKzUxcFyKwdBuIWHOaLNSAXjUqguC4vpMip3h", alt: "Mountain View" },
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVwnQ7Cp-3E3Ge-nLj7h6BykmM3Vyy2-Kggg_MQvPqY8EG8sR5eNnlNKeuqeR8tpzK7rZFzNhKnxa8sPCalBlcPhdV6wb9KGYMlPgpbqi557tOkn0dveiZA1eqOOixlT8AwxB5PFqGi7cGAj9Yu2i36Q4qmC40elPx-1oFmZMQMuN1YAxF1UxUocXMm_iTc5ZZIZ4H5HnDTFoMZrI4dANELYvQhs_R7EwfW0vcbqD-Phy82nb5UHkUuMVLtcVGOEjCuTw-QC58H0Lq", alt: "Prayer Flags" },
      { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEiet9sZvMtC0XRcdeWSwn6d4KOo4QvAjzOq4VQR39v-GWUUIlMird7KClrtnlDE-BCjVSsw3qJ7o8cZnnuJP4MybiujvzagtOEbwsW9XLjRoc8DOx0-uTvG75_2-wSMdI2YGNGfyVtaxtsBD75E2-dhiUWGQCkMI5T9dwSDl_iT114RZK8cnbZqcYVGaVrEQBMZek7mAkrWGLI_jrkdqOwsnTwGoC-BPcRj1rRPmrzxwS0NcakmpmrEA6QiajVvIW4bbORmTNCuOX", alt: "Sherpa Village" },
    ],
  },
];

export function getTrekBySlug(slug: string): TrekDetail | undefined {
  return trekDetails.find((t) => t.slug === slug);
}

export function getAllTrekSlugs(): string[] {
  return trekDetails.map((t) => t.slug);
}
