import React from 'react';

const RestTimerContext = React.createContext<ConsumerValue>(null);

interface ProviderValue {
  setShowTimer: (_: boolean) => void;
  setRestTime: (_: number) => void;
  setCount: (_: number) => void;
}

interface ConsumerValue {
  showTimer: (restTime: number) => void;
  hideTimer: () => void;
}

const RestTimerProvider: React.FC<{ value: ProviderValue }> =
  ({ value: { setShowTimer, setCount, setRestTime }, children }) => {
    return (
      <RestTimerContext.Provider value={{
        hideTimer: () => {
          setShowTimer(false);
          setCount(0);
        },
        showTimer: (restTime) => {
          setRestTime(restTime);
          setShowTimer(true);
        },
      }}>
        {children}
      </RestTimerContext.Provider>
    );
  };

const useRestTimer = () => {
  const context = React.useContext(RestTimerContext);
  if (!context) {
    throw new Error('useRestTimer must be used within a RestTimerProvider');
  }

  return context;
};

export { RestTimerProvider, useRestTimer };
