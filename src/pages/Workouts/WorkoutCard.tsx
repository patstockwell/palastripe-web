import React from 'react';
import {format} from 'date-fns';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector} from 'react-redux';

import {Time} from '../ActiveWorkout/WorkoutHero';
import {StopWatch} from '../../assets/svg/StopWatch';
import {Workout} from '../../reducers/workoutsReducer';
import {gutterWidth, lightGrey1} from '../../helpers/constants';
import {FastClock} from '../../assets/svg/FastClock';
import {calculateWorkoutTime, formatMinutes} from '../../helpers/functions';
import {useScrollPosition} from '../../context/useScrollPosition';
import {LightningBolt} from '../../assets/svg/LightningBolt';
import {State} from '../../helpers/types';
import {onTheFlyWorkoutId} from '../../workoutData/workouts/onTheFly';

const Card = styled.li`
  min-height: 400px;
  border-radius: 24px;
  box-shadow: 0px 4px 36px ${lightGrey1};
  margin: ${gutterWidth * 2}px 0;
  position: relative;
  overflow: hidden;
  list-style: none;
`;

const Description = styled.p`
  color: grey;
  margin-bottom: 4px;
  margin-top: 10px;
`;

const ImageContainerMinHeight = 270;
const ImageContainer = styled.div<{ image?: string }>`
  min-height: ${ImageContainerMinHeight}px;
  position: relative;
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
  margin: 0;
  margin-bottom: 0.5em;
`;

const Minutes = styled.p`
  color: white;
  font-weight: 800;
  font-size: 1.5em
  position: absolute;
  bottom: 0px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

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
  padding: ${gutterWidth}px ${gutterWidth}px;
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
        <Name>
          <StyledLink
            onClick={() => setWorkoutPageScrollPosition()}
            to={`/workouts/${workout.id}/`}
          >
            {workout.name}
          </StyledLink>
        </Name>
        <Description>{workout.description}</Description>
      </CardDetails>
    </Card>
  );
};

const BlockTitleDark = styled.h3`
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
  const {setWorkoutPageScrollPosition} = useScrollPosition();

  return (
    <CardDark>
      <ImageContainer image={workout.imageUrl}>
        <LightningBolt style={{
          backgroundColor: 'white',
          fill: 'black',
          borderRadius: '50%',
          padding: '4px',
          display: 'block',
          marginTop: `${gutterWidth}px`,
        }}/>
        <BlockTitleDark>
          <StyledLink
            to={`/workouts/${onTheFlyWorkoutId}/`}
            onClick={() => setWorkoutPageScrollPosition()}
          >
            {workout.name}
          </StyledLink>
        </BlockTitleDark>
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

const smallCardHeight = 100;

const CardSmall = styled(Card)`
  min-height: ${smallCardHeight}px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const ImageContainerLight = styled(ImageContainer)`
  background-color: grey;
  min-height: ${smallCardHeight}px;
  padding: ${gutterWidth}px;
  box-sizing: border-box;
  flex-basis: 100px;
  flex-shrink: 0;
`;

const ProgressTime = styled(Time)`
  color: black;
  margin: 0;
`;

export const InProgressCard: React.FC<{ workout: Workout }> = ({workout}) => {
  const {setWorkoutPageScrollPosition} = useScrollPosition();

  return (
    <CardSmall>
      <ImageContainerLight image={workout.imageUrl}>
      </ImageContainerLight>
      <CardDetails>
        <Name>
          <StyledLink
            to={`/workouts/${workout.id}/`}
            onClick={() => setWorkoutPageScrollPosition()}
          >
            {workout.name}
          </StyledLink>
        </Name>
        <ProgressTime>
          <StopWatch style={{ fill: 'black', marginRight: '8px' }}/>
          {format(new Date(workout.startTime), 'p')}
        </ProgressTime>
        <Description>Continue where you left off.</Description>
      </CardDetails>
    </CardSmall>
  );
};
