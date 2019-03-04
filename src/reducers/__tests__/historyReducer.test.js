import historyReducer from '../historyReducer';
import { END_WORKOUT } from '../../helpers/constants';

describe('the historyReducer', () => {
  let state;

  beforeEach(() => {
    state = [{ exercise: 'dips', reps: 4 }];
  });

  it('returns the state when there is no matching action', () => {
    expect(historyReducer(state, { type: 'not me' })).toEqual(state);
  });

  it('returns the correct state object when the action is END_WORKOUT', () => {
    expect(historyReducer(state, {
      type: END_WORKOUT,
      payload: {
        activeWorkout: { exercise: 'push ups', reps: 10 },
      },
    })).toEqual([
      { exercise: 'push ups', reps: 10, finishTime: expect.any(Number) },
      { exercise: 'dips', reps: 4 }
    ]);
  });
});
