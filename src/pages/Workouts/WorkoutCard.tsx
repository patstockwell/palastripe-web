import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import {Workout} from '../../reducers/workoutsReducer';
import {gutterWidth, lightGrey2} from '../../helpers/constants';
import {FastClock} from '../../assets/svg/FastClock';
import {calculateWorkoutTime, formatMinutes} from '../../helpers/functions';
import {useScrollPosition} from '../../context/useScrollPosition';
import {LightningBolt} from '../../assets/svg/LightningBolt';
import {State} from '../../helpers/types';
import {onTheFlyWorkoutId} from '../../workoutData/workouts/onTheFly';

const Card = styled.li`
  min-height: 400px;
  border-radius: 24px;
  box-shadow: 0px 4px 36px ${lightGrey2};
  margin: ${gutterWidth * 2}px 0;
  position: relative;
  overflow: hidden;
  list-style: none;
`;

const Description = styled.p`
  color: grey;
`;

const ImageContainerMinHeight = 270;
const ImageContainer = styled.div<{ image?: string }>`
  min-height: ${ImageContainerMinHeight}px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0 ${gutterWidth}px;
  overflow: hidden;
  background-color: black;
  z-index: 0;

  // put the image in an 'after' pseudo element. Set it behind the original
  // element which has opacity giving it the dark filter look
  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position-y: top;
    background-position-x: center;
    opacity: 0.5;
    z-index: -1;
  }
`;

const Name = styled.h3`
  font-size: 1.5em;
`;

const Minutes = styled.p`
  color: white;
  font-weight: 800;
  text-align: center;
  font-size: 1.5em
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: initial;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

export const InProgress = styled.p`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  color: white;
  text-transform: uppercase;
  font-weight: 800;
  top: 0;
  margin: ${gutterWidth}px;
  font-style: italic;
`;

const CardDetails = styled.div`
  padding: 0 ${gutterWidth}px ${gutterWidth}px;
`;

interface Props {
  workout: Workout;
}

export const WorkoutCard: React.FC<Props> = ({workout}) => {
  const {
    id,
    startTime,
  } = useSelector((state: State) => state.activeWorkout) || {};
  const {setWorkoutPageScrollPosition} = useScrollPosition();

  return (
    <Card>
      <ImageContainer image={workout.imageUrl}>
        <Minutes>{formatMinutes(calculateWorkoutTime(workout))}</Minutes>
      </ImageContainer>
      <CardDetails>
        {startTime && id === workout.id && (
          <InProgress>
            <FastClock style={{
              fill: 'white',
              marginRight: '4px',
              height: '16px',
            }}/>
            In progress...
          </InProgress>
        )}
        <StyledLink
          onClick={() => setWorkoutPageScrollPosition()}
          to={`/workouts/${workout.id}/`}
        >
          <Name>{workout.name}</Name>
        </StyledLink>
        <Description>{workout.description}</Description>
      </CardDetails>
    </Card>
  );
};

const BlockTitle = styled.h3`
  color: white;
  font-size: 2em;
  text-transform: uppercase;
  max-width: 150px;
`;

const CardDark = styled(Card)`
  background-color: black;
  color: white;
  min-height: ${ImageContainerMinHeight}px;
`;

const DescriptionDark = styled.p`
  color: white;
  padding-bottom: ${gutterWidth}px;
`;

export const OnTheFlyWorkoutCard: React.FC<Props> = ({workout}) => {
  const {
    id,
    startTime,
  } = useSelector((state: State) => state.activeWorkout) || {};

  return (
    <CardDark>
      <ImageContainer image={workout.imageUrl}>
        <LightningBolt style={{
          backgroundColor: 'white',
          fill: 'black',
          borderRadius: '50%',
          padding: '4px',
          position: 'absolute',
          left: '16px',
          top: '16px',
        }}/>
        <StyledLink to={`/workouts/${onTheFlyWorkoutId}/`}>
          <BlockTitle>
            {workout.name}
          </BlockTitle>
        </StyledLink>
        {startTime && id === onTheFlyWorkoutId && (
          <InProgress>
            <FastClock style={{
              fill: 'white',
              marginRight: '4px',
              height: '16px',
            }}/>
            In progress...
          </InProgress>
        )}
        <DescriptionDark>{workout.description}</DescriptionDark>
      </ImageContainer>
    </CardDark>
  );
};
