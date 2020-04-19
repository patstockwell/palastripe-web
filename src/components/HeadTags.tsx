import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';
import { State, Workouts } from '../helpers/types';
import { Workout } from '../reducers/workoutsReducer';

const MetaTags: React.FC<StateProps> = ({ workouts, activeWorkout }) => {

  return (
    <Router>
      <Route path="/workouts/:id/" render={({ match }) => {
        // get the workout ID from the URL
        const { id: workoutId }: { id: string } = match.params;
        const workout = activeWorkout || workouts.byId[workoutId];

        return (
          <Helmet>
            {/*
            Use these when/if a workout gets a description
            <meta property="og:description" content={workout.description} />
            <meta name="twitter:description" content={workout.description} />
            */}
            <title>HBFF Workout - {workout.name}</title>
            <meta property="og:title" content={`HBFF Workout - ${workout.name}`}/>
            <meta property="og:image" content={workout.imageUrl}/>
            <meta property="og:url" content={`https://harderbetterfasterfitter.com/${workout.id}/`} />
            <meta name="twitter:url" content={`https://harderbetterfasterfitter.com/${workout.id}/`} />
            <meta name="twitter:title" content={`HBFF Workout - ${workout.name}`} />
            <meta name="twitter:image" content={workout.imageUrl}/>
          </Helmet>
        );
      }}/>
      <Route path="/workouts/" exact render={() => (
        <Helmet>
          <title>Harder Better Faster Fitter</title>
          <meta property="og:title" content="Get fit and strong. Get a gym plan. Use Harder Better Faster Fitter" />
          <meta property="og:url" content="https://harderbetterfasterfitter.com" />
          <meta property="og:image" content="og-image.jpg" />
          <meta name="twitter:image" content="og-image.jpg" />
          <meta name="twitter:url" content="https://harderbetterfasterfitter.com" />
          <meta name="twitter:title" content="Get fit and strong. Get a gym plan. Use Harder Better Faster Fitter" />
        </Helmet>
      )}/>
    </Router>
  );
};

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
