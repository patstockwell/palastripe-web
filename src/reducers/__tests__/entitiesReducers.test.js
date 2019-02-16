import entitiesReducer from '../entitiesReducer';
import initialState from '../initialState';

describe('the entitiesReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState.entities,
    };
  });

  it('returns the state when there is no matching action', () => {
    expect(entitiesReducer(state, { type: 'no match' })).toEqual(state);
  });
});
