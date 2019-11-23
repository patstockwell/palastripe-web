import React from 'react';
import completeAudio from '../assets/activityEnd.mp3';
import startAudio from '../assets/activityStart.mp3';

interface AudioFunctions {
  playStart: () => void;
  playComplete: () => void;
}

interface Props {
  soundOn: boolean;
}

const AudioContext = React.createContext<AudioFunctions>(null);

const AudioProvider: React.FC<Props> = ({ soundOn, children }) => {
  const start = new Audio(startAudio);
  const complete = new Audio(completeAudio);

  const playStart = () => {
    if (soundOn) {
      start.currentTime = 0;
      start.play();
    }
  };

  const playComplete = () => {
    if (soundOn) {
      complete.currentTime = 0;
      complete.play();
    }
  };

  return (
    <AudioContext.Provider value={{ playStart, playComplete }}>
      {children}
    </AudioContext.Provider>
  );
};

const useAudio = () => {
  const context = React.useContext(AudioContext);
  if (context === undefined) {
    throw new Error('usePageRef must be used within a AudioProvider');
  }

  return context;
};

export { AudioProvider, useAudio };
