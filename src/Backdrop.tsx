import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';

const PARTICLES = Array.from({length: 48}, (_, i) => ({
  x: random(`x${i}`) * 100,
  y: random(`y${i}`) * 100,
  size: 2 + random(`s${i}`) * 6,
  speed: 0.12 + random(`v${i}`) * 0.5,
  phase: random(`p${i}`) * Math.PI * 2,
  alpha: 0.15 + random(`a${i}`) * 0.5,
}));

/** Latar sinematik: cahaya jendela, tirai tipis, debu melayang, grain film, vignette. */
export const Backdrop: React.FC<{accent: string}> = ({accent}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const zoom = interpolate(frame, [0, durationInFrames], [1.0, 1.14]);
  const drift = Math.sin(frame / 150) * 40;
  const pulse = 0.55 + Math.sin(frame / 90) * 0.12;

  return (
    <AbsoluteFill style={{backgroundColor: '#150e0b', overflow: 'hidden'}}>
      {/* dasar hangat */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, #1c130e 0%, #3b2b21 42%, #2a1d15 72%, #120b08 100%)',
          transform: `scale(${zoom})`,
        }}
      />

      {/* cahaya jendela berwarna sesuai kota */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 42% at ${70 + drift / 6}% 24%, ${accent} 0%, transparent 70%)`,
          opacity: 0.38 * pulse + 0.1,
          transform: `scale(${zoom})`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 60% 30% at 20% 78%, ${accent} 0%, transparent 70%)`,
          opacity: 0.16,
        }}
      />

      {/* tirai tipis */}
      <AbsoluteFill
        style={{
          transform: `translateX(${drift}px) scale(1.08)`,
          background:
            'repeating-linear-gradient(90deg, rgba(255,236,210,0.07) 0px, rgba(255,236,210,0.07) 38px, rgba(0,0,0,0.07) 38px, rgba(0,0,0,0.07) 96px, rgba(255,236,210,0.03) 96px, rgba(255,236,210,0.03) 130px)',
          filter: 'blur(7px)',
          WebkitMaskImage: 'linear-gradient(180deg, #000 0%, #000 55%, transparent 100%)',
          maskImage: 'linear-gradient(180deg, #000 0%, #000 55%, transparent 100%)',
        }}
      />

      {/* berkas cahaya */}
      <div
        style={{
          position: 'absolute',
          top: -300,
          left: 380 + drift * 2,
          width: 260,
          height: 2300,
          transform: 'rotate(18deg)',
          background: `linear-gradient(180deg, ${accent} 0%, transparent 80%)`,
          opacity: 0.1 + pulse * 0.08,
          filter: 'blur(40px)',
        }}
      />

      {/* debu melayang */}
      {PARTICLES.map((p, i) => {
        const y = (((p.y - frame * p.speed * 0.08) % 100) + 100) % 100;
        const x = p.x + Math.sin(frame / 60 + p.phase) * 2.5;
        const tw = 0.6 + Math.sin(frame / 25 + p.phase) * 0.4;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: '#fff2d9',
              opacity: p.alpha * tw,
              filter: `blur(${p.size > 5 ? 2 : 0.6}px)`,
            }}
          />
        );
      })}

      {/* grain film */}
      <svg
        width="100%"
        height="100%"
        style={{position: 'absolute', inset: 0, opacity: 0.13, mixBlendMode: 'overlay'}}
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={frame % 9} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* vignette + gelap atas/bawah supaya teks terbaca */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.72) 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 18%, transparent 78%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* bingkai tipis ala sinema */}
      <div
        style={{
          position: 'absolute',
          inset: 36,
          border: '1px solid rgba(232,207,159,0.22)',
        }}
      />
    </AbsoluteFill>
  );
};
