import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Icon} from './Icons';
import {SceneData, TOTAL_DAYS} from './data';

export const DISPLAY = '"Galline", "Playfair Display", Georgia, serif';
export const BODY = '"Montserrat", "Helvetica Neue", Arial, sans-serif';
export const CREAM = '#f6ecdc';
export const GOLD = '#e8cf9f';

/** Muncul pelan: naik + fade + blur hilang. */
const Reveal: React.FC<{
  delay: number;
  y?: number;
  blur?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({delay, y = 40, blur = 10, style, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: frame - delay, fps, config: {damping: 200}, durationInFrames: 30});
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * y}px)`,
        filter: `blur(${(1 - p) * blur}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Judul tampil kata demi kata. */
const Title: React.FC<{text: string; size: number; delay: number}> = ({text, size, delay}) => {
  const words = text.split(' ');
  return (
    <div
      style={{
        fontFamily: DISPLAY,
        fontSize: size,
        lineHeight: 1.08,
        color: CREAM,
        textAlign: 'center',
        maxWidth: 900,
        textShadow: '0 6px 40px rgba(0,0,0,0.55)',
      }}
    >
      {words.map((w, i) => (
        <Reveal key={i} delay={delay + i * 4} y={34} blur={14} style={{display: 'inline-block', marginRight: '0.28em'}}>
          {w}
        </Reveal>
      ))}
    </div>
  );
};

const Line: React.FC<{delay: number; width?: number}> = ({delay, width = 260}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [delay, delay + 24], [0, width], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <div style={{height: 2, width: w, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`}} />;
};

const Label: React.FC<{children: React.ReactNode; size?: number; color?: string; spacing?: number}> = ({
  children,
  size = 30,
  color = GOLD,
  spacing = 10,
}) => (
  <div
    style={{
      fontFamily: BODY,
      fontWeight: 500,
      fontSize: size,
      letterSpacing: spacing,
      color,
      textTransform: 'uppercase',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

const useExit = (fade = 9) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  return interpolate(frame, [durationInFrames - fade, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

const useIconProgress = (delay = 4, len = 40) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [delay, delay + len], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
};

const ItemRow: React.FC<{time?: string; text: string; delay: number}> = ({time, text, delay}) => (
  <Reveal delay={delay} y={28} blur={8} style={{width: 900}}>
    <div style={{display: 'flex', gap: 28, alignItems: 'flex-start'}}>
      <div
        style={{
          width: 200,
          flexShrink: 0,
          textAlign: 'right',
          fontFamily: BODY,
          fontWeight: 600,
          fontSize: 30,
          letterSpacing: 3,
          color: GOLD,
          textTransform: 'uppercase',
          paddingTop: 8,
        }}
      >
        {time ?? '◆'}
      </div>
      <div style={{width: 2, alignSelf: 'stretch', background: 'rgba(232,207,159,0.45)'}} />
      <div style={{fontFamily: BODY, fontWeight: 400, fontSize: 40, lineHeight: 1.3, color: CREAM, flex: 1}}>
        {text}
      </div>
    </div>
  </Reveal>
);

const Progress: React.FC<{day: number}> = ({day}) => {
  const frame = useCurrentFrame();
  const glow = 0.6 + Math.sin(frame / 8) * 0.4;
  return (
    <div style={{position: 'absolute', bottom: 150, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 9}}>
      {Array.from({length: TOTAL_DAYS}, (_, i) => {
        const done = i + 1 <= day;
        const current = i + 1 === day;
        return (
          <div
            key={i}
            style={{
              width: 52,
              height: 5,
              borderRadius: 3,
              background: done ? GOLD : 'rgba(246,236,220,0.2)',
              boxShadow: current ? `0 0 ${14 * glow}px ${GOLD}` : 'none',
              opacity: done ? 1 : 0.8,
            }}
          />
        );
      })}
    </div>
  );
};

export const DayScene: React.FC<{scene: SceneData}> = ({scene}) => {
  const exit = useExit();
  const iconP = useIconProgress();
  const day = scene.day ?? 1;
  const titleSize = scene.title.length > 26 ? 72 : 88;

  return (
    <AbsoluteFill style={{opacity: exit, transform: `scale(${1 + (1 - exit) * 0.03})`}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '190px 90px 240px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 26,
        }}
      >
        <Reveal delay={2}>
          <Label>
            Hari {String(day).padStart(2, '0')} / {TOTAL_DAYS}
          </Label>
        </Reveal>
        <Line delay={6} />

        <Icon name={scene.icon} size={210} progress={iconP} />

        <Reveal delay={8} y={50} blur={18}>
          <div style={{display: 'flex', alignItems: 'center', gap: 28}}>
            <span style={{fontFamily: DISPLAY, fontSize: 230, lineHeight: 0.9, color: CREAM, textShadow: '0 8px 50px rgba(0,0,0,0.6)'}}>
              {scene.date}
            </span>
            <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
              <Label size={34} color={CREAM} spacing={8}>
                {scene.weekday}
              </Label>
              <Label size={26} spacing={7}>
                November 2026
              </Label>
            </div>
          </div>
        </Reveal>

        <Reveal delay={14}>
          <Label size={28} color={scene.accent} spacing={9}>
            {scene.place}
          </Label>
        </Reveal>

        <Title text={scene.title} size={titleSize} delay={16} />

        <div style={{display: 'flex', flexDirection: 'column', gap: 22, marginTop: 14, alignItems: 'center'}}>
          {scene.items.map((it, i) => (
            <ItemRow key={i} time={it.time} text={it.text} delay={32 + i * 14} />
          ))}
        </div>
      </div>
      <Progress day={day} />
    </AbsoluteFill>
  );
};

export const IntroScene: React.FC<{scene: SceneData}> = ({scene}) => {
  const exit = useExit(7);
  const iconP = useIconProgress(0, 36);
  const frame = useCurrentFrame();
  const spacing = interpolate(frame, [0, 50], [28, 4], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: exit, alignItems: 'center', justifyContent: 'center', gap: 34}}>
      <Icon name="moon" size={240} progress={iconP} />
      <Reveal delay={4}>
        <Label size={30} spacing={14}>
          {scene.place}
        </Label>
      </Reveal>
      <Reveal delay={8} y={60} blur={22}>
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: 270,
            lineHeight: 1,
            color: CREAM,
            letterSpacing: spacing,
            textShadow: '0 10px 60px rgba(0,0,0,0.65)',
          }}
        >
          {scene.title}
        </div>
      </Reveal>
      <Line delay={20} width={340} />
      <Reveal delay={24}>
        <Label size={32} color={CREAM} spacing={9}>
          {scene.date}
        </Label>
      </Reveal>
      <Reveal delay={32}>
        <Label size={26} spacing={8}>
          {scene.items[0].text}
        </Label>
      </Reveal>
    </AbsoluteFill>
  );
};

const Block: React.FC<{head: string; lines: string[]; delay: number}> = ({head, lines, delay}) => (
  <Reveal delay={delay} y={30} style={{width: 860, textAlign: 'center'}}>
    <Label size={26} spacing={8}>
      {head}
    </Label>
    <div style={{marginTop: 12, fontFamily: BODY, fontSize: 40, lineHeight: 1.35, color: CREAM}}>
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  </Reveal>
);

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const iconP = useIconProgress(0, 36);
  const fadeOut = interpolate(frame, [durationInFrames - 24, durationInFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{opacity: fadeOut, alignItems: 'center', justifyContent: 'center', gap: 34, padding: '0 90px'}}>
      <Icon name="kaaba" size={170} progress={iconP} />
      <Reveal delay={2}>
        <Label size={30} spacing={12}>
          Opsi Tambahan
        </Label>
      </Reveal>
      <Line delay={6} width={300} />
      <Block head="Ziarah Makkah" lines={['Museum Al Wahyu Jabal Nur', 'Kota Thaif']} delay={12} />
      <Block head="Ziarah Madinah" lines={['Puncak Jabal Uhud']} delay={26} />
      <Block head="Penerbangan" lines={['Tiba Jeddah · 12 Nov · 01.50', 'Pulang Jeddah · 24 Nov · 10.05']} delay={40} />
      <Reveal delay={64} y={40} blur={16}>
        <div style={{fontFamily: DISPLAY, fontSize: 74, color: CREAM, textAlign: 'center', marginTop: 14, textShadow: '0 6px 40px rgba(0,0,0,0.6)'}}>
          Semoga menjadi umroh yang mabrur
        </div>
      </Reveal>
    </AbsoluteFill>
  );
};
