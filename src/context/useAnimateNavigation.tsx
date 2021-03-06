import React, {createContext, useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const AnimateNavigationContext = createContext<ConsumerValue>(null);

interface ConsumerValue {
  animationDistance: number;
  setAnimationDistance: (x: number) => void;
}

export const AnimateNavigationProvider: React.FC = ({children}) => {
  const [animationDistance, setAnimationDistance] = useState(0);
  const {pathname} = useLocation();
  useEffect(() => {
    const animatablePaths = ['/workouts/', '/activity/', '/profile/'];
    if (!animatablePaths.includes(pathname)) {
      setAnimationDistance(0);
    }
  }, [pathname]);

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
  if (!context) {
    throw new Error('useAnimateNavigation must be used within a AnimateNavigationProvider');
  }

  return context;
};
