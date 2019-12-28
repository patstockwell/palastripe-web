import React from 'react';

interface AudioFunctions {
  playStart: () => void;
  playComplete: () => void;
}

interface Props {
  soundOn: boolean;
}

const AudioContext = React.createContext<AudioFunctions>(null);

const AudioProvider: React.FC<Props> = ({ soundOn, children }) => {
  function playSound(lowVersion: boolean) {
    console.log('playing sound');
    // handle vendor specific implementations
    // if ('webkitAudioContext' in window) { // apple
      // console.log('playing apple version');
      // // @ts-ignore
      // const myAudioContext = new webkitAudioContext();
      // const source = myAudioContext.createOscillator();
      // source.type = 0; // sine wave
      // source.connect(myAudioContext.destination);
      // source.start(0);
      // source.stop(myAudioContext.currentTime + 0.5);
    // } else { // sane version
    console.log('playing sane version');
    const AudioContextConstructor = window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx: AudioContext = new AudioContextConstructor();

    const amp = audioCtx.createGain();
    amp.gain.setValueAtTime(2, audioCtx.currentTime);

    const low = audioCtx.createOscillator();
    low.type = 'sine';
    low.frequency.value = lowVersion ? 880 : 1318.51;

    const high = audioCtx.createOscillator();
    high.type = 'sine';
    high.frequency.value = lowVersion ? 1318.51 : 1760;

    high.connect(amp);
    high.connect(audioCtx.destination);
    low.connect(amp);
    low.connect(audioCtx.destination);
    low.start(audioCtx.currentTime);
    low.stop(audioCtx.currentTime + 0.25);
    high.start(audioCtx.currentTime + 0.25);
    high.stop(audioCtx.currentTime + 0.5);
    // }
  }

  const playStart = () => {
    if (soundOn) {
      playSound(true);
    }
  };

  const playComplete = () => {
    if (soundOn) {
      playSound(false);
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
