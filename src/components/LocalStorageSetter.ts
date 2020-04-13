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
import {
  setFirstVisitDate as setFirstVisitDateActionCreator,
  SetFirstVisitDate, // eslint-disable-line no-unused-vars
} from '../reducers/profileReducer';

type Props = DispatchProps & State;

const LocalStorageSetter: React.FC<Props> = ({
  history,
  settings,
  workouts,
  activeWorkout,
  profile,
  setFirstVisitDate,
}) => {
  localStorage.setItem(LOCAL_STORAGE_HISTORY, JSON.stringify(history));
  localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(settings));
  localStorage.setItem(LOCAL_STORAGE_WORKOUTS, JSON.stringify(workouts));
  localStorage.setItem(LOCAL_STORAGE_PROFILE, JSON.stringify(profile));
  localStorage.setItem(LOCAL_STORAGE_ACTIVE_WORKOUT, JSON.stringify(activeWorkout));

  if (!profile.firstVisitDate) {
    setFirstVisitDate();
  }

  return null;
};

const mapStateToProps = (state: State): State => state;

interface DispatchProps {
  setFirstVisitDate: SetFirstVisitDate;
}

const mapDispatchToProps: DispatchProps = {
  setFirstVisitDate: setFirstVisitDateActionCreator,
};

export default connect<State, DispatchProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(LocalStorageSetter);
