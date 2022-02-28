import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Routes, Route, BrowserRouter as Router, useParams} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {State} from '../helpers/types';
import {Workouts, Workout} from '../reducers/workoutsReducer';

const MetaTags: React.FC<StateProps> = ({workouts, activeWorkout}) => {
  // get the workout ID from the URL
  const {id: workoutId} = useParams();
  const {name = '', imageUrl, id} = activeWorkout || workouts.byId[workoutId] || {};


  return (
    <Router>
      <Routes>
        <Route
          path="/workouts/:id/"
          element={<WorkoutHeadTags name={name} id={id} imageUrl={imageUrl} />}
        />
        <Route
          path="/workouts/"
          element={<WorkoutHomeHeadTags />}
        />
      </Routes>
    </Router>
  );
};

const WorkoutHomeHeadTags = () => (
  <Helmet>
    <title>Palastripe</title>
    <meta property="og:title" content="Get fit and strong. Get a gym plan. Use palastripe." />
    <meta property="og:url" content="https://palastripe.com" />
    <meta property="og:image" content="og-image.jpg" />
    <meta name="twitter:image" content="og-image.jpg" />
    <meta name="twitter:url" content="https://palastripe.com" />
    <meta name="twitter:title" content="Get fit and strong. Get a gym plan. Use palastripe." />
  </Helmet>
);

interface WorkoutHeadTagsProps {
  imageUrl: string;
  id: string;
  name: string;
}
const WorkoutHeadTags: React.FC<WorkoutHeadTagsProps> = ({
  imageUrl,
  id,
  name,
}) => (
  <Helmet>
    {/*
    Use these when/if a workout gets a description
    <meta property="og:description" content={workout.description} />
    <meta name="twitter:description" content={workout.description} />
    */}
    <title>Palastripe Workout - {name}</title>
    <meta property="og:title" content={`Palastripe Workout - ${name}`}/>
    <meta property="og:image" content={imageUrl}/>
    <meta property="og:url" content={`https://palastripe.com/${id}`} />
    <meta name="twitter:url" content={`https://palastripe.com/${id}`} />
    <meta name="twitter:title" content={`Palastripe Workout - ${name}`} />
    <meta name="twitter:image" content={imageUrl}/>
  </Helmet>
);

interface StateProps {
  activeWorkout: Workout;
  workouts: Workouts;
}

const mapStateToProps = (state: State): StateProps => ({
  activeWorkout: state.activeWorkout,
  workouts: state.workouts,
});

export default connect<StateProps, void, RouteProps>(
  mapStateToProps,
  null
)(MetaTags);
