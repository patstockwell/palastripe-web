import { zipSets } from '../functions';

describe('the zipSets() function', () => {
  it('should return the correct value when the completedSets are empty', () => {
    const sets = [4, 4, 4, 4];
    const completedSets = [];
    const zippedArray = zipSets(sets, completedSets);
    expect(zippedArray).toEqual([
      { max: 4, completed: undefined },
      { max: 4, completed: undefined },
      { max: 4, completed: undefined },
      { max: 4, completed: undefined },
    ]);
  });

  it('should return the correct value when completedSets has values', () => {
    const sets = [4, 4, 4, 4];
    const completedSets = [4, 3, 3, 1];
    const zippedArray = zipSets(sets, completedSets);
    expect(zippedArray).toEqual([
      { max: 4, completed: 4 },
      { max: 4, completed: 3 },
      { max: 4, completed: 3 },
      { max: 4, completed: 1 },
    ]);
  });
});
