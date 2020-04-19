import { getLocalStorage } from '../helpers/functions';
import { LOCAL_STORAGE_ACTIVE_WORKOUT } from '../helpers/constants';
import { State } from '../helpers/types';

export default {
  activeWorkout: getLocalStorage(LOCAL_STORAGE_ACTIVE_WORKOUT, undefined),
} as State;
