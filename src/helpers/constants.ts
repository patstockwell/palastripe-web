export const WORKOUT_VERSION = 'Thu 18 Jun 2020 15:24:46 AEST';

export const appMaxWidth = 812; // 812px is the size of an iPhone X on its side
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

export const APP_URL = 'https://palastripe.com';

export const pink: string = '#ff02c8';
export const purple: string = '#6702ff';
export const blue: string = '#198FE3';
export const green: string = '#02d386';
export const yellow: string = '#f7f529';
export const orange: string = '#f79729';
export const fadedYellow: string = '#fffd8e';
export const lightGrey1 = '#dedede';
export const lightGrey2 = '#e8e8e8';
export const lightGrey3 = '#f4f4f4';
export const charcoal = '#444444';
export const darkPurple = '#291c3d';

// action types
export const EDIT_WORKOUT_ADD_SET: string = 'EDIT_WORKOUT_ADD_SET';
export const EDIT_WORKOUT_ADD_GROUP: string = 'EDIT_WORKOUT_ADD_GROUP';
export const EDIT_WORKOUT_UPDATE_GROUP_NAME: string = 'EDIT_WORKOUT_UPDATE_GROUP_NAME';

// page names for setting the current scroll height
export const WORKOUT_SUMMARY_PAGE: string = 'WORKOUT_SUMMARY_PAGE';
export const WORKOUTS_PAGE: string = 'WORKOUTS_PAGE';
export const ACTIVITY_PAGE: string = 'ACTIVITY_PAGE';
export const PROFILE_PAGE: string = 'PROFILE_PAGE';
export const ACTIVE_WORKOUT_PAGE: string = 'ACTIVE_WORKOUT_PAGE';

export const LOCAL_STORAGE_SUBSCRIBE_EMAIL: string = 'PALASTRIPE_SUBSCRIBE_EMAIL';
export const LOCAL_STORAGE_HISTORY: string = 'PALASTRIPE_HISTORY';
export const LOCAL_STORAGE_SETTINGS: string = 'PALASTRIPE_SETTINGS';
export const LOCAL_STORAGE_WORKOUTS: string = 'PALASTRIPE_WORKOUTS';
export const LOCAL_STORAGE_ACTIVE_WORKOUT: string = 'PALASTRIPE_ACTIVE_WORKOUT';
export const LOCAL_STORAGE_PROFILE: string = 'PALASTRIPE_PROFILE';
