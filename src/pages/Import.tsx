import React, { useState, useRef } from 'react';
import { Workout } from '../reducers/workoutsReducer';
import { Link } from 'react-router-dom';
import { use_UNSTABLE_AddHistoryToEndOfHistory } from '../reducers/historyReducer';

export const Import = () => {
  const textareaRef = useRef();
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [badWorkoutData, setBadWorkoutData] = useState(undefined);
  const [validData, setValidData] = useState<Workout[]>([]);
  const addItBoi = use_UNSTABLE_AddHistoryToEndOfHistory();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const isValidWorkout = (w: Workout) =>
    typeof w === 'object'
    && w.hasOwnProperty('id')
    && w.hasOwnProperty('name')
    && w.hasOwnProperty('exerciseGroups')
    && w.hasOwnProperty('imageUrl')
    && w.hasOwnProperty('finishTime');

  const validate = () => {
    try {
      const parsedInput = JSON.parse(value);
      console.log('parse successful', parsedInput);
      const isArray = Array.isArray(parsedInput);
      if (isArray) {
        const allWorkoutsAreValid = (parsedInput as Array<Workout>).every(isValidWorkout);
        setIsValid(allWorkoutsAreValid);

        if (allWorkoutsAreValid) {
          setValidData(parsedInput as Workout[]);
        } else {
          const badWorkout = (parsedInput as Array<Workout>).find(w => !isValidWorkout(w));
          setBadWorkoutData(badWorkout);
        }
      } else {
        setIsValid(false);
      }
    } catch (e) {
      console.log('uh oh', e);
      setError((e as Error).message);
    }
  };

  const handleActualImport = () => {
    addItBoi(validData);
    setValue('');
    setIsValid(false);
  };

  return (
    <>
      <h1>Import page</h1>
      <Link to='/'>quit this crap and go back home dude</Link>
      <br />
      <br />
      {error && <p>Sorry dude, something went wrong. {error}</p>}
      <button onClick={validate}>validate first!</button>
      {isValid && <br />}
      {isValid && <br />}
      {isValid && <p>Looks good, nice work captain</p>}
      {isValid && <button onClick={handleActualImport}>do the thing!</button>}
      {isValid && <br />}
      {isValid && <br />}

      {badWorkoutData && <br />}
      {badWorkoutData && <br />}
      {badWorkoutData && <p>Aw shit, bad data: {JSON.stringify(badWorkoutData)}</p>}
      {badWorkoutData && <br />}
      {badWorkoutData && <br />}
      <br />
      <textarea
        value={value}
        ref={textareaRef}
        onChange={handleChange}
        style={{ height: '400px', width: '95%' }}
      />
    </>
  );
};
