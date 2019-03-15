import {
  formatDate,
  decrementReps,
  checkAllSetsAreComplete,
} from '../functions';

describe('the decrementReps function', () => {
  it('returns undefined when the input is 0', () => {
    const newReps = decrementReps(0, 10);
    expect(newReps).toEqual(undefined);
  });

  it('returns undefined when the input is less than 0', () => {
    const newReps = decrementReps(-5, 10);
    expect(newReps).toEqual(undefined);
  });

  it('returns the max when the input is undefined', () => {
    const newReps = decrementReps(undefined, 10);
    expect(newReps).toEqual(10);
  });

  it('returns one less than the input when the input is positive', () => {
    const newReps = decrementReps(8, 10);
    expect(newReps).toEqual(7);
  });
});

describe('the checkAllSetsAreComplete function', () => {
  it('returns true when all sets are complete', () => {
    const isComplete = checkAllSetsAreComplete([
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
    ]);

    expect(isComplete).toEqual(true);
  });

  it('returns false when nothing is attempted', () => {
    const isComplete = checkAllSetsAreComplete([
      { max: 10, completed: undefined },
      { max: 10, completed: undefined },
      { max: 10, completed: undefined },
      { max: 10, completed: undefined },
    ]);

    expect(isComplete).toEqual(false);
  });

  it('returns false when zero sets are complete', () => {
    const isComplete = checkAllSetsAreComplete([
      { max: 10, completed: 9 },
      { max: 10, completed: 7 },
      { max: 10, completed: 6 },
      { max: 10, completed: 5 },
    ]);

    expect(isComplete).toEqual(false);
  });

  it('returns false when sets are incomplete', () => {
    const isComplete = checkAllSetsAreComplete([
      { max: 10, completed: 9 },
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
    ]);

    expect(isComplete).toEqual(false);
  });

  it('returns false when sets are incomplete even if there are lots of sets', () => {
    const isComplete = checkAllSetsAreComplete([
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
      { max: 10, completed: 10 },
      { max: 10, completed: 9 },
    ]);

    expect(isComplete).toEqual(false);
  });
});

describe('the formatDate function', () => {
  it('returns the correct object', () => {
    const formatedDate = formatDate(1552633954436);
    expect(formatedDate).toEqual({
      day: 'Friday',
      date: 15,
      month: 'March',
    });
  });
});

