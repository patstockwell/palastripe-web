import React, { createContext, useState } from 'react';

const AnimateNavigationContext = createContext<ConsumerValue>(null);

interface ConsumerValue {
  animationDistance: number;
  setAnimationDistance: (x: number) => void;
}

export const AnimateNavigationProvider: React.FC = ({ children }) => {
  const [animationDistance, setAnimationDistance] = useState(0);

  return (
    <AnimateNavigationContext.Provider
      value={{
        animationDistance,
        setAnimationDistance,
      }}
    >
      {children}
    </AnimateNavigationContext.Provider>
  );
};

export const useAnimateNavigation = () => {
  const context = React.useContext(AnimateNavigationContext);
  if (context === undefined) {
    throw new Error('useAnimateNavigation must be used within a AnimateNavigationProvider');
  }

  return context;
};