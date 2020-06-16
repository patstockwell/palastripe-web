import { v4 as uuidv4 } from 'uuid';
import { Workout } from '../../reducers/workoutsReducer';
import { WORKOUT_VERSION } from '../../helpers/constants';
import Image from '../../assets/images/active-athlete-barbell-2261482.jpg';

export const glutesAndGlory: Workout = {
  id: 'glutes-and-glory',
  name: 'Glutes & Glory',
  imageUrl: Image,
  version: WORKOUT_VERSION,
  exerciseGroups: [
    {
      id: 'f3985524-f9a8-4383-963e-a4b32e5642b9',
      name: 'Compound Barbell Exercises',
      exercises: [
        {
          instanceId: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'back_squat',
          name: 'Back Squat',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },

        {
          instanceId: uuidv4(),
          exerciseId: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'dead_lift',
          name: 'Dead Lift',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
      ],
    },
    {
      name: 'a7ecd3f8-27e4-41d7-b9a9-6207081ab8ed',
      id: 'calves',
      exercises: [
        {
          instanceId: uuidv4(),
          exerciseId: 'standing_calf_raises',
          name: 'Standing Calf Raises',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'standing_calf_raises',
          name: 'Standing Calf Raises',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'standing_calf_raises',
          name: 'Standing Calf Raises',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'standing_calf_raises',
          name: 'Standing Calf Raises',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'standing_calf_raises',
          name: 'Standing Calf Raises',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },

        {
          instanceId: uuidv4(),
          exerciseId: 'calf_press_on_leg_press',
          name: 'Calf Press on Leg Press',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'calf_press_on_leg_press',
          name: 'Calf Press on Leg Press',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'calf_press_on_leg_press',
          name: 'Calf Press on Leg Press',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'calf_press_on_leg_press',
          name: 'Calf Press on Leg Press',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'calf_press_on_leg_press',
          name: 'Calf Press on Leg Press',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
      ],
    },

    {
      id: '36cbe4fc-8854-44ce-8468-afdd76831ac0',
      name: 'Quads and Hamstrings',
      exercises: [
        {
          instanceId: uuidv4(),
          exerciseId: 'leg_press',
          name: 'Leg Press',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'leg_press',
          name: 'Leg Press',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'leg_press',
          name: 'Leg Press',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'leg_press',
          name: 'Leg Press',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'leg_press',
          name: 'Leg Press',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 60,
          restPeriodInSeconds: 30,
        },

        {
          instanceId: uuidv4(),
          exerciseId: 'lying_leg_curls',
          name: 'Lying Leg Curls',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'lying_leg_curls',
          name: 'Lying Leg Curls',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'lying_leg_curls',
          name: 'Lying Leg Curls',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'lying_leg_curls',
          name: 'Lying Leg Curls',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'lying_leg_curls',
          name: 'Lying Leg Curls',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 30,
          restPeriodInSeconds: 30,
        },
      ],
    },

    {
      id: '3deb6248-74e0-491f-82b2-26e59c4b1afa',
      name: 'Core Strength',
      exercises: [
        {
          instanceId: uuidv4(),
          exerciseId: 'ab_crunch_machine',
          name: 'Ab Crunch Machine',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 20,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'ab_crunch_machine',
          name: 'Ab Crunch Machine',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 20,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'ab_crunch_machine',
          name: 'Ab Crunch Machine',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 20,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'ab_crunch_machine',
          name: 'Ab Crunch Machine',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 20,
          restPeriodInSeconds: 30,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'ab_crunch_machine',
          name: 'Ab Crunch Machine',
          repsGoal: 10,
          repsAchieved: 10,
          autoIncrement: 2.5,
          weightInKilos: 20,
          restPeriodInSeconds: 30,
        },
      ],
    },

    {
      id: '0c9b7ef7-c704-4dee-aba2-730885dd426d',
      name: 'Stretch',
      exercises: [
        {
          instanceId: uuidv4(),
          exerciseId: 'left_leg_hamstring_stretch',
          name: 'Left Leg Hamstring stretch',
          timerInSeconds: 45,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'right_leg_hamstring_stretch',
          name: 'Right Leg Hamstring stretch',
          timerInSeconds: 45,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'left_glute_pigeon_pose_stretch',
          name: 'Left Glute Pigeon Pose',
          timerInSeconds: 45,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'right_glute_pigeon_pose_stretch',
          name: 'Right Glute Pigeon Pose',
          timerInSeconds: 45,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'kneeling_left_hip_flexor_stretch',
          name: 'Kneeling Left Hip-Flexor Stretch',
          timerInSeconds: 45,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'kneeling_right_hip_flexor_stretch',
          name: 'Kneeling Right Hip-Flexor Stretch',
          timerInSeconds: 45,
        },
        {
          instanceId: uuidv4(),
          exerciseId: 'overhead_band_chest_stretch',
          name: 'Overhead Band Chest Stretch',
          timerInSeconds: 45,
        },
      ],
    },
  ],
};
