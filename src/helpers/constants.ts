// Any workouts that come from local storage that don't meet this version get
// removed. That logic lives in a function called mergeWorkouts in the workout
// reducer. Bump this version with care as clients will lose their progress when
// workouts are replaced with a newer version.
export const WORKOUT_VERSION = 'Thu 20 Aug 2020 22:48:49 AEST';

export const appMaxWidth = 812; // 812px is the size of an iPhone X on its side
export const tileGap = 16;
export const tileMinHeight = 88;
export const navBarHeight = 48;
export const bannerHeight = 48;
export const activeWorkoutWindowHeight = 350;
export const activeWorkoutWindowHeightCollapsed = 100;
export const activityHeadingHeight = 40;
export const workoutWindowViewport = 50;
export const gutterWidth = 16;
export const timedExerciseWaitPeriod = 5;
export const poundsInAKilo = 2.20462262185;
export const twoAndAHalfPoundsInKilos = 1.133981;
export const halfAPoundInKilos = 0.2267962;

export const DEFAULT_REST_PERIOD_IN_SECONDS = 30;
export const ONE_SECOND = 1000;
export const ONE_DAY = 86400000;
export const ONE_WEEK = ONE_DAY * 7;
export const MILLISECONDS_IN_A_SECOND = 1000;
export const SECONDS_IN_A_MINUTE = 60;
export const MILLISECONDS_IN_A_MINUTE =
  MILLISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE;
export const DAYS_OF_THE_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const MONTHS_OF_THE_YEAR = [
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

export const APP_URL = 'https://palastripe.com';

export const pink = '#ff02c8';
export const purple = '#6702ff';
export const blue = '#198FE3';
export const green = '#02d386';
export const yellow = '#f7f529';
export const orange = '#f79729';
export const fadedYellow = '#fffd8e';
export const lightGrey1 = '#dedede';
export const lightGrey2 = '#e8e8e8';
export const lightGrey3 = '#f4f4f4';
export const charcoal = '#444444';
export const darkPurple = '#291c3d';

// action types
export const EDIT_WORKOUT_ADD_SET = 'EDIT_WORKOUT_ADD_SET';
export const EDIT_WORKOUT_ADD_GROUP = 'EDIT_WORKOUT_ADD_GROUP';
export const EDIT_WORKOUT_UPDATE_GROUP_NAME = 'EDIT_WORKOUT_UPDATE_GROUP_NAME';

// page names for setting the current scroll height
export const WORKOUT_SUMMARY_PAGE = 'WORKOUT_SUMMARY_PAGE';
export const WORKOUTS_PAGE = 'WORKOUTS_PAGE';
export const ACTIVITY_PAGE = 'ACTIVITY_PAGE';
export const PROFILE_PAGE = 'PROFILE_PAGE';
export const ACTIVE_WORKOUT_PAGE = 'ACTIVE_WORKOUT_PAGE';

export const LOCAL_STORAGE_SUBSCRIBE_EMAIL = 'PALASTRIPE_SUBSCRIBE_EMAIL';
export const LOCAL_STORAGE_HISTORY = 'PALASTRIPE_HISTORY';
export const LOCAL_STORAGE_SETTINGS = 'PALASTRIPE_SETTINGS';
export const LOCAL_STORAGE_WORKOUTS = 'PALASTRIPE_WORKOUTS';
export const LOCAL_STORAGE_ACTIVE_WORKOUT = 'PALASTRIPE_ACTIVE_WORKOUT';
export const LOCAL_STORAGE_PROFILE = 'PALASTRIPE_PROFILE';
