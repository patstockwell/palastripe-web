import { connect } from 'react-redux';
import { State } from '../helpers/types';
import {
  LOCAL_STORAGE_HISTORY,
  LOCAL_STORAGE_SETTINGS,
  LOCAL_STORAGE_WORKOUTS,
  LOCAL_STORAGE_ACTIVE_WORKOUT,
  LOCAL_STORAGE_PROFILE,
} from '../helpers/constants';

const LocalStorageSetter: React.FC<State> = props => {
  const {
    history,
    settings,
    workouts,
    activeWorkout,
    profile,
  } = props;
  localStorage.setItem(LOCAL_STORAGE_HISTORY, JSON.stringify(history));
  localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(settings));
  localStorage.setItem(LOCAL_STORAGE_WORKOUTS, JSON.stringify(workouts));
  localStorage.setItem(LOCAL_STORAGE_PROFILE, JSON.stringify(profile));
  localStorage.setItem(LOCAL_STORAGE_ACTIVE_WORKOUT, JSON.stringify(activeWorkout));

  return null;
};

const mapState = (state: State): State => state;

export default connect<State, {}, {}>(mapState)(LocalStorageSetter);
