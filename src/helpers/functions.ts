import { useContext, useEffect, useRef, useState} from 'react';
// @ts-ignore
import { __RouterContext } from 'react-router-dom';
import {
  DAYS_OF_THE_WEEK,
  MILLISECONDS_IN_A_MINUTE,
  MONTHS_OF_THE_YEAR,
  SECONDS_IN_A_MINUTE,
} from './constants';
import {
  isTimed,
  Activity, // eslint-disable-line no-unused-vars
  Exercises, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
  WorkoutOutline, // eslint-disable-line no-unused-vars
} from './types';

export function useRouter(): any {
  return useContext(__RouterContext);
}

export const useHasScrolled = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    // setting 5px here allows a faster reset when scrolling back to the top
    // as we doesn't have to wait for the window bounce to settle
    setScrolled(top > 5);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrolled;
};

export function useInterval(callback: () => any, delay: number) {
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

const combineExerciseData =
  (exercises: Exercises) => (activity: Activity): Activity => ({
    ...activity,
    ...exercises.byId[activity.id] || {},
  });

export const combineDataForAllExercises = (workout: WorkoutOutline, exercisesList: Exercises): Workout => {
  const addExerciseData = combineExerciseData(exercisesList);

  return {
    ...workout,
    exerciseGroups: workout.exerciseGroups.map(group => ({
      ...group,
      exercises: group.exercises.map(addExerciseData),
    })),
  };
};

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

export const formatDate = (unixTime: number): {
  day: string;
  date: number;
  month: string;
  time: string;
  historyTileDateFormat: string;
} => {
  const d = new Date(unixTime);
  const day = DAYS_OF_THE_WEEK[d.getUTCDay()];
  const date = d.getUTCDate();
  const month = MONTHS_OF_THE_YEAR[d.getMonth()];
  const time = `${d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}`;
  const historyTileDateFormat = `${day}, ${date} ${month}, at ${time}`;

  return { day, date, month, time, historyTileDateFormat };
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

const ONE_REP_IN_SECONDS = 3;

const getActivityTime = (a: Activity): number =>
  isTimed(a) ? a.timerInSeconds : (a.repsGoal * ONE_REP_IN_SECONDS);

const getRestTime = (a: Activity): number =>
  a.restPeriodInSeconds || 0;

const getTotalActivityTime = (a: Activity): number =>
  getRestTime(a) + getActivityTime(a);

export const calculateWorkoutTime = (w: WorkoutOutline): number => {
  const total = w.exerciseGroups
    .flatMap(group => group.exercises)
    .map(getTotalActivityTime)
    .reduce((acc, curr) => acc + curr, 0);
  return Math.round(total / SECONDS_IN_A_MINUTE);
};
