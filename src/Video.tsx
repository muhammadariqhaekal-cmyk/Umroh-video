import React, {useEffect, useMemo, useState} from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  continueRender,
  delayRender,
  interpolateColors,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadMontserrat} from '@remotion/google-fonts/Montserrat';
import {Backdrop} from './Backdrop';
import {DayScene, IntroScene, OutroScene} from './Scenes';
import {layoutScenes} from './data';

// Cadangan kalau file Galline belum ditaruh di public/fonts
loadPlayfair();
loadMontserrat('normal', {weights: ['400', '500', '600']});

/** Memuat font Galline dari public/fonts/Galline.otf (atau .ttf). Kalau tidak ada, pakai Playfair Display. */
const useGalline = () => {
  const [handle] = useState(() => delayRender('Memuat font Galline'));
  useEffect(() => {
    const load = async (file: string) => {
      const face = new FontFace('Galline', `url(${staticFile(file)})`);
      await face.load();
      document.fonts.add(face);
    };
    load('fonts/Galline.otf')
      .catch(() => load('fonts/Galline.ttf'))
      .catch(() => console.warn('Galline.otf/.ttf tidak ditemukan di public/fonts, memakai Playfair Display sebagai cadangan.'))
      .finally(() => continueRender(handle));
  }, [handle]);
};

export const UmrohVideo: React.FC = () => {
  useGalline();
  const frame = useCurrentFrame();
  const laid = useMemo(() => layoutScenes(), []);

  // Warna cahaya berubah halus mengikuti kota (Makkah emas, Madinah hijau lembut, Al-Ula jingga)
  const {input, output} = useMemo(() => {
    const input: number[] = [];
    const output: string[] = [];
    laid.forEach(({scene, from, dur}) => {
      input.push(from);
      output.push(scene.accent);
      input.push(Math.max(from + 1, from + dur - 20));
      output.push(scene.accent);
    });
    return {input, output};
  }, [laid]);
  const accent = interpolateColors(frame, input, output);

  return (
    <AbsoluteFill style={{backgroundColor: '#150e0b'}}>
      <Backdrop accent={accent} />
      {laid.map(({scene, from, dur}) => (
        <Sequence key={scene.id} from={from} durationInFrames={dur}>
          {scene.kind === 'intro' ? (
            <IntroScene scene={scene} />
          ) : scene.kind === 'outro' ? (
            <OutroScene />
          ) : (
            <DayScene scene={scene} />
          )}
        </Sequence>
      ))}
      <Audio src={staticFile('audio/Suara_itenary.mp3')} />
    </AbsoluteFill>
  );
};
