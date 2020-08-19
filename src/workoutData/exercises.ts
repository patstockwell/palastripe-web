import { Exercises, Exercise } from '../helpers/types';
import { getIdsForStretchExercises } from '../helpers/functions';

interface ById {
  [key: string]: Exercise
}

const byId: ById = {
  box_step_up: {
    defaultWeightInKilos: 20,
    id: 'box_step_up',
    name: 'Box Step Up',
    tags: ['legs'],
  },
  leg_extension: {
    defaultWeightInKilos: 20,
    id: 'leg_extension',
    name: 'Leg Extension',
    tags: ['legs'],
  },
  bulgarian_split_squat: {
    defaultWeightInKilos: 20,
    id: 'bulgarian_split_squat',
    name: 'Bulgarian Split Squat',
    tags: ['legs'],
  },
  neck_curl: {
    defaultWeightInKilos: 2.5,
    id: 'neck_curl',
    name: 'Neck Curl',
    tags: [],
  },
  seated_dumbbell_press: {
    defaultWeightInKilos: 12.5,
    id: 'seated_dumbbell_press',
    name: 'Seated Dumbbell Press',
    tags: [],
  },
  dumbbell_row: {
    defaultWeightInKilos: 15,
    id: 'dumbbell_row',
    name: 'Dumbbell Row',
    tags: ['dumbbell'],
  },
  dumbbell_shrug: {
    defaultWeightInKilos: 20,
    id: 'dumbbell_shrug',
    name: 'Dumbbell Shrug',
    tags: ['dumbbell'],
  },
  sumo_deadlift: {
    defaultWeightInKilos: 60,
    id: 'sumo_deadlift',
    name: 'Sumo Deadlift',
    tags: ['legs', 'barbell'],
  },
  front_squat: {
    defaultWeightInKilos: 40,
    id: 'front_squat',
    name: 'Front Squat',
    tags: ['legs'],
  },
  overhead_tricep_extension_cable: {
    name: 'Overhead Tricep Extension - Cable',
    id: 'overhead_tricep_extension_cable',
    defaultWeightInKilos: 25,
    tags: ['tricep', 'triceps', 'dumbbell'],
  },
  overhead_tricep_extension_ez_bar: {
    name: 'Overhead Tricep Extension - EZ Bar',
    id: 'overhead_tricep_extension_ez_bar',
    defaultWeightInKilos: 25,
    tags: ['tricep', 'triceps', 'dumbbell'],
  },
  overhead_tricep_extension_dumbbell: {
    name: 'Overhead Tricep Extension - Dumbbell',
    id: 'overhead_tricep_extension_dumbbell',
    defaultWeightInKilos: 10,
    tags: ['tricep', 'triceps', 'dumbbell'],
  },
  dumbbell_lateral_raise: {
    tags: [],
    defaultWeightInKilos: 7.5,
    id: 'dumbbell_lateral_raise',
    name: 'Dumbbell Lateral Raise',
  },
  band_pass_through : {
    defaultWeightInKilos: 0,
    tags: ['shoulders', 'warm up', 'warmup', 'warm-up'],
    id: 'band_pass_through',
    name: 'Band Pass Through',
  },
  ez_bar_curl : {
    defaultWeightInKilos: 20,
    tags: ['arms', 'bicep', 'biceps', 'curl', 'bar'],
    id: 'ez_bar_curl',
    name: 'EZ Bar Curl',
  },
  butterfly : {
    defaultWeightInKilos: 8,
    tags: ['arms', 'chest', 'machine'],
    id: 'butterfly',
    name: 'Butterfly',
  },
  hanging_leg_raise : {
    defaultWeightInKilos: 0,
    tags: ['core'],
    id: 'hanging_leg_raise',
    name: 'Hanging Leg Raise',
  },
  toe_touches: {
    defaultWeightInKilos: 0,
    tags: ['abs', 'core'],
    id: 'toe_touches',
    name: 'Toe Touches',
  },
  skull_crushers: {
    defaultWeightInKilos: 20,
    tags: [],
    id: 'skull_crushers',
    name: 'Skull Crushers',
  },
  kneeling_right_hip_flexor_stretch: {
    defaultWeightInKilos: 0,
    tags: ['stretch'],
    id: 'kneeling_right_hip_flexor_stretch',
    name: 'Kneeling Right Hip-Flexor Stretch',
  },
  kneeling_left_hip_flexor_stretch: {
    defaultWeightInKilos: 0,
    tags: ['stretch'],
    id: 'kneeling_left_hip_flexor_stretch',
    name: 'Kneeling Left Hip-Flexor Stretch',
  },
  ab_crunch_machine: {
    defaultWeightInKilos: 10,
    tags: [],
    id: 'ab_crunch_machine',
    name: 'Ab Crunch Machine',
  },
  lying_leg_curls: {
    defaultWeightInKilos: 15,
    tags: [],
    id: 'lying_leg_curls',
    name: 'Lying Leg Curls',
  },
  leg_press: {
    defaultWeightInKilos: 60,
    tags: [],
    id: 'leg_press',
    name: 'Leg Press',
  },
  standing_calf_raise: {
    defaultWeightInKilos: 10,
    tags: [],
    id: 'standing_calf_raise',
    name: 'Standing Calf Raise',
  },
  calf_press_on_leg_press: {
    defaultWeightInKilos: 40,
    tags: [],
    id: 'calf_press_on_leg_press',
    name: 'Calf Press on Leg Press',
  },
  deadlift: {
    defaultWeightInKilos: 40,
    tags: ['legs', 'barbell'],
    id: 'deadlift',
    name: 'Deadlift',
  },
  squat: {
    defaultWeightInKilos: 60,
    tags: [],
    id: 'squat',
    name: 'Squat',
  },
  overhead_press: {
    defaultWeightInKilos: 40,
    tags: [],
    id: 'overhead_press',
    name: 'Overhead Press',
  },
  pull_up: {
    defaultWeightInKilos: 0,
    tags: [],
    id: 'pull_up',
    name: 'Pull Up',
  },
  chin_up: {
    defaultWeightInKilos: 0,
    tags: [],
    id: 'chin_up',
    name: 'Chin Up',
  },
  bench_press: {
    defaultWeightInKilos: 60,
    tags: ['chest', 'compound', 'barbell'],
    id: 'bench_press',
    name: 'Bench Press',
  },
  standing_alternate_dumbbell_curl: {
    defaultWeightInKilos: 10,
    tags: [],
    id: 'standing_alternate_dumbbell_curl',
    name: 'Standing Alternate Dumbbell Curl',
  },
  preacher_curl: {
    defaultWeightInKilos: 20,
    tags: [],
    id: 'preacher_curl',
    name: 'Preacher Curl',
  },
  bent_over_row: {
    defaultWeightInKilos: 30,
    tags: [],
    id: 'bent_over_row',
    name: 'Bent-over Row',
  },
  upright_row: {
    defaultWeightInKilos: 10,
    tags: [],
    id: 'upright_row',
    name: 'Upright Row',
  },
  straight_leg_dumbbell_deadlift: {
    defaultWeightInKilos: 12.5,
    tags: [],
    id: 'straight_leg_dumbbell_deadlift',
    name: 'Straight-leg Dumbbell Deadlift',
  },
  dumbbell_overhead_press: {
    defaultWeightInKilos: 10,
    tags: [],
    id: 'dumbbell_overhead_press',
    name: 'Dumbbell Overhead Press',
  },
  sit_ups: {
    defaultWeightInKilos: 0,
    tags: [],
    id: 'sit_ups',
    name: 'Sit Ups',
  },
  star_jumps: {
    defaultWeightInKilos: 0,
    tags: [],
    id: 'star_jumps',
    name: 'Star Jumps',
  },
  right_arm_cross_body_stretch: {
    defaultWeightInKilos: 0,
    tags: ['stretch'],
    id: 'right_arm_cross_body_stretch',
    name: 'Right Arm Cross Body',
  },
  left_arm_cross_body_stretch: {
    defaultWeightInKilos: 0,
    tags: ['stretch'],
    id: 'left_arm_cross_body_stretch',
    name: 'Left Arm Cross Body',
  },
  left_glute_pigeon_pose_stretch: {
    defaultWeightInKilos: 0,
    tags: ['stretch'],
    id: 'left_glute_pigeon_pose_stretch',
    name: 'Left Glute Pigeon Pose',
  },
  right_glute_pigeon_pose_stretch: {
    defaultWeightInKilos: 0,
    tags: ['stretch'],
    id: 'right_glute_pigeon_pose_stretch',
    name: 'Right Glute Pigeon Pose',
  },
  scissor_jumps: {
    defaultWeightInKilos: 0,
    tags: [],
    id: 'scissor_jumps',
    name: 'Scissor Jumps',
  },
  dumbbell_bench_press: {
    defaultWeightInKilos: 20,
    tags: [],
    id: 'dumbbell_bench_press',
    name: 'Dumbbell Bench Press',
  },
  standing_bicep_hammer_curls: {
    defaultWeightInKilos: 12.5,
    tags: [],
    id: 'standing_bicep_hammer_curls',
    name: 'Standing Dumbbell Hammer Curls',
  },
  face_pulls: {
    defaultWeightInKilos: 5,
    tags: [],
    id: 'face_pulls',
    name: 'Face Pulls',
  },
  overhead_band_chest_stretch: {
    defaultWeightInKilos: 0,
    tags: ['stretch'],
    id: 'overhead_band_chest_stretch',
    name: 'Overhead Band Chest Stretch',
  },
  lunges: {
    defaultWeightInKilos: 0,
    tags: [],
    id: 'lunges',
    name: 'Lunges',
  },
  right_leg_hamstring_stretch: {
    defaultWeightInKilos: 0,
    tags: ['stretch'],
    id: 'right_leg_hamstring_stretch',
    name: 'Right Leg Hamstring stretch',
  },
  left_leg_hamstring_stretch: {
    defaultWeightInKilos: 0,
    tags: ['stretch'],
    id: 'left_leg_hamstring_stretch',
    name: 'Left Leg Hamstring stretch',
  },
  concentration_curl: {
    defaultWeightInKilos: 15,
    tags: [],
    id: 'concentration_curl',
    name: 'Concentration Curl',
  },
  push_ups: {
    defaultWeightInKilos: 0,
    tags: [],
    id: 'push_ups',
    name: 'Push Up',
  },
  machine_chest_fly: {
    defaultWeightInKilos: 8,
    tags: [],
    id: 'machine_chest_fly',
    name: 'Machine Chest Fly',
  },
  stationary_bike: {
    defaultWeightInKilos: 0,
    tags: [],
    id: 'stationary_bike',
    name: 'Stationary Bike',
  },
  ring_row: {
    defaultWeightInKilos: 0,
    tags: [],
    id: 'ring_row',
    name: 'Ring Row',
  },
  chest_dips: {
    defaultWeightInKilos: 0,
    tags: ['chest'],
    id: 'chest_dips',
    name: 'Chest Dips',
  },
};

const allIds = Object.keys(byId);

export const stretchExerciseIds = getIdsForStretchExercises(byId, allIds);

export const exercises: Exercises = {
  byId,
  allIds,
  stretchExerciseIds,
};
