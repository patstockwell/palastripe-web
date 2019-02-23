const initialState = {
  settings: {
    planId: 'plan1',
    useKilos: true,
  },

  activeWorkout: {
    workoutId: 'workout1',
    name: 'Push',
    onGoing: false,
    exercises: {
      'exercise1': {
        id: 'exercise1',
        name: 'Dead Lift',
        weightInKilos: 137.5,
        sets:[
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
        ],
      },
      'exercise2': {
        id: 'exercise2',
        name: 'Squat',
        weightInKilos: 60,
        sets:[
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
        ],
      },
      'exercise3': {
        id: 'exercise3',
        name: 'Overhead Press',
        weightInKilos: 40,
        sets:[
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
          { max: 5, completed: undefined },
        ],
      },
    },
    order: ['exercise1', 'exercise2', 'exercise3'],
  },

  entities: {
    exercises: {
      byId: {
        'exercise1': {
          id: 'exercise1',
          name: 'Dead Lift',
          weightInKilos: 137.5,
          sets: [5, 5, 5, 5, 5],
        },
        'exercise2': {
          id: 'exercise2',
          name: 'Squat',
          weightInKilos: 60,
          sets: [5, 5, 5, 5],
        },
        'exercise3': {
          id: 'exercise3',
          name: 'Overhead Press',
          weightInKilos: 40,
          sets: [5, 5, 5, 5],
        },
        'exercise4': {
          id: 'exercise4',
          name: 'Chin-up',
          weightInKilos: 0,
          sets: [5, 5, 5, 5, 5],
        },
        'exercise5': {
          id: 'exercise5',
          name: 'Bench Press',
          weightInKilos: 60,
          sets: [5, 5, 5, 5, 5],
        },
        'exercise6': {
          id: 'exercise6',
          name: 'Bicep Curl',
          weightInKilos: 30,
          sets: [12, 12, 12, 12, 12],
        },
        'exercise7': {
          id: 'exercise7',
          name: 'Row',
          weightInKilos: 40,
          sets: [5, 5, 5, 5],
        },
      },
      allIds: [
        'exercise1',
        'exercise2',
        'exercise3',
        'exercise4',
        'exercise5',
        'exercise6',
        'exercise7',
      ],
    },

    workouts: {
      byId: {
        'workout1': {
          id: 'workout1',
          name: 'Pull',
          exercises: ['exercise1', 'exercise4', 'exercise6'],
        },
        'workout2': {
          id: 'workout2',
          name: 'Push',
          exercises: ['exercise2', 'exercise3', 'exercise5'],
        },
        'workout3': {
          id: 'workout3',
          name: 'Workout C',
          exercises: ['exercise1', 'exercise5', 'exercise7'],
        },
        'workout4': {
          id: 'workout4',
          name: 'Workout D',
          exercises: ['exercise1', 'exercise5', 'exercise7'],
        },
      },
      allIds: ['workout1', 'workout2', 'workout3', 'workout4']
    },

    workoutPlans: {
      byId: {
        'plan1': {
          id: 'plan1',
          name: 'Harder, better, faster, fitter',
          workouts: ['workout1', 'workout2', 'workout3'],
        },
        'plan2': {
          id: 'plan2',
          name: 'Power',
          workouts: ['workout3', 'workout4'],
        },
      },
      allIds: ['plan1', 'plan2'],
    },
  },

  history: [],
};

export default initialState;

