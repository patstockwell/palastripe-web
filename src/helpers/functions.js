import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  // https://overreacted.io/making-setinterval-declarative-with-react-hooks/
  const savedCallback = useRef();

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
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// decrement reps or loop back to the start
// undefined -> 5 -> 4 -> 3 -> 2 -> 1 -> 0 -> undefined -> ...
export const decrementReps = (reps, max) =>
  reps === undefined ? max :
    reps === 0 ? undefined : reps - 1;

export const checkAllSetsAreComplete = sets => sets.reduce((acc, curr) => (
  curr.max === curr.completed && acc
), true);

export const getLocalState = (name, defaultValue) => {
  return localStorage.getItem(name)
    ? JSON.parse(localStorage.getItem(name))
    : defaultValue;
};

