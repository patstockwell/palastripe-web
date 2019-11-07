import React, { useRef } from 'react';
import audioBell from '../assets/complete.mp3';

const AudioContext = React.createContext<() => void>(null);

interface Props {
  soundOn: boolean;
  audioContext: AudioContext;
}

const AudioProvider: React.FC<Props> = ({ audioContext, soundOn, children }) => {
  // use a ref so we only create the buffer once
  const audioBuffer: React.MutableRefObject<AudioBuffer> = useRef();
  const source: React.MutableRefObject<AudioBufferSourceNode> = useRef();

  // TODO: Replace with fetch? Can I use a promise here to improve the logic?

  if (!audioBuffer.current) {
    // using an XMLHttpRequest allows us to send the audio to a buffer
    const req = new XMLHttpRequest();
    req.open('GET', audioBell, true);
    req.responseType = 'arraybuffer';

    req.onload = () => {
      audioContext.decodeAudioData(req.response, (newBuffer: AudioBuffer) => {
        audioBuffer.current = newBuffer;
      });
    };

    req.send();
  }

  const getSource = (): React.MutableRefObject<AudioBufferSourceNode> => {
    if (source.current) {
      return source;
    }

    // Check first for a buffer just in case the XMLHttpRequest didn't complete
    if (audioBuffer.current) {
      source.current = audioContext.createBufferSource();
      source.current.buffer = audioBuffer.current;
      const volume = audioContext.createGain();
      volume.gain.value = 1;
      volume.connect(audioContext.destination);
      source.current.connect(volume);
    }

    return source;
  };

  const playAudio = () => {
    if (soundOn) {
      const audioBufferSource = getSource();
      if (audioBufferSource.current) {
        audioBufferSource.current.start(0);
      }
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
