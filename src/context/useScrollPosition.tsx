import React, {
  createContext,
  useState,
  useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';
import {
  WORKOUTS_PAGE,
  ACTIVITY_PAGE,
  PROFILE_PAGE,
} from '../helpers/constants';
import { getCurrentPage } from '../helpers/functions';

const ScrollPositionContext = createContext<ConsumerValue>(null);

interface ConsumerValue {
  setWorkoutPageScrollPosition: (y?: number) => void;
  setActivityPageScrollPosition: (y?: number) => void;
  setProfilePageScrollPosition: (y?: number) => void;
  setScrollPosition: (path: string) => void;
}

export const ScrollPositionProvider: React.FC = ({ children }) => {
  const [workoutScrollY, setWorkoutScrollY] = useState(0);
  const [activityScrollY, setActivityScrollY] = useState(0);
  const [profileScrollY, setProfileScrollY] = useState(0);
  const { pathname } = useLocation();

  const scrollHash = {
    [WORKOUTS_PAGE]: workoutScrollY,
    [ACTIVITY_PAGE]: activityScrollY,
    [PROFILE_PAGE]: profileScrollY,
  };

  useEffect(() => {
    const scrollY = scrollHash[getCurrentPage(pathname)] || 0;
    window.scrollTo(0, scrollY);
  }, [pathname]);

  const scrollProviderValue = {
    setActivityPageScrollPosition: (y?: number) =>
      setActivityScrollY(y === undefined ? window.scrollY : y),
    setWorkoutPageScrollPosition: (y?: number) =>
      setWorkoutScrollY(y === undefined ? window.scrollY : y),
    setProfilePageScrollPosition: (y?: number) =>
      setProfileScrollY(y === undefined ? window.scrollY : y),
    setScrollPosition: (path: string) => {
      const setScroll = ({
        [WORKOUTS_PAGE]: setWorkoutScrollY,
        [ACTIVITY_PAGE]: setActivityScrollY,
        [PROFILE_PAGE]: setProfileScrollY,
      })[getCurrentPage(path)];

      if (setScroll) {
        setScroll(window.scrollY);
      }
    },
  };

  return (
    <ScrollPositionContext.Provider value={scrollProviderValue}>
      {children}
    </ScrollPositionContext.Provider>
  );
};

export const useScrollPosition = () => {
  const context = React.useContext(ScrollPositionContext);
  if (context === undefined) {
    throw new Error('useScrollPosition must be used within a ScrollPositionProvider');
  }

  return context;
};
