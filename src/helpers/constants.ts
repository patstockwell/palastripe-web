export const tileGap: number = 16;
export const tileMinHeight: number = 100;
export const navBarHeight: number = 48;
export const bannerHeight: number = 48;
export const activeWorkoutWindowHeight = 300;
export const activeWorkoutWindowHeightCollapsed = 100;
export const activityHeadingHeight: number = 40;
export const workoutWindowViewport: number = 50;
export const gutterWidth: number = 12;
export const timedExerciseWaitPeriod: number = 2;

export const DELAY_BEFORE_SHOWING_TIMER: number = 2;
export const DEFAULT_REST_PERIOD_IN_SECONDS: number = 120;
export const ONE_SECOND: number = 1000;
export const ONE_DAY: number = 86400000;
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

export const pink: string = '#ff02c8';
export const purple: string = '#6702ff';
export const blue: string = '#198FE3';
export const green: string = '#02d386';
export const yellow: string = '#f7f529';
export const orange: string = '#f79729';
export const fadedYellow: string = '#fffd8e';
export const lightLightGrey = '#dedede';
export const superLightGrey = '#f4f4f4';

// action types
export const FINISH_WORKOUT: string = 'FINISH_WORKOUT';
export const SET_ACTIVE_WORKOUT: string = 'SET_ACTIVE_WORKOUT';
export const TOGGLE_SET_COMPLETE: string = 'TOGGLE_SET_COMPLETE';
export const SET_WINDOW_SCROLL: string = 'SET_WINDOW_SCROLL';
export const CHANGE_REPS: string = 'CHANGE_REPS';
export const CHANGE_WEIGHT: string = 'CHANGE_WEIGHT';
export const WORKOUT_SHAPE_VERSION: string = 'v1';

// activity group names

export const WARM_UP = 'warmUp';
export const WORKING_SETS = 'workingSets';
export const STRETCH = 'stretch';

// page names for setting the current scroll height
export const WORKOUTS: string = 'WORKOUTS';
export const HOME: string = 'HOME';
export const ME: string = 'ME';

export const LOCAL_STORAGE_HISTORY: string = 'HBFF_HISTORY';
export const LOCAL_STORAGE_SETTINGS: string = 'HBFF_SETTINGS';
export const LOCAL_STORAGE_ENTITIES: string = 'HBFF_ENTITIES';
export const LOCAL_STORAGE_ACTIVE_WORKOUT: string = 'HBFF_ACTIVE_WORKOUT';
