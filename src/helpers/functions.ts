import { useEffect, useRef } from 'react';
// @ts-ignore
import { useSpring } from 'react-spring';
import {
  DAYS_OF_THE_WEEK,
  MILLISECONDS_IN_A_MINUTE,
  MONTHS_OF_THE_YEAR,
  SECONDS_IN_A_MINUTE,
  activityHeadingHeight,
  WORKOUTS_PAGE,
  ACTIVITY_PAGE,
  PROFILE_PAGE,
  ACTIVE_WORKOUT_PAGE,
  WORKOUT_SUMMARY_PAGE,
  activeWorkoutWindowHeight,
  poundsInAKilo,
} from './constants';
import {
  isTimed,
  Activity,
  ActivityGroup,
  Exercise,
  Workout,
} from './types';

export const convertWeight = (
  weightInKilos: number,
  useKilos: boolean,
): number => {
  if (useKilos) {
    // round to the nearest 0.5
    return Math.round(weightInKilos / 0.5) * 0.5;
  } else {
    const exactWeightInPounds = weightInKilos * poundsInAKilo;
    if (exactWeightInPounds < 20) {
      // round to the nearest 0.5
      return Math.round(exactWeightInPounds / 0.5) * 0.5;
    } else {
      // round to the nearest 2.5
      return Math.round(exactWeightInPounds / 2.5) * 2.5;
    }
  }
};

export const formatWeight = (
  weightInKilos: number,
  useKilos: boolean,
): {
  weight: number;
  label: string;
} => {
  const weight = convertWeight(weightInKilos, useKilos);
  return {
    weight,
    label: useKilos ? 'kg' : 'lb',
  };
};

export const useHiddenAreaAnimation = ({
  showHiddenArea,
  onRest,
  selected,
}: {
  showHiddenArea: boolean;
  onRest: any;
  selected: boolean;
}) =>
  useSpring({
    height: showHiddenArea ? activeWorkoutWindowHeight : 0,
    opacity: showHiddenArea ? 1 : 0,
    x: showHiddenArea ? -180 : 0,
    config: { clamp: true, mass: 1, tension: 510, friction: 34 },
    onRest: () => {
      if (selected) {
        onRest();
      }
    },
  });

export const scrollElementToTop =
  (elementRef: React.MutableRefObject<HTMLLIElement>) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - activityHeadingHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

export function useInterval(callback: () => any, delay?: number) {
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const savedCallback: any = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const getInitials = (firstName: string, lastName: string): string => (
  `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`.toUpperCase()
);

export const getCurrentPage = (pathname: string): string => {
  if (pathname === '/' || /\/workouts\/$/.test(pathname)) {
    return WORKOUTS_PAGE;
  } else if (/\/workouts*/.test(pathname)) {
    return ACTIVE_WORKOUT_PAGE;
  } else if (/\/activity\/$/.test(pathname)) {
    return ACTIVITY_PAGE;
  } else if (/\/activity*/.test(pathname)) {
    return WORKOUT_SUMMARY_PAGE;
  } else if (/\/profile*/.test(pathname)) {
    return PROFILE_PAGE;
  } else {
    return '';
  }
};

export const getIdsForStretchExercises = (
  byId: { [propName: string]: Exercise },
  allIds: string[]
): string[] => (
  allIds
    // get all the exercises into an array
    .map((id: string): Exercise => byId[id])
    // keep only those exercises with the tag 'stretch'
    .filter((e: Exercise): boolean => e.tags.includes('stretch'))
    // map their ids into an array
    .map((e: Exercise): string => e.id)
);

export const getLocalStorage = (name: string, defaultValue: any) => {
  const item: (string | null) = localStorage.getItem(name);

  if (item) {
    // try to parse the string, if it's not an object, then unset it.
    try {
      return JSON.parse(item);
    } catch {
      localStorage.removeItem(name);
      return defaultValue;
    }
  }

  return defaultValue;
};

export const getTotalWeightLifted = (workout: Workout): number => (
  workout.exerciseGroups.reduce((ac: number, ag: ActivityGroup): number => (
    ac + ag.exercises.reduce((acc: number, a: Activity): number => {
      if (a.completed && !isTimed(a) && typeof a.repsAchieved === 'number') {
        return acc + (a.repsAchieved * a.weightInKilos);
      } else {
        return acc;
      }
    }, 0)
  ), 0)
);

export const formatDate = (unixTime: number | Date): {
  day: string;
  date: number;
  month: string;
  year: number;
  time: string;
  historyTileDateFormat: string;
} => {
  const d = new Date(unixTime);
  const day = DAYS_OF_THE_WEEK[d.getUTCDay()];
  const date = d.getUTCDate();
  const month = MONTHS_OF_THE_YEAR[d.getMonth()];
  const year = d.getFullYear();
  const time = `${d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
  const historyTileDateFormat = `${day}, ${date} ${month}, at ${time}`;

  return { day, date, month, year, time, historyTileDateFormat };
};

export const getDiffInMinutes = (start: number, finish: number): number => {
  // create date object first because we can't guarantee that it is in
  // the unix epoc time format
  const startTime = new Date(start);
  const finishTime = new Date(finish);

  return startTime.getTime() ? Math.ceil(
    (finishTime.getTime() - startTime.getTime()) / MILLISECONDS_IN_A_MINUTE
  ) : 0;
};

export const getTimeSince = (date: number): {
  value: number;
  unitOfMeasurement: string;
} => {
  const diff = getDiffInMinutes(date, Date.now());
  const ONE_HOUR = 60; // in minutes
  const ONE_DAY = ONE_HOUR * 24;
  const ONE_WEEK = ONE_DAY * 7;

  if (diff < ONE_HOUR) {
    return { value: diff, unitOfMeasurement: 'min' };
  }
  if (diff < ONE_DAY) {
    const hours = Math.round(diff / ONE_HOUR);
    return { value: hours, unitOfMeasurement: 'hr' };
  }
  if (diff < ONE_WEEK) {
    const days = Math.floor(diff / ONE_DAY);
    return { value: days, unitOfMeasurement: days === 1 ? 'day' : 'days' };
  }

  const weeks = Math.ceil(diff / ONE_WEEK);
  return { value: weeks, unitOfMeasurement: weeks === 1 ? 'week' : 'weeks' };
};

export const formatSeconds = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs <= 9 ? `0${secs}` : secs}`;
};

export const formatMinutes = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins < 9 ? `0${mins}` : mins}min`;
  }
};

export const getHoursAndMinutes = (minutes: number): {
  hours: number, mins: number, hoursLabel: string, minsLabel: string,
} => ({
  hours: Math.floor(minutes / 60),
  mins: minutes % 60,
  hoursLabel: 'hr',
  minsLabel: minutes % 60 === 1 ? 'min' : 'mins',
});

const ONE_REP_IN_SECONDS = 3;

const getActivityTime = (a: Activity): number =>
  isTimed(a) ? a.timerInSeconds : (a.repsGoal * ONE_REP_IN_SECONDS);

const getRestTime = (a: Activity): number =>
  a.restPeriodInSeconds || 0;

const getTotalActivityTime = (a: Activity): number =>
  getRestTime(a) + getActivityTime(a);

export const calculateWorkoutTime = (w: Workout): number => {
  const total = w.exerciseGroups
    .flatMap(group => group.exercises)
    .map(getTotalActivityTime)
    .reduce((acc, curr) => acc + curr, 0);
  return Math.round(total / SECONDS_IN_A_MINUTE);
};
