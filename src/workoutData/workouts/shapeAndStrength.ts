import { Workout } from '../../reducers/workoutsReducer';
import { VERSION_ONE } from '../../helpers/constants';
import Image from '../../assets/images/overhead-press.jpg';

const shapeAndStrength: Workout = {
  id: 'shape-and-strength',
  name: 'Shape And Strength',
  imageUrl: Image,
  version: VERSION_ONE,
  exerciseGroups: [
    {
      id: 'warm_up',
      name: 'Warm Up',
      exercises: [
        {
          id: 'toe_touches',
          name: 'Toe Touches',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
        {
          id: 'lunges',
          name: 'Lunges',
          timerInSeconds: 60,
          restPeriodInSeconds: 30,
        },
      ],
    },
    {
      id: 'press_superset_1',
      name: 'Press Superset 1',
      exercises: [
        {
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 90,
        },
        {
          id: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 15,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },

        {
          id: 'overhead_press',
          name: 'Overhead Press',
          weightInKilos: 20,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 5,
          restPeriodInSeconds: 90,
        },
        {
          id: 'standing_bicep_curls',
          name: 'Standing Bicep Curls',
          weightInKilos: 12.5,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 2.5,
          restPeriodInSeconds: 90,
        },
      ],
    },

    {
      name: 'Press Superset 2',
      id: 'press_superset_2',
      exercises: [
        {
          id: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          id: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          id: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
        {
          id: 'butterfly',
          name: 'Butterfly',
          weightInKilos: 7,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 1,
          restPeriodInSeconds: 60,
        },
        {
          id: 'hanging_leg_raises',
          name: 'Hanging Leg Raises',
          weightInKilos: 0,
          repsGoal: 12,
          repsAchieved: 12,
          autoIncrement: 0,
          restPeriodInSeconds: 60,
        },
      ],
    },
    {
      name: 'Stretch',
      id: 'stretch',
      exercises: [
        {
          id: 'right_arm_cross_body_stretch',
          name: 'Right Arm Cross Body',
          timerInSeconds: 60,
        },
        {
          id: 'left_arm_cross_body_stretch',
          name: 'Left Arm Cross Body',
          timerInSeconds: 60,
        },
        {
          id: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 60,
        },
        {
          id: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 60,
        },
        {
          id: 'overhead_band_chest_stretch',
          name: 'Overhead Band Chest Stretch',
          timerInSeconds: 60,
        },
      ],
    },
  ],
};

export default shapeAndStrength;
