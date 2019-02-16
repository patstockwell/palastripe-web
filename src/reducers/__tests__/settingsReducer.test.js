import settingsReducer from '../settingsReducer';
import initialState from '../initialState';

describe('the settingsReducer', () => {
  let state;

  beforeEach(() => {
    state = {
      ...initialState.settings,
    };
  });

  it('returns the state when there is no matching action', () => {
    expect(settingsReducer(state, {})).toEqual(state);
  });
});
