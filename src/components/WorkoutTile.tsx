import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { opaqueImageInAfter } from './SharedStyles';
import {
  ReduxAction, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import {
  gutterWidth,
  superLightGrey,
  tileMinHeight,
  WORKOUTS_PAGE,
  SET_WINDOW_SCROLL,
} from '../helpers/constants';
import { calculateWorkoutTime, formatMinutes } from '../helpers/functions';

const Tile = styled.section`
  height: ${tileMinHeight}px;
  padding: 0 ${gutterWidth}px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${superLightGrey};
  overflow: hidden;
`;

const Square = styled.div<{ image: string }>`
  height: 70px
  width: 70px
  background-color: black;
  flex-shrink: 0;
  position: relative;
  z-index: -2;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;

  // put the image in an 'after' pseudo element. Set it behind the original
  // element which has opacity giving it the dark filter look
  &::after {
    ${opaqueImageInAfter};
  }
`;

const Name = styled.h3`
  font-size: 16px;
  font-weight: 400;
  margin-left: 10px;
`;

const Minutes = styled.p`
  color: white;
  font-weight: 800;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: initial;
`;

interface OwnProps {
  workout: Workout;
}

type Props = OwnProps & StateProps & DispatchProps;

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
        <Name>
          {workout.name}
        </Name>
      </Tile>
    </StyledLink>
  );
};

interface StateProps {
  scrollY: number;
}

const mapStateToProps = (state: State): StateProps => ({
  scrollY: state.scrollY.WORKOUTS_PAGE,
});

interface DispatchProps {
  setWindowScroll: (scrollY: number) => ReduxAction<{
    scrollY: number,
    page: string,
  }>;
}

const mapDispatchToProps: DispatchProps = {
  setWindowScroll: scrollY => ({
    type: SET_WINDOW_SCROLL,
    payload: {
      scrollY,
      page: WORKOUTS_PAGE,
    },
  }),
};

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutTile);
