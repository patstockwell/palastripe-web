import React from 'react';

interface AudioFunctions {
  setAudio: (beginning: HTMLAudioElement, end: HTMLAudioElement) => void;
  playStart: () => void;
  playComplete: () => void;
}

interface Props {
  soundOn: boolean;
}

const AudioContext = React.createContext<AudioFunctions>(null);

const AudioProvider: React.FC<Props> = ({ soundOn, children }) => {
  let start: HTMLAudioElement;
  let complete: HTMLAudioElement;

  const playStart = () => {
    console.log('starting audio', start);
    if (soundOn && start) {
      start.play();
    }
  };

  const playComplete = () => {
    if (soundOn && complete) {
      complete.play();
    }
  };

  const setAudio = (
    beginning: HTMLAudioElement,
    end: HTMLAudioElement,
  ) => {
    start = beginning;
    complete = end;
  };

  return (
    <AudioContext.Provider value={{ setAudio, playStart, playComplete }}>
      {children}
    </AudioContext.Provider>
  );
};

const useAudio = () => {
  const context = React.useContext(AudioContext);
  if (!context) {
    throw new Error('usePageRef must be used within a AudioProvider');
  }

  return context;
};

export { AudioProvider, useAudio };
