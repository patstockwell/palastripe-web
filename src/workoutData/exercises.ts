import {
  Exercises, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import { getIdsForStretchExercises } from '../helpers/functions';

const byId = {
  'band_pass_through' : {
    tags: ['shoulders', 'warm up', 'warmup', 'warm-up'],
    id: 'band_pass_through',
    name: 'Band Pass Through',
  },
  'ez_bar_curl' : {
    tags: ['arms', 'bicep', 'biceps', 'curl', 'bar'],
    id: 'ez_bar_curl',
    name: 'EZ Bar Curl',
  },
  'butterfly' : {
    tags: ['arms', 'chest', 'machine'],
    id: 'butterfly',
    name: 'Butterfly',
  },
  'hanging_leg_raises' : {
    tags: ['core'],
    id: 'hanging_leg_raises',
    name: 'Hanging Leg Raises',
  },
  'toe_touches': {
    tags: ['abs', 'core'],
    id: 'toe_touches',
    name: 'Toe Touches',
  },
  'skull_crushers': {
    tags: [],
    id: 'skull_crushers',
    name: 'Skull Crushers',
  },
  'kneeling_right_hip_flexor_stretch': {
    tags: ['stretch'],
    id: 'kneeling_right_hip_flexor_stretch',
    name: 'Kneeling Right Hip-Flexor Stretch',
  },
  'kneeling_left_hip_flexor_stretch': {
    tags: ['stretch'],
    id: 'kneeling_left_hip_flexor_stretch',
    name: 'Kneeling Left Hip-Flexor Stretch',
  },
  'ab_crunch_machine': {
    tags: [],
    id: 'ab_crunch_machine',
    name: 'Ab Crunch Machine',
  },
  'lying_leg_curls': {
    tags: [],
    id: 'lying_leg_curls',
    name: 'Lying Leg Curls',
  },
  'leg_press': {
    tags: [],
    id: 'leg_press',
    name: 'Leg Press',
  },
  'standing_calf_raises': {
    tags: [],
    id: 'standing_calf_raises',
    name: 'Standing Calf Raises',
  },
  'calf_press_on_leg_press': {
    tags: [],
    id: 'calf_press_on_leg_press',
    name: 'Calf Press on Leg Press',
  },
  'dead_lift': {
    tags: [],
    id: 'dead_lift',
    name: 'Dead Lift',
    // mostWeightInKilos: undefined,
  },
  'back_squat': {
    tags: [],
    id: 'back_squat',
    name: 'Back Squat',
  },
  'overhead_press': {
    tags: [],
    id: 'overhead_press',
    name: 'Overhead Press',
  },
  'chin_up': {
    tags: [],
    id: 'chin_up',
    name: 'Chin Ups',
  },
  'bench_press': {
    tags: ['chest', 'compound', 'barbell'],
    id: 'bench_press',
    name: 'Bench Press',
  },
  'standing_bicep_curls': {
    tags: [],
    id: 'standing_bicep_curls',
    name: 'Standing Bicep Curls',
  },
  'bicep_curl': {
    tags: [],
    id: 'bicep_curl',
    name: 'Bicep Curl',
  },
  'upright_row': {
    tags: [],
    id: 'upright_row',
    name: 'Upright Row',
  },
  'straight_leg_dumbbell_deadlift': {
    tags: [],
    id: 'straight_leg_dumbbell_deadlift',
    name: 'Straight-leg Dumbbell Deadlift',
  },
  'dumbbell_overhead_press': {
    tags: [],
    id: 'dumbbell_overhead_press',
    name: 'Dumbbell Overhead Press',
  },
  'sit_ups': {
    tags: [],
    id: 'sit_ups',
    name: 'Sit Ups',
  },
  'right_arm_cross_body_stretch': {
    tags: ['stretch'],
    id: 'right_arm_cross_body_stretch',
    name: 'Right Arm Cross Body',
  },
  'left_arm_cross_body_stretch': {
    tags: ['stretch'],
    id: 'left_arm_cross_body_stretch',
    name: 'Left Arm Cross Body',
  },
  'left_glute_pigeon_pose_stretch': {
    tags: ['stretch'],
    id: 'left_glute_pigeon_pose_stretch',
    name: 'Left Glute Pigeon Pose',
  },
  'right_glute_pigeon_pose_stretch': {
    tags: ['stretch'],
    id: 'right_glute_pigeon_pose_stretch',
    name: 'Right Glute Pigeon Pose',
  },
  'scissor_jumps': {
    tags: [],
    id: 'scissor_jumps',
    name: 'Scissor Jumps',
  },
  'dumbbell_bench_press': {
    tags: [],
    id: 'dumbbell_bench_press',
    name: 'Dumbbell Bench Press',
  },
  'standing_bicep_hammer_curls': {
    tags: [],
    id: 'standing_bicep_hammer_curls',
    name: 'Standing Dumbbell Hammer Curls',
  },
  'face_pulls': {
    tags: [],
    id: 'face_pulls',
    name: 'Face Pulls',
  },
  'overhead_band_chest_stretch': {
    tags: ['stretch'],
    id: 'overhead_band_chest_stretch',
    name: 'Overhead Band Chest Stretch',
  },
  'lunges': {
    tags: [],
    id: 'lunges',
    name: 'Lunges',
  },
  'right_leg_hamstring_stretch': {
    tags: ['stretch'],
    id: 'right_leg_hamstring_stretch',
    name: 'Right Leg Hamstring stretch',
  },
  'left_leg_hamstring_stretch': {
    tags: ['stretch'],
    id: 'left_leg_hamstring_stretch',
    name: 'Left Leg Hamstring stretch',
  },
  'concentration_curl': {
    tags: [],
    id: 'concentration_curl',
    name: 'Concentration Curl',
  },
  'push_ups': {
    tags: [],
    id: 'push_ups',
    name: 'Push Ups',
  },
  'machine_chest_flys': {
    tags: [],
    id: 'machine_chest_flys',
    name: 'Machine Chest Flys',
  },
  'stationary_bike': {
    tags: [],
    id: 'stationary_bike',
    name: 'Stationary Bike',
  },
  'ring_rows': {
    tags: [],
    id: 'ring_rows',
    name: 'Ring Rows',
  },
  'chest_dips': {
    tags: ['chest'],
    id: 'chest_dips',
    name: 'Chest Dips',
  },
};

const allIds = [
  'standing_calf_raises',
  'calf_press_on_leg_press',
  'dead_lift',
  'back_squat',
  'overhead_press',
  'chin_up',
  'bench_press',
  'bicep_curl',
  'upright_row',
  'straight_leg_dumbbell_deadlift',
  'dumbbell_overhead_press',
  'sit_ups',
  'right_arm_cross_body_stretch',
  'left_arm_cross_body_stretch',
  'left_glute_pigeon_pose_stretch',
  'right_glute_pigeon_pose_stretch',
  'scissor_jumps',
  'dumbbell_bench_press',
  'overhead_band_chest_stretch',
  'face_pulls',
  'standing_bicep_hammer_curls',
  'lunges',
  'left_leg_hamstring_stretch',
  'right_leg_hamstring_stretch',
  'stationary_bike',
  'leg_press',
  'lying_leg_curls',
  'ab_crunch_machine',
  'kneeling_left_hip_flexor_stretch',
  'kneeling_right_hip_flexor_stretch',
  'skull_crushers',
  'toe_touches',
  'hanging_leg_raises',
  'butterfly',
  'band_pass_through',
  'ez_bar_curl',
  'chest_dips',
];

export const stretchExerciseIds = getIdsForStretchExercises(byId, allIds);

const exercises: Exercises = {
  byId,
  allIds,
  stretchExerciseIds,
};

export default exercises;
