import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { State } from '../helpers/types';
import Banner from '../components/Banner';
import GoldCup from '../assets/svg/GoldCup';
import { workoutTitleStyle, buttonStyle } from '../components/SharedStyles';
import { bannerHeight } from '../helpers/constants';
import { Link } from 'react-router-dom';

const Page = styled.div`
  text-align: center;
  padding: 24px 12px;

  & svg {
    margin: 12px 0;
  }
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

const Button = styled(Link)`
  ${buttonStyle}
  margin: 40px auto;
  display: block;
  max-width: 300px;
`;

const GreatJob = styled.p`
  font-weight: 600;
  margin: 12px 0;
`;

const Completed = styled.p`
  color: grey;
  margin: 12px 0;
`;

export const WorkoutCompletionSplash: React.FC = () => {
  // take the most recent workout from history
  const workoutName = useSelector((state: State) => state.history[0].name);
  const firstName = useSelector((state: State) => state.profile.firstName);

  return (
    <>
      <Banner heading="Workout Summary" />
      <Hr />
      <Page>
        <GreatJob>Great Job{firstName && `, ${firstName}`}!</GreatJob>
        <Completed>You just completed</Completed>
        <Title>{workoutName}</Title>
        <GoldCup height="80px" />
        <p>Workout done! Get some nutritious food and take a well earned rest.</p>
        <Button to="/activity/">Continue</Button>
      </Page>
    </>
  );
};
