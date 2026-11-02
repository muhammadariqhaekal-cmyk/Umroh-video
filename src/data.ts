import type {IconName} from './Icons';

export const FPS = 30;
export const AUDIO_SECONDS = 109.244; // durasi Suara_itenary.mp3
export const TAIL_SECONDS = 3.2; // jeda sesudah suara selesai, supaya penutup tidak terpotong
export const TOTAL_FRAMES = Math.ceil((AUDIO_SECONDS + TAIL_SECONDS) * FPS);
export const LEAD_SECONDS = 0.25; // visual muncul sedikit lebih dulu dari suara

export type Item = {time?: string; text: string};

export type SceneData = {
  id: string;
  /** detik ke-berapa di voice over bagian ini mulai bicara */
  start: number;
  kind: 'intro' | 'day' | 'outro';
  day?: number;
  weekday?: string;
  date?: string;
  place?: string;
  accent: string;
  icon: IconName;
  title: string;
  items: Item[];
};

const MAKKAH = '#e3bf86';
const MADINAH = '#b9cfa2';
const ALULA = '#e8a56a';
const NETRAL = '#d8c8b2';

/**
 * ===== TABEL SINKRONISASI =====
 * `start` diambil dari jeda napas di Suara_itenary.mp3.
 * Kalau ada hari yang kurang pas dengan suara, cukup ubah angka `start` di sini.
 */
export const SCENES: SceneData[] = [
  {
    id: 'intro', start: 0, kind: 'intro', accent: NETRAL, icon: 'moon',
    title: 'Umroh', place: 'Jadwal Perjalanan', date: '12 – 24 November 2026',
    items: [{text: 'Makkah · Madinah · Al-Ula'}],
  },
  {
    id: 'd1', start: 2.47, kind: 'day', day: 1, weekday: 'Kamis', date: '12', place: 'Jeddah → Makkah',
    accent: MAKKAH, icon: 'plane', title: 'Tiba & Umroh Pertama',
    items: [
      {time: '01.50', text: 'Tiba di Bandara Jeddah'},
      {time: '08.00', text: 'Melaksanakan Ibadah Umroh'},
    ],
  },
  {
    id: 'd2', start: 12.66, kind: 'day', day: 2, weekday: 'Jumat', date: '13', place: 'Makkah',
    accent: MAKKAH, icon: 'sun', title: 'Fun Day',
    items: [
      {text: 'Istirahat yang cukup'},
      {text: 'Beribadah ke Masjid'},
      {text: 'Bersantai atau berkeliling di sekitar Masjidil Haram'},
    ],
  },
  {
    id: 'd3', start: 18.47, kind: 'day', day: 3, weekday: 'Sabtu', date: '14', place: 'Makkah',
    accent: MAKKAH, icon: 'kaaba', title: 'Ziarah & Umroh Kedua',
    items: [
      {time: '08.00', text: 'Ziarah Makkah + Miqat Umroh'},
      {time: '14.00', text: 'Melaksanakan Ibadah Umroh'},
    ],
  },
  {
    id: 'd4', start: 26.10, kind: 'day', day: 4, weekday: 'Ahad', date: '15', place: 'Makkah',
    accent: MAKKAH, icon: 'mountain', title: 'Full Day Ziarah',
    items: [
      {text: 'Ziarah ke tempat-tempat bersejarah'},
      {text: 'Atau tempat lain yang ingin dikunjungi'},
    ],
  },
  {
    id: 'd5', start: 33.99, kind: 'day', day: 5, weekday: 'Senin', date: '16', place: 'Makkah',
    accent: MAKKAH, icon: 'kaaba', title: 'Full Day Ibadah',
    items: [
      {text: 'Beribadah ke Masjidil Haram'},
      {text: 'Berkeliling di sekitarnya'},
      {text: 'Atau melaksanakan Thawaf Sunnah'},
    ],
  },
  {
    id: 'd6', start: 41.15, kind: 'day', day: 6, weekday: 'Selasa', date: '17', place: 'Makkah → Madinah',
    accent: MAKKAH, icon: 'route', title: "Thawaf Wada' & Menuju Madinah",
    items: [
      {time: '08.00', text: "Thawaf Wada'"},
      {time: '13.00', text: 'Check out Hotel Makkah'},
      {time: '14.00', text: 'Menuju ke Madinah'},
      {time: 'Sore', text: 'Tiba di Madinah'},
    ],
  },
  {
    id: 'd7', start: 54.19, kind: 'day', day: 7, weekday: 'Rabu', date: '18', place: 'Madinah',
    accent: MADINAH, icon: 'mosque', title: 'Masjid Nabawi',
    items: [
      {time: 'Full Day', text: 'Ibadah, berziarah ke makam Rasul'},
      {time: 'Malam', text: 'Selesai Isya, bisa ngopi'},
    ],
  },
  {
    id: 'd8', start: 57.77, kind: 'day', day: 8, weekday: 'Kamis', date: '19', place: 'Madinah',
    accent: MADINAH, icon: 'mosque', title: 'Ziarah Kota Madinah',
    items: [
      {time: 'Pagi', text: 'Masjid Quba · Masjid Qiblatain · Jabal Uhud'},
      {time: 'Malam', text: 'Jelajah tempat bersejarah sekitar Masjid Nabawi, ditutup dengan ngopi'},
    ],
  },
  {
    id: 'd9', start: 70.18, kind: 'day', day: 9, weekday: 'Jumat', date: '20', place: 'Madinah',
    accent: MADINAH, icon: 'moon', title: 'Full Day di Masjid Nabawi',
    items: [{text: 'Beribadah ke Masjid Nabawi'}],
  },
  {
    id: 'd10', start: 78.12, kind: 'day', day: 10, weekday: 'Sabtu', date: '21', place: 'Madinah → Al-Ula',
    accent: ALULA, icon: 'mountain', title: 'Perjalanan ke Al-Ula',
    items: [{time: 'Pagi – Malam', text: 'Pergi ke Al-Ula'}],
  },
  {
    id: 'd11', start: 85.21, kind: 'day', day: 11, weekday: 'Ahad', date: '22', place: 'Madinah',
    accent: MADINAH, icon: 'moon', title: 'Ibadah & Istirahat',
    items: [{text: 'Full day beribadah dan istirahat'}],
  },
  {
    id: 'd12', start: 92.48, kind: 'day', day: 12, weekday: 'Senin', date: '23', place: 'Madinah',
    accent: MADINAH, icon: 'bag', title: 'Hunting Oleh-oleh',
    items: [{text: 'Bebas belanja oleh-oleh'}],
  },
  {
    id: 'd13', start: 102.72, kind: 'day', day: 13, weekday: 'Selasa', date: '24', place: 'Madinah → Jeddah',
    accent: NETRAL, icon: 'plane', title: 'Kepulangan',
    items: [
      {time: 'Dini hari', text: 'Check out Madinah, menuju Bandara Jeddah'},
      {time: '10.05', text: 'Penerbangan pulang dari Jeddah'},
    ],
  },
  {
    id: 'outro', start: 107.47, kind: 'outro', accent: NETRAL, icon: 'moon',
    title: 'Opsi Tambahan', place: 'Ziarah',
    items: [],
  },
];

export const TOTAL_DAYS = 13;

export type Laid = {scene: SceneData; from: number; dur: number};

export const layoutScenes = (): Laid[] => {
  const froms = SCENES.map((s, i) =>
    i === 0 ? 0 : Math.max(0, Math.round((s.start - LEAD_SECONDS) * FPS)),
  );
  return SCENES.map((scene, i) => {
    const end = i === SCENES.length - 1 ? TOTAL_FRAMES : froms[i + 1];
    return {scene, from: froms[i], dur: end - froms[i]};
  });
};
