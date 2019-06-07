import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  superLightGrey,
  tileMinHeight,
  WORKOUTS,
  SET_WINDOW_SCROLL,
} from '../helpers/constants';
import { calculateWorkoutTime, formatMinutes } from '../helpers/functions';

const Tile = styled.section`
  height: ${tileMinHeight}px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${superLightGrey};
`;

const Square = styled.div`
  height: 70px
  width: 70px
  margin: 10px;
  background-color: black;
  flex-shrink: 0;
  position: relative;
  z-index: -2;
  display: flex;
  align-items: center;
  justify-content: center;

  // put the image in an 'after' pseudo element. Set it behind the original
  // element which has opacity giving it the dark filter look
  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ image }) => image});
    background-size: cover;
    opacity: 0.5;
    z-index: -1;
  }
`;

const Name = styled.h3`
  font-size: 14px;
  font-weight: 400;
`;

const Minutes = styled.p`
  color: white;
  font-weight: 800;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: initial;
`;

interface Props {
  workout: Workout;
  setWindowScroll: (number) => ReduxAction<{ scrollY: number, page: string }>;
  scrollY: number;
}

const WorkoutTile = ({ setWindowScroll, scrollY = 0, workout }: Props) => {
  useEffect(() => {
    window.scrollTo(0, scrollY);
  });

  const handleClick = () => {
    setWindowScroll(window.scrollY);
  };

  return (
    <StyledLink
      onClick={handleClick}
      to={{
        pathname: `/workouts/${workout.id}/`,
        state: { immediate: false },
      }}
    >
      <Tile>
        <Square image={workout.imageUrl}>
          <Minutes>{formatMinutes(calculateWorkoutTime(workout))}</Minutes>
        </Square>
        <div>
          <Name>
            {workout.name}
          </Name>
        </div>
      </Tile>
    </StyledLink>
  );
};

const mapStateToProps = ({ scrollY: { WORKOUTS } }) => ({
  scrollY: WORKOUTS,
});

const mapDispatchToProps = {
  setWindowScroll: (scrollY: number): ReduxAction<{
    scrollY: number,
    page: string,
  }> => ({
    type: SET_WINDOW_SCROLL,
    payload: {
      scrollY,
      page: WORKOUTS,
    },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutTile);
