import React from 'react';

export type IconName = 'moon' | 'sun' | 'plane' | 'kaaba' | 'mosque' | 'mountain' | 'route' | 'bag';

const PATHS: Record<IconName, string[]> = {
  moon: [
    'M125 35 A65 65 0 1 0 165 125 A52 52 0 0 1 125 35 Z',
    'M60 60 L64 72 L76 72 L66 79 L70 91 L60 84 L50 91 L54 79 L44 72 L56 72 Z',
  ],
  sun: [
    'M100 70 A30 30 0 1 1 99.9 70 Z',
    'M100 20 V40', 'M100 160 V180', 'M20 100 H40', 'M160 100 H180',
    'M43 43 L57 57', 'M143 143 L157 157', 'M157 43 L143 57', 'M57 143 L43 157',
  ],
  plane: [
    'M100 20 L112 80 L180 120 L180 135 L112 115 L108 160 L130 175 L130 185 L100 178 L70 185 L70 175 L92 160 L88 115 L20 135 L20 120 L88 80 Z',
  ],
  kaaba: [
    'M35 72 L100 45 L165 72 L100 100 Z',
    'M35 72 L100 100 V175 L35 147 Z',
    'M100 100 L165 72 V147 L100 175 Z',
    'M35 96 L100 124 L165 96',
    'M118 140 V162 L140 153 V131 Z',
  ],
  mosque: [
    'M60 125 C60 80 140 80 140 125',
    'M100 82 V62',
    'M106 52 A8 8 0 1 0 106 68 A6 6 0 1 1 106 52 Z',
    'M45 125 H155 V175 H45 Z',
    'M90 175 V150 A10 10 0 0 1 110 150 V175',
    'M22 175 V90 L30 70 L38 90 V175',
    'M162 175 V90 L170 70 L178 90 V175',
    'M10 175 H190',
  ],
  mountain: [
    'M10 170 L70 70 L98 118 L128 55 L190 170 Z',
    'M165 45 A14 14 0 1 1 164.9 45 Z',
    'M70 70 L82 95 L92 85',
  ],
  route: [
    'M45 150 C45 90 155 150 155 70',
    'M35 150 A10 10 0 1 0 55 150 A10 10 0 1 0 35 150 Z',
    'M145 60 A10 10 0 1 0 165 60 A10 10 0 1 0 145 60 Z',
  ],
  bag: [
    'M50 80 H150 L160 175 H40 Z',
    'M75 80 V65 A25 25 0 0 1 125 65 V80',
  ],
};

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** Ikon garis emas yang "digambar" perlahan. progress: 0 → 1 */
export const Icon: React.FC<{name: IconName; size?: number; progress: number; color?: string}> = ({
  name,
  size = 220,
  progress,
  color = '#e8cf9f',
}) => {
  const paths = PATHS[name];
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{filter: `drop-shadow(0 0 14px ${color}66)`}}
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - clamp(progress * 1.5 - i * 0.07)}
        />
      ))}
    </svg>
  );
};
