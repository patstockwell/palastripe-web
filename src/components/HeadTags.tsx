import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import {
  RouteProps, // eslint-disable-line no-unused-vars
} from 'react-router-dom';
import {
  Entities, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';

const MetaTags: React.FC<StateProps> = ({ entities, activeWorkout }) => {

  return (
    <Router>
      <Route path="/workouts/:id/" render={({ match }) => {
        // get the workout ID from the URL
        const { id: workoutId }: { id: string } = match.params;
        const workout = activeWorkout || entities.workouts.byId[workoutId];

        return (
          <Helmet>
            {/* need to declare these outside of the animation. how? */}
            {/*
            Use these when/if a workout gets a description
            <meta property="og:description" content={workout.description} />
            <meta name="twitter:description" content={workout.description} />
            */}
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
          <meta property="og:title" content="Get fit and strong. Get a gym plan. Use Harder Better Faster Fitter" />
          <meta property="og:url" content="https://harderbetterfasterfitter.com" />
          <meta property="og:image" content="/og-image.jpg" />
          <meta name="twitter:image" content="/og-image.jpg" />
          <meta name="twitter:url" content="https://harderbetterfasterfitter.com" />
          <meta name="twitter:title" content="Get fit and strong. Get a gym plan. Use Harder Better Faster Fitter" />
        </Helmet>
      )}/>
    </Router>
  );
};

interface StateProps {
  activeWorkout: Workout;
  entities: Entities;
}

const mapStateToProps = (state: State): StateProps => ({
  activeWorkout: state.activeWorkout,
  entities: state.entities,
});

export default connect<StateProps, void, RouteProps>(
  mapStateToProps,
  null
)(MetaTags);