// Never remove versions, simply add new ones as needed
export const VERSION_ONE = 'Version 1';

export const appMaxWidth = 600;
export const tileGap: number = 16;
export const tileMinHeight: number = 88;
export const workoutTileMinHeight: number = 100;
export const navBarHeight: number = 48;
export const bannerHeight: number = 48;
export const activeWorkoutWindowHeight = 320;
export const activeWorkoutWindowHeightCollapsed = 100;
export const activityHeadingHeight: number = 40;
export const workoutWindowViewport: number = 50;
export const gutterWidth: number = 12;
export const timedExerciseWaitPeriod: number = 5;
export const poundsInAKilo: number = 2.20462262185;
export const twoAndAHalfPoundsInKilos = 1.133981;
export const halfAPoundInKilos = 0.2267962;

export const DEFAULT_REST_PERIOD_IN_SECONDS: number = 30;
export const ONE_SECOND: number = 1000;
export const ONE_DAY: number = 86400000;
export const ONE_WEEK: number = ONE_DAY * 7;
export const MILLISECONDS_IN_A_SECOND: number = 1000;
export const SECONDS_IN_A_MINUTE: number = 60;
export const MILLISECONDS_IN_A_MINUTE: number =
  MILLISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE;
export const DAYS_OF_THE_WEEK: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const MONTHS_OF_THE_YEAR: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const APP_URL = 'https://harderbetterfasterfitter.com';

export const pink: string = '#ff02c8';
export const purple: string = '#6702ff';
export const blue: string = '#198FE3';
export const green: string = '#02d386';
export const yellow: string = '#f7f529';
export const orange: string = '#f79729';
export const fadedYellow: string = '#fffd8e';
export const lightLightGrey = '#dedede';
export const superLightGrey = '#f4f4f4';
export const charcoal = '#444444';
export const darkPurple = '#291c3d';

// action types
export const SET_NAV_ANIMATION: string = 'SET_NAV_ANIMATION';
export const SET_SELECTED_EXERCISE: string = 'SET_SELECTED_EXERCISE';
export const SELECT_NEXT_EXERCISE: string = 'SELECT_NEXT_EXERCISE';
export const FINISH_WORKOUT: string = 'FINISH_WORKOUT';
export const DELETE_WORKOUT: string = 'DELETE_WORKOUT';
export const EDIT_WORKOUT_ADD_SET: string = 'EDIT_WORKOUT_ADD_SET';
export const EDIT_WORKOUT_ADD_GROUP: string = 'EDIT_WORKOUT_ADD_GROUP';
export const EDIT_WORKOUT_UPDATE_GROUP_NAME: string = 'EDIT_WORKOUT_UPDATE_GROUP_NAME';
export const SET_ACTIVE_WORKOUT: string = 'SET_ACTIVE_WORKOUT';
export const TOGGLE_SET_COMPLETE: string = 'TOGGLE_SET_COMPLETE';
export const CHANGE_REPS: string = 'CHANGE_REPS';
export const CHANGE_WEIGHT: string = 'CHANGE_WEIGHT';
export const INCREMENT_WEIGHT: string = 'INCREMENT_WEIGHT';
export const DECREMENT_WEIGHT: string = 'DECREMENT_WEIGHT';
export const WORKOUT_SHAPE_VERSION: string = 'v1';

// page names for setting the current scroll height
export const WORKOUT_SUMMARY_PAGE: string = 'WORKOUT_SUMMARY_PAGE';
export const WORKOUTS_PAGE: string = 'WORKOUTS_PAGE';
export const ACTIVITY_PAGE: string = 'ACTIVITY_PAGE';
export const PROFILE_PAGE: string = 'PROFILE_PAGE';
export const ACTIVE_WORKOUT_PAGE: string = 'ACTIVE_WORKOUT_PAGE';

export const LOCAL_STORAGE_HISTORY: string = 'HBFF_HISTORY';
export const LOCAL_STORAGE_SETTINGS: string = 'HBFF_SETTINGS';
export const LOCAL_STORAGE_ENTITIES: string = 'HBFF_ENTITIES';
export const LOCAL_STORAGE_ACTIVE_WORKOUT: string = 'HBFF_ACTIVE_WORKOUT';
export const LOCAL_STORAGE_PROFILE: string = 'HBFF_PROFILE';
