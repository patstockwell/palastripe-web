const initialState = {
  history: [
    {
      workoutName: 'Arms Routine',
      date: new Date(1543933984145),
      data: [
        {
          name: 'Chinups',
          weightInKilos: 0,
          sets: [5, 5, 5, 5],
        },
        {
          name: 'Bench Press',
          weightInKilos: 12,
          sets: [8, 8, 8, 8],
        },
        {
          name: 'Bicep Curl',
          weightInKilos: 12,
          sets: [8, 8, 8, 8],
        },
      ],
    },
    {
      workoutName: 'Leg Burn',
      date: new Date(1543993984145),
      data: [
        {
          name: 'Deadlift',
          weightInKilos: 80,
          sets: [7, 7, 7, 7],
        },
        {
          name: 'Squat',
          weightInKilos: 50,
          sets: [7, 7, 7, 7],
        },
        {
          name: 'Overhead Press',
          weightInKilos: 50,
          sets: [7, 7, 7, 7],
        },
      ],
    },
    {
      workoutName: 'Arms Routine',
      date: new Date(1542933984145),
      data: [
        {
          name: 'Chinups',
          weightInKilos: 0,
          sets: [5, 5, 5, 5],
        },
        {
          name: 'Bench Press',
          weightInKilos: 12,
          sets: [8, 8, 8, 8],
        },
        {
          name: 'Bicep Curl',
          weightInKilos: 12,
          sets: [8, 8, 8, 8],
        },
      ],
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case 'SOMETHING':
    return state;
  default:
    return state;
  }
};
