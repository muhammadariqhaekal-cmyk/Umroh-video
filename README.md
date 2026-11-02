# Video Itinerary Umroh (Remotion, 9:16, 1080x1920, 30fps)

## Cara render
1. Install Node.js 18+ lalu jalankan: `npm install`
2. (Opsional tapi disarankan) taruh font di `public/fonts/Galline.otf`
3. Preview: `npm run dev`
4. Render MP4: `npm run render`  → hasil di `out/umroh-itinerary.mp4`

## Sinkronisasi dengan suara
Semua waktu ada di `src/data.ts` pada kolom `start` (detik). Kalau ada hari yang
kurang pas dengan voice over, ubah angkanya, lalu preview ulang.

## Ganti isi teks
Edit `title`, `items`, dll. per hari di `src/data.ts`.
