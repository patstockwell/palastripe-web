import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { State, Workout } from '../helpers/types';
import BackLinkBanner from '../components/BackLinkBanner';
import GoldCup from '../assets/svg/GoldCup';
import { workoutTitleStyle } from '../components/SharedStyles';
import { bannerHeight } from '../helpers/constants';

const Page = styled.div`
  text-align: center;
  padding: 24px 12px;
`;

const Hr = styled.hr`
  border: none;
  border-top: solid 0.5px lightgrey;
  position: sticky;
  top: ${bannerHeight}px;
  margin: 0;
`;

const Title = styled.p`
  ${workoutTitleStyle};
`;

const WorkoutSummary: React.FC<StateProps> = ({ firstName, workout }) => {
  const { name: workoutName } = workout;
  console.log(firstName);

  return (
    <>
      <BackLinkBanner heading="Workout Summary" />
      <Hr />
      <Page>
        <p>Great Job{firstName && `, ${firstName}`}!</p>
        <p>You just completed</p>
        <Title>{workoutName}</Title>
        <GoldCup height="80px" />
        <p>Workout done! Get some nutritious food and take a well earned rest.</p>
      </Page>
    </>
  );
};

interface StateProps {
  workout: Workout;
  firstName: string;
}

const mapStateToProps = (state: State): StateProps => ({
  // take the most recent workout from history
  workout: state.history[0],
  firstName: state.profile.firstName,
});

export default connect<StateProps, void, void>(
  mapStateToProps
)(WorkoutSummary);
