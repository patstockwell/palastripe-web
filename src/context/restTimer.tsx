import React from 'react';

const RestTimerContext = React.createContext<ProviderValue>(null);

interface ProviderValue {
  setShowTimer: (_: boolean) => void;
  setRestTime: (_: number) => void;
  setCount: (_: number) => void;
}

const RestTimerProvider: React.FC<{ value: ProviderValue }> =
  ({ value, children }) => (
    <RestTimerContext.Provider value={value}>
      {children}
    </RestTimerContext.Provider>
  );

const useRestTimer = () => {
  const context = React.useContext(RestTimerContext);
  if (context === undefined) {
    throw new Error('useRestTimer must be used within a RestTimerProvider');
  }

  return context;
};

export { RestTimerProvider, useRestTimer };
