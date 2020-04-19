import { connect } from 'react-redux';
import {
  LOCAL_STORAGE_HISTORY,
  LOCAL_STORAGE_SETTINGS,
  LOCAL_STORAGE_WORKOUTS,
  LOCAL_STORAGE_ACTIVE_WORKOUT,
  LOCAL_STORAGE_PROFILE,
} from '../helpers/constants';
import {
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { setFirstVisitDate } from '../reducers/profileReducer';

type Props = typeof mapDispatch & State;

const LocalStorageSetter: React.FC<Props> = props => {
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

  if (!profile.firstVisitDate) {
    props.setFirstVisitDate();
  }

  return null;
};

const mapState = (state: State): State => state;

const mapDispatch = { setFirstVisitDate };

export default connect<State, typeof mapDispatch, {}>(
  mapState,
  mapDispatch
)(LocalStorageSetter);
