import { connect } from 'react-redux';
import {
  LOCAL_STORAGE_HISTORY,
  LOCAL_STORAGE_SETTINGS,
  LOCAL_STORAGE_ENTITIES,
  LOCAL_STORAGE_ACTIVE_WORKOUT,
} from '../helpers/constants';
import {
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const LocalStorageSetter = ({
  history,
  settings,
  entities,
  activeWorkout,
}) => {
  localStorage.setItem(LOCAL_STORAGE_HISTORY, JSON.stringify(history));
  localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(settings));
  localStorage.setItem(LOCAL_STORAGE_ENTITIES, JSON.stringify(entities));
  // only try to add the activeWorkout to local storage if it exists.
  if (activeWorkout) {
    localStorage.setItem(LOCAL_STORAGE_ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
  }

  return null;
};

const mapStateToProps = (state: State): State => state;

export default connect(mapStateToProps)(LocalStorageSetter);
