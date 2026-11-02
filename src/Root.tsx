import React from 'react';
import {Composition} from 'remotion';
import {UmrohVideo} from './Video';
import {FPS, TOTAL_FRAMES} from './data';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="UmrohItinerary"
      component={UmrohVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
