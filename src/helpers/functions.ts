import { useEffect, useRef } from 'react';
import {
  DAYS_OF_THE_WEEK,
  MILLISECONDS_IN_A_MINUTE,
  MONTHS_OF_THE_YEAR,
} from './constants';

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

// decrement reps or loop back to the start
// undefined -> 5 -> 4 -> 3 -> 2 -> 1 -> 0 -> undefined -> ...
export const decrementReps = (reps: (number | undefined), max: number) =>
  reps === undefined ? max :
    reps <= 0 ? undefined : reps - 1;

interface Set {
  max: number;
  completed: (number | undefined);
}

export const checkAllSetsAreComplete = (sets: Set[]) => sets.reduce((acc, curr) => (
  curr.max === curr.completed && acc
), true);

export const getLocalStorage = (name: string, defaultValue: any) => {
  const item: (string | null) = localStorage.getItem(name);
  return item ? JSON.parse(item) : defaultValue;
};

export const formatDate = (time: number) => {
  const date = new Date(time);
  return {
    day: DAYS_OF_THE_WEEK[date.getUTCDay()],
    date: date.getUTCDate(),
    month: MONTHS_OF_THE_YEAR[date.getMonth()],
  };
};

export const getDiff = (start: number, finish: number) => {
  // create date object first because we can't guarantee that it is in
  // the unix epoc time format
  const startTime = new Date(start);
  const finishTime = new Date(finish);

  return startTime.getTime() ? Math.ceil(
    (finishTime.getTime() - startTime.getTime()) / MILLISECONDS_IN_A_MINUTE
  ) : 0;
};

export const formatTime = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes}min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}hr ${mins < 9 ? `0${mins}` : mins}min`;
  }
};
