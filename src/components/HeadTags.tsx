import React from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {State} from '../helpers/types';
import {Workouts, Workout} from '../reducers/workoutsReducer';

const MetaTags: React.FC<StateProps> = ({workouts, activeWorkout}) => {

  return (
    <Router>
      <Route path="/workouts/:id/" render={props => {
        // get the workout ID from the URL
        const {id: workoutId}: { id: string } = props.match.params;
        const {name, imageUrl, id} = activeWorkout || workouts.byId[workoutId] || {};

        return (
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
      }}/>
      <Route path="/workouts/" exact render={() => (
        <Helmet>
          <title>Palastripe</title>
          <meta property="og:title" content="Get fit and strong. Get a gym plan. Use palastripe." />
          <meta property="og:url" content="https://palastripe.com" />
          <meta property="og:image" content="og-image.jpg" />
          <meta name="twitter:image" content="og-image.jpg" />
          <meta name="twitter:url" content="https://palastripe.com" />
          <meta name="twitter:title" content="Get fit and strong. Get a gym plan. Use palastripe." />
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
