import React, { useRef } from 'react';
import audioBell from '../assets/complete.mp3';

const AudioContext = React.createContext<() => void>(null);

interface Props {
  soundOn: boolean;
}

const AudioProvider: React.FC<Props> = ({ soundOn, children }) => {
  const audio: React.MutableRefObject<HTMLAudioElement> = useRef();

  if (!audio.current) {
    audio.current = new Audio(audioBell);
  }

  const playAudio = () => {
    if (soundOn && audio.current) {
      audio.current.currentTime = 0;
      audio.current.play();
    }
  };

  return (
    <AudioContext.Provider value={playAudio}>
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
