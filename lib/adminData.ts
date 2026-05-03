export type TrekStatus = "Active" | "Completed" | "Upcoming" | "Cancelled";

export interface ActiveTrek {
  id: string;
  name: string;
  region: string;
  guide: string;
  guideAvatar: string;
  groupSize: number;
  currentDay: number;
  totalDays: number;
  currentLocation: string;
  altitude: string;
  startDate: string;
  endDate: string;
  status: TrekStatus;
  nextCheckpoint: string;
}

export const activeTreks: ActiveTrek[] = [
  {
    id: "1",
    name: "Everest Base Camp — Group A",
    region: "Everest",
    guide: "Lhakpa Sherpa",
    guideAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAzndNoXl4mK3K2JEmB-aNPoVQHr-dC_qGJpfUzD13nyanT36o4JPguxWAQwvEhvB0-VOwumjs3bJj1y7FcHKGBv_h7Ssi1HLi53tpNEKIGci-2_QuB1MAVp9w5iVFPyE1a99bfNmrRaJA1T67fhKK-tVf_v7I1XRZgnLN-BDc7jvWHWf01RUVLq2S1BQT_AgrEDGD9-rBChGAvQDDJadgkVUE932w5mTcMIP2pGB3K-duREn8qOZJA_i8W6Vs0HyExpL2yShFoavz",
    groupSize: 8,
    currentDay: 12,
    totalDays: 18,
    currentLocation: "Lobuche",
    altitude: "4,940m",
    startDate: "Oct 12, 2024",
    endDate: "Oct 30, 2024",
    status: "Active",
    nextCheckpoint: "Everest Base Camp (5,364m)",
  },
  {
    id: "2",
    name: "Annapurna Circuit — Solo",
    region: "Annapurna",
    guide: "Dawa Tshering",
    guideAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAzndNoXl4mK3K2JEmB-aNPoVQHr-dC_qGJpfUzD13nyanT36o4JPguxWAQwvEhvB0-VOwumjs3bJj1y7FcHKGBv_h7Ssi1HLi53tpNEKIGci-2_QuB1MAVp9w5iVFPyE1a99bfNmrRaJA1T67fhKK-tVf_v7I1XRZgnLN-BDc7jvWHWf01RUVLq2S1BQT_AgrEDGD9-rBChGAvQDDJadgkVUE932w5mTcMIP2pGB3K-duREn8qOZJA_i8W6Vs0HyExpL2yShFoavz",
    groupSize: 1,
    currentDay: 4,
    totalDays: 14,
    currentLocation: "Ghorepani",
    altitude: "2,874m",
    startDate: "Oct 20, 2024",
    endDate: "Nov 3, 2024",
    status: "Active",
    nextCheckpoint: "Poon Hill (3,210m)",
  },
  {
    id: "3",
    name: "Manaslu Circuit — Group B",
    region: "Manaslu",
    guide: "Mingma Nuru",
    guideAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAzndNoXl4mK3K2JEmB-aNPoVQHr-dC_qGJpfUzD13nyanT36o4JPguxWAQwvEhvB0-VOwumjs3bJj1y7FcHKGBv_h7Ssi1HLi53tpNEKIGci-2_QuB1MAVp9w5iVFPyE1a99bfNmrRaJA1T67fhKK-tVf_v7I1XRZgnLN-BDc7jvWHWf01RUVLq2S1BQT_AgrEDGD9-rBChGAvQDDJadgkVUE932w5mTcMIP2pGB3K-duREn8qOZJA_i8W6Vs0HyExpL2yShFoavz",
    groupSize: 5,
    currentDay: 7,
    totalDays: 16,
    currentLocation: "Namrung",
    altitude: "2,630m",
    startDate: "Oct 17, 2024",
    endDate: "Nov 2, 2024",
    status: "Active",
    nextCheckpoint: "Samagaon (3,520m)",
  },
  {
    id: "4",
    name: "Gokyo Lakes — Group C",
    region: "Everest",
    guide: "Pemba Dorje",
    guideAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAzndNoXl4mK3K2JEmB-aNPoVQHr-dC_qGJpfUzD13nyanT36o4JPguxWAQwvEhvB0-VOwumjs3bJj1y7FcHKGBv_h7Ssi1HLi53tpNEKIGci-2_QuB1MAVp9w5iVFPyE1a99bfNmrRaJA1T67fhKK-tVf_v7I1XRZgnLN-BDc7jvWHWf01RUVLq2S1BQT_AgrEDGD9-rBChGAvQDDJadgkVUE932w5mTcMIP2pGB3K-duREn8qOZJA_i8W6Vs0HyExpL2yShFoavz",
    groupSize: 4,
    currentDay: 2,
    totalDays: 12,
    currentLocation: "Phakding",
    altitude: "2,610m",
    startDate: "Oct 22, 2024",
    endDate: "Nov 3, 2024",
    status: "Active",
    nextCheckpoint: "Namche Bazaar (3,440m)",
  },
  {
    id: "5",
    name: "Langtang Valley — Group A",
    region: "Langtang",
    guide: "Tenzin Wangdu",
    guideAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAzndNoXl4mK3K2JEmB-aNPoVQHr-dC_qGJpfUzD13nyanT36o4JPguxWAQwvEhvB0-VOwumjs3bJj1y7FcHKGBv_h7Ssi1HLi53tpNEKIGci-2_QuB1MAVp9w5iVFPyE1a99bfNmrRaJA1T67fhKK-tVf_v7I1XRZgnLN-BDc7jvWHWf01RUVLq2S1BQT_AgrEDGD9-rBChGAvQDDJadgkVUE932w5mTcMIP2pGB3K-duREn8qOZJA_i8W6Vs0HyExpL2yShFoavz",
    groupSize: 3,
    currentDay: 5,
    totalDays: 7,
    currentLocation: "Kyanjin Gompa",
    altitude: "3,870m",
    startDate: "Oct 18, 2024",
    endDate: "Oct 25, 2024",
    status: "Active",
    nextCheckpoint: "Tserko Ri (4,984m)",
  },
  {
    id: "6",
    name: "Upper Mustang — VIP",
    region: "Annapurna",
    guide: "Karma Wangchuk",
    guideAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAzndNoXl4mK3K2JEmB-aNPoVQHr-dC_qGJpfUzD13nyanT36o4JPguxWAQwvEhvB0-VOwumjs3bJj1y7FcHKGBv_h7Ssi1HLi53tpNEKIGci-2_QuB1MAVp9w5iVFPyE1a99bfNmrRaJA1T67fhKK-tVf_v7I1XRZgnLN-BDc7jvWHWf01RUVLq2S1BQT_AgrEDGD9-rBChGAvQDDJadgkVUE932w5mTcMIP2pGB3K-duREn8qOZJA_i8W6Vs0HyExpL2yShFoavz",
    groupSize: 2,
    currentDay: 9,
    totalDays: 12,
    currentLocation: "Lo Manthang",
    altitude: "3,840m",
    startDate: "Oct 15, 2024",
    endDate: "Oct 27, 2024",
    status: "Active",
    nextCheckpoint: "Charang (3,560m)",
  },
];

export const statusConfig: Record<TrekStatus, { bg: string; text: string }> = {
  Active:    { bg: "bg-secondary-container", text: "text-on-secondary-fixed-variant" },
  Completed: { bg: "bg-surface-container-highest", text: "text-on-surface-variant" },
  Upcoming:  { bg: "bg-primary-fixed", text: "text-on-primary-fixed-variant" },
  Cancelled: { bg: "bg-error-container", text: "text-error" },
};
