import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  LOCAL_STORAGE_HISTORY,
  LOCAL_STORAGE_SETTINGS,
  LOCAL_STORAGE_ENTITIES,
  LOCAL_STORAGE_ACTIVE_WORKOUT,
} from '../helpers/constants';

const LocalStorageSetter = ({
  history,
  settings,
  entities,
  activeWorkout,
}) => {
  localStorage.setItem(LOCAL_STORAGE_HISTORY, JSON.stringify(history));
  localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(settings));
  localStorage.setItem(LOCAL_STORAGE_ENTITIES, JSON.stringify(entities));
  localStorage.setItem(LOCAL_STORAGE_ACTIVE_WORKOUT, JSON.stringify(activeWorkout));
  return null;
};

LocalStorageSetter.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object),
  settings: PropTypes.object,
  entities: PropTypes.object,
  activeWorkout: PropTypes.object,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(LocalStorageSetter);

