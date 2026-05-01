export type Difficulty = "Easy" | "Moderate" | "Strenuous" | "Challenging" | "Remote";

export interface Trek {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  difficulty: Difficulty;
  priceFrom: number;
  image: string;
}

export interface Region {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  heroLabel: string;
  description: string;
  stats: {
    elevation: string;
    difficulty: string;
    bestSeason: string;
  };
  specialties: {
    number: string;
    title: string;
    description: string;
  }[];
  specialtyImage: string;
  treks: Trek[];
}

export const regions: Region[] = [
  {
    slug: "everest",
    name: "Everest Region",
    tagline: "Heart of the Himalayas",
    heroLabel: "Nepal Sanctuary",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCQMt8dKq5e5JUgdgRFEXouvCXLCgY7NbKfl3D15BtgtAD49aPypWZ4BD1ekbid5uIxdiznAXE3t447A6cWPrzYp_dGEbSb0ldUYLevHMW-tES9LH6WqmJBtjYl9mB6cZ1bTr0lzP5N9sz6-kbRLTbdqdirt_PRBPpzH1eXNWjL-7VlsgjJpRj_unzN3pe1-8_-EvVlvmhTgaQf5OBq7qDW8yLijUk2sCr7ko47itwbLWjq7RwKLmLrOpSarHi52HPtjh1FNcpA0y60",
    description:
      "Home to the world's highest peaks and the resilient spirit of the Sherpa people. In the Khumbu Valley, ancient monasteries cling to cliffsides while the wind whispers secrets of legends across the high-altitude trails.",
    stats: {
      elevation: "4,000m+",
      difficulty: "Moderate to Challenging",
      bestSeason: "Mar–May & Oct–Nov",
    },
    specialtyImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADrG95PjVIKxTk7Zq0tvQ1Hif0Igtum4rtvjbquSENiInzM28550csQZHPS88zrMFUHof8hfJu9lCdgj1-FT-QsxHAnqv-X042pKXnm2jiRwz5QkSUpSTrl3kEjZfKF8sovIswS37U_oxD_KIItUkElyiwcpNnkv_4MMED4JHATspVV1rB6AZyJ2rMRoYD1Uf2wP9M6-Bmi8bfMRamE02w3N2lJlNypShjIUx-fdDyRv1hLiAvKkRWIyrXlvPg5F6gmL9PXyokRD-e",
    specialties: [
      {
        number: "01",
        title: "Gateway to the World's Highest Peaks",
        description:
          "Traverse the historic route used by pioneering expeditions, offering unparalleled views of Everest, Lhotse, and Nuptse.",
      },
      {
        number: "02",
        title: "Sherpa Heritage & Monasteries",
        description:
          "Experience the warmth of Tengboche Monastery and the unique high-altitude culture that has thrived for centuries.",
      },
      {
        number: "03",
        title: "Diverse High-Altitude Ecosystems",
        description:
          "From lush rhododendron forests to the stark, lunar landscapes of the Khumbu Glacier, the biodiversity is stunning.",
      },
    ],
    treks: [
      {
        id: "ebc",
        slug: "everest-base-camp",
        title: "Everest Base Camp",
        description:
          "The classic journey to the foot of the world's highest peak, passing through legendary Sherpa villages.",
        duration: "14 Days",
        difficulty: "Strenuous",
        priceFrom: 1850,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAQuzPaxHHbx_5anGSXcH9e97UV4HKLlc2l6n76UjhSEXlZphEWcPOaWP6nMfoWYQWO6oqiVsjSPGt9Rk_-7LcXAhe2fZfX67bqOkrKxl7ngT8ywMYo8uJy70WTsy6OHbD_aMkMtF6LFtCPpGgjAjuSh_qJaj1d4Pi9S3vXSOhQnC5PUAVCVmzxnWAbZkShJ8Fdj4Mi24Cza_V5UAP52j1lH13J6j1bYo68pSXwCU-hkIHoFM2lolYMPIUCJOutPARKRw4ZBAGm2MXM",
      },
      {
        id: "gokyo",
        slug: "gokyo-lakes",
        title: "Gokyo Lakes",
        description:
          "A stunning alternative to the main trail, featuring high-altitude glacial lakes and panoramic views from Gokyo Ri.",
        duration: "12 Days",
        difficulty: "Moderate",
        priceFrom: 1650,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBpo4cAzO44kpOJMDqmUHSr5ym12PsWsyj_0F9bYK1P5_HlwwiTjZA0IcTbZsUE2o8ValuClufH6lhpMTuhGlKazIkhrdVWbZXXMf7yugB6HUU-osVGTzfwPJDg-5GFbw--7azHkBLr-jKO-s-GXeb4jmnsx9kJBht7uQ8fyr-4Jm-HnXgBBUvMUyAt2bw7UYkHDzax6JrUpQJGvOOJOgKsZiK-h6a8IIoUloQdvP6wtnFeKJE3KF_-t42qx--7ivELCEGCeQIkPqWY",
      },
      {
        id: "three-passes",
        slug: "three-passes-trek",
        title: "Three Passes Trek",
        description:
          "The ultimate Everest challenge, crossing Kongma La, Cho La, and Renjo La for those who demand the full Khumbu experience.",
        duration: "20 Days",
        difficulty: "Challenging",
        priceFrom: 2200,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAp_FbyXWbXBdV7F2UABPScVcdQ8nt5Z_NjB0y0QUaws0xRJExVe6c_c3oZrqCCkLh84xkgL3kR92k3vmkL1oKOjxnXL0wNoJ2ktktPwaBm2bcq81xGdAze8A0MAZtdCGZ8mCkMNs68aDJeMN_75r9R06oKSWk-5A32mZnSqsUJw0x7IaOAjyhW8WV-mwlUWL8Zu79DyOWqrcuaanQlmuyRhRZIB-Y8Bo1aeWpdZhypnbIaShxtlOp7BtVQ_jnTVddNc-YxML8bt_W0",
      },
    ],
  },
  {
    slug: "annapurna",
    name: "Annapurna Region",
    tagline: "A Kaleidoscope of Landscapes",
    heroLabel: "Diverse Terrain",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbyilJMjg2y5GTKzj_5m7KFrQ19In2XvZaLyCyRH6JpW3HUSFxJursJFkKkqCNm6SEzKp-XacFLDSYmDToVJCWj6tSy3raHYz5hLUGKGT1NNXDTgENt0z7cmliuamyTzudgojIdUhMd-pQRFICijO7g1LBZ2jnoxKCESsRUa7xBhzpn3YsVpj_3EF4mYCXm0A03XxpfHEKOo_rbWwbaH6XTtKQEpqieDCCLUkA8TGoOcXdpT5H_9e9FLViwmFyLtWPblt6piR_813W",
    description:
      "A kaleidoscope of terrains ranging from lush subtropical forests to the arid high-altitude deserts of Mustang. The Annapurna massif is one of Nepal's most beloved trekking destinations, offering routes for every level.",
    stats: {
      elevation: "3,000m–5,416m",
      difficulty: "Easy to Strenuous",
      bestSeason: "Oct–Nov & Mar–Apr",
    },
    specialtyImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBgakyjk8UIHXM0ZqxxVaRpjSl9O5pjjjOkzcAIYNoYfU5SxJF2-GcpX7mDqCaMfdIVWcKVWic9BSzRcTNbarO6-8Y_Ow8SQTelmv89dpMf9Wjy1_zs1TmQFkJ4Lyfp5bvbDm0RXNUvMsnyhVqrQ9OkxvcI6Bu9XzQ8K4vq2sBHOEa2r04NukpMI86ZppgRAr4OdycoMFlQ2Uz3vWUVxjls_bh_Dkr2i3LYXP0I48s_9rWKYdQ1KV1VJnybvm4WnM0ZQO2D92W9_sZ8",
    specialties: [
      {
        number: "01",
        title: "World-Famous Annapurna Circuit",
        description:
          "One of the world's greatest treks, circumnavigating the entire Annapurna massif through diverse climates and cultures.",
      },
      {
        number: "02",
        title: "Annapurna Sanctuary",
        description:
          "Trek to the natural amphitheatre surrounded by 7,000m+ peaks — a place of extraordinary beauty and raw mountain power.",
      },
      {
        number: "03",
        title: "Upper Mustang: The Forbidden Kingdom",
        description:
          "A restricted zone until 1992, Upper Mustang offers a journey back in time through ancient Tibetan-influenced villages.",
      },
    ],
    treks: [
      {
        id: "abc",
        slug: "annapurna-base-camp",
        title: "Annapurna Base Camp",
        description:
          "Trek into the heart of the Annapurna Sanctuary, surrounded by ten peaks over 6,000m.",
        duration: "10 Days",
        difficulty: "Moderate",
        priceFrom: 1200,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCbyilJMjg2y5GTKzj_5m7KFrQ19In2XvZaLyCyRH6JpW3HUSFxJursJFkKkqCNm6SEzKp-XacFLDSYmDToVJCWj6tSy3raHYz5hLUGKGT1NNXDTgENt0z7cmliuamyTzudgojIdUhMd-pQRFICijO7g1LBZ2jnoxKCESsRUa7xBhzpn3YsVpj_3EF4mYCXm0A03XxpfHEKOo_rbWwbaH6XTtKQEpqieDCCLUkA8TGoOcXdpT5H_9e9FLViwmFyLtWPblt6piR_813W",
      },
      {
        id: "circuit",
        slug: "annapurna-circuit",
        title: "Annapurna Circuit",
        description:
          "A classic 15-day loop around the Annapurna massif, crossing the legendary Thorong La pass at 5,416m.",
        duration: "15 Days",
        difficulty: "Strenuous",
        priceFrom: 1550,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBgakyjk8UIHXM0ZqxxVaRpjSl9O5pjjjOkzcAIYNoYfU5SxJF2-GcpX7mDqCaMfdIVWcKVWic9BSzRcTNbarO6-8Y_Ow8SQTelmv89dpMf9Wjy1_zs1TmQFkJ4Lyfp5bvbDm0RXNUvMsnyhVqrQ9OkxvcI6Bu9XzQ8K4vq2sBHOEa2r04NukpMI86ZppgRAr4OdycoMFlQ2Uz3vWUVxjls_bh_Dkr2i3LYXP0I48s_9rWKYdQ1KV1VJnybvm4WnM0ZQO2D92W9_sZ8",
      },
      {
        id: "upper-mustang",
        slug: "upper-mustang",
        title: "Upper Mustang",
        description:
          "Journey through the ancient kingdom of Mustang, a restricted area preserving centuries-old Tibetan culture.",
        duration: "12 Days",
        difficulty: "Moderate",
        priceFrom: 1900,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA_kstuF48RGFkQbf4KAyt8HrfqFainFIh1tz9q4BqUKc0NfpT0-gP5Ckadcgq8-tF8rarESuMGk2qPXHanIkm1_kZ_L6N7dRZZdQ2Qe7XTE8-MGMRltqAJExUsJN3iXWB2oRs45BeQQsLAf9zViThPyjW-GCYvc48P4B8U743YeX_hEJVolJbyWqxqkpF0roWpkBRvCrLD4Wmsb0sP37BKbL-M-3LaFLsR_yb5P3jWPvi1JJM4Cn-RQ-fb71fwi_E-cMFO_kp-zqS4",
      },
    ],
  },
  {
    slug: "langtang",
    name: "Langtang Valley",
    tagline: "The Valley of Glaciers",
    heroLabel: "Wild & Accessible",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHSYvqHqr8HL9aGUKW68hU1yeZ_GOtdEyJcmRzjuVGbim9yaN7AKXCYFANtLHMnaKYK_kYW28urHdRcVFxpodG16vBKVYeFa0smW7cxVSzvyE5SlUZQMGaVq3gpma0959hS3R2v93lqkRGi9x0m0dsqAia6zRNczuBj2o4KecnD1raosLh9uwlJaxb_9mTVu1RQ39w7KpI8G0kGeHhNQeytAZPmwV1JPfej85gasqY_LHabG6z7Cta91cy7aFevzFDSWxF6xSf1fQk",
    description:
      "Easily accessible yet profoundly wild, Langtang offers intimate mountain views and rich Tamang heritage. Located just north of Kathmandu, this is the closest major trekking region to the capital.",
    stats: {
      elevation: "2,500m–5,000m",
      difficulty: "Easy to Moderate",
      bestSeason: "Mar–May & Oct–Nov",
    },
    specialtyImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCHSYvqHqr8HL9aGUKW68hU1yeZ_GOtdEyJcmRzjuVGbim9yaN7AKXCYFANtLHMnaKYK_kYW28urHdRcVFxpodG16vBKVYeFa0smW7cxVSzvyE5SlUZQMGaVq3gpma0959hS3R2v93lqkRGi9x0m0dsqAia6zRNczuBj2o4KecnD1raosLh9uwlJaxb_9mTVu1RQ39w7KpI8G0kGeHhNQeytAZPmwV1JPfej85gasqY_LHabG6z7Cta91cy7aFevzFDSWxF6xSf1fQk",
    specialties: [
      {
        number: "01",
        title: "Closest Himalayan Trek to Kathmandu",
        description:
          "Just a 7–8 hour drive from the capital, Langtang is the perfect introduction to Nepal's high mountain world.",
      },
      {
        number: "02",
        title: "Tamang Heritage Trail",
        description:
          "Immerse yourself in the unique culture of the Tamang people, with traditional villages, monasteries, and yak cheese farms.",
      },
      {
        number: "03",
        title: "Gosaikunda Sacred Lake",
        description:
          "Trek to the sacred alpine lake at 4,380m, a major Hindu pilgrimage site of extraordinary natural beauty.",
      },
    ],
    treks: [
      {
        id: "langtang-valley",
        slug: "langtang-valley-trek",
        title: "Langtang Valley Trek",
        description:
          "Follow the Langtang River through dense forests to the glaciers at the head of the valley.",
        duration: "7 Days",
        difficulty: "Moderate",
        priceFrom: 850,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCHSYvqHqr8HL9aGUKW68hU1yeZ_GOtdEyJcmRzjuVGbim9yaN7AKXCYFANtLHMnaKYK_kYW28urHdRcVFxpodG16vBKVYeFa0smW7cxVSzvyE5SlUZQMGaVq3gpma0959hS3R2v93lqkRGi9x0m0dsqAia6zRNczuBj2o4KecnD1raosLh9uwlJaxb_9mTVu1RQ39w7KpI8G0kGeHhNQeytAZPmwV1JPfej85gasqY_LHabG6z7Cta91cy7aFevzFDSWxF6xSf1fQk",
      },
      {
        id: "gosaikunda",
        slug: "gosaikunda-trek",
        title: "Gosaikunda Trek",
        description:
          "Reach the sacred high-altitude lake revered by both Hindus and Buddhists, surrounded by snow-capped peaks.",
        duration: "9 Days",
        difficulty: "Moderate",
        priceFrom: 950,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDmi-NgPjrRpwouageJLRi_TPnjGyzpA2VgDCc_uHE-EvpxKmGqlGNTupA-P_0r37piXbh1GNz7q-toGiPrtXdjAHhlWbjZqTDdwsdIPmMCF0Wjh-t0qi3ogQb4wfllUoLRe472hvaUe4Oa8OX8v7vMp-iodHwJq0rb1iN7te8GP6KlNepT7YTIqExDG-w_pPy6gP_TlYFZP4mCE7b_cc7SqSa7fv4wuG-DEfiXkrEYpQNFLr5kFLJpmWnJ90cY6VV92KBQgcdWV41c",
      },
    ],
  },
  {
    slug: "manaslu",
    name: "Manaslu Region",
    tagline: "Mountain of the Spirit",
    heroLabel: "Off the Beaten Path",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDV22A9-_QcBXJLB4zeyGcpq6jNIrvWjep-hb4mYMVGYnjj5W7F-mbHgGmAvgDg3m8rCGLnOgu_T1Ruq8HXqbRRlIo5eMSrQq7RGcU-y9UJFFMVXZ2xIVn1DNdlWs-XvqBYvTnA20Mxjlau3wF_JLNBXoTxY326NKAbfMq8rKE4WUv6s5rAg77Si1puFgvPgeVDWEUaNSdUOxVDuFw_rOzOxEe_UTB6yQUx77tPWoqqvU1Vo6IzVbPX3S-RcBWdFfQGTJDb1ppwnqUC",
    description:
      "The \"Mountain of the Spirit\" provides a remote trekking experience through restricted areas and ancient Tibetan-style villages. A permit-required destination that rewards those who seek solitude and authenticity.",
    stats: {
      elevation: "3,500m–5,160m",
      difficulty: "Strenuous",
      bestSeason: "Sep–Nov & Mar–May",
    },
    specialtyImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDV22A9-_QcBXJLB4zeyGcpq6jNIrvWjep-hb4mYMVGYnjj5W7F-mbHgGmAvgDg3m8rCGLnOgu_T1Ruq8HXqbRRlIo5eMSrQq7RGcU-y9UJFFMVXZ2xIVn1DNdlWs-XvqBYvTnA20Mxjlau3wF_JLNBXoTxY326NKAbfMq8rKE4WUv6s5rAg77Si1puFgvPgeVDWEUaNSdUOxVDuFw_rOzOxEe_UTB6yQUx77tPWoqqvU1Vo6IzVbPX3S-RcBWdFfQGTJDb1ppwnqUC",
    specialties: [
      {
        number: "01",
        title: "Remote Wilderness & Solitude",
        description:
          "Far fewer trekkers than Everest or Annapurna, offering pristine trails and an authentic wilderness experience.",
      },
      {
        number: "02",
        title: "Tibetan-Style Villages",
        description:
          "Ancient villages like Samagaon and Samdo preserve centuries-old traditions and architecture rarely seen elsewhere.",
      },
      {
        number: "03",
        title: "Larkya La High Pass",
        description:
          "Cross the dramatic Larkya La pass at 5,160m for breathtaking views of Manaslu, Annapurna II, and dozens of other giants.",
      },
    ],
    treks: [
      {
        id: "manaslu-circuit",
        slug: "manaslu-circuit",
        title: "Manaslu Circuit",
        description:
          "A challenging circuit around the world's 8th highest mountain through remote gorges and ancient villages.",
        duration: "16 Days",
        difficulty: "Strenuous",
        priceFrom: 1750,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDV22A9-_QcBXJLB4zeyGcpq6jNIrvWjep-hb4mYMVGYnjj5W7F-mbHgGmAvgDg3m8rCGLnOgu_T1Ruq8HXqbRRlIo5eMSrQq7RGcU-y9UJFFMVXZ2xIVn1DNdlWs-XvqBYvTnA20Mxjlau3wF_JLNBXoTxY326NKAbfMq8rKE4WUv6s5rAg77Si1puFgvPgeVDWEUaNSdUOxVDuFw_rOzOxEe_UTB6yQUx77tPWoqqvU1Vo6IzVbPX3S-RcBWdFfQGTJDb1ppwnqUC",
      },
    ],
  },
];

export function getRegionBySlug(slug: string): Region | undefined {
  return regions.find((r) => r.slug === slug);
}

export function getAllRegionSlugs(): string[] {
  return regions.map((r) => r.slug);
}
