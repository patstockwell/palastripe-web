import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ActivityTile from '../ActivityTile';
import ColouredDot from '../../../assets/svg/ColouredDot';
import ActivityListHeading from './ActivityListHeading';
import {
  activityHeadingHeight,
  orange,
  tileMinHeight,
  SET_SELECTED_EXERCISE,
} from '../../../helpers/constants';
import {
  Activity, // eslint-disable-line no-unused-vars
  ReduxAction, // eslint-disable-line no-unused-vars
  SelectedExercise, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workout,  // eslint-disable-line no-unused-vars
} from '../../../helpers/types';
import { buttonStyle, unorderedListStyle } from '../../../components/SharedStyles';

const Ul = styled.ul`
  ${unorderedListStyle}
`;

const Button = styled.button`
  ${buttonStyle}
  background-color: black;

  & svg {
    transform: translateX(-8px);
  }
`;

const FlexTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${tileMinHeight}px;
`;

const BottomEmptySpace = styled.div<{ stickyTop?: number}>`
  // height: calc(100vh - ${({ stickyTop = 0 }) => activityHeadingHeight + (2 * tileMinHeight) + stickyTop}px);
  height: ${tileMinHeight}px;
`;

interface OwnProps {
  workout: Workout;
  finishWorkoutClickHandler?: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

const ActivityList: React.FC<Props> = ({
  finishWorkoutClickHandler,
  workout: { exerciseGroups },
  selected,
  setSelected,
}) => {
  const [ showHiddenArea, setShowHiddenArea ] = useState(true);

  const createTile = (id: string) => (a: Activity, i: number) => {
    const isSelected = selected.groupId === id && selected.index === i;

    return (
      <ActivityTile
        selected={isSelected}
        showHiddenArea={isSelected && showHiddenArea}
        groupId={id}
        index={i}
        key={i}
        activity={a}
        handleSelect={() => {
          if (!isSelected) {
            setSelected({ groupId: id, index: i });
          }
        }}
        toggleShowHiddenArea={() => {
          if (isSelected) {
            setShowHiddenArea(!showHiddenArea);
          }
        }}
      />
    );
  };

  const activityListTiles = exerciseGroups.map(group => {
    const tiles = group.exercises.map(createTile(group.id));
    const completedActivities = group.exercises.filter(e => e.completed);

    return (
      <ActivityListHeading
        key={group.id}
        heading={group.name}
        activityTotal={tiles.length}
        completedActivities={completedActivities.length}
      >
        <Ul>{tiles}</Ul>
      </ActivityListHeading>
    );
  });

  return (
    <Ul>
      {activityListTiles}

      <FlexTile>
        <Button onClick={finishWorkoutClickHandler}>
          <ColouredDot fill={orange} />
          Finish Workout
        </Button>
      </FlexTile>

      <BottomEmptySpace />
    </Ul>
  );
};

interface DispatchProps {
  setSelected: ({ groupId, index }: SelectedExercise) => (
    ReduxAction<SelectedExercise>);
}

const mapDispatchToProps: DispatchProps = {
  setSelected: ({ index, groupId }) => ({
    type: SET_SELECTED_EXERCISE,
    payload: { groupId, index },
  }),
};

interface StateProps {
  selected: SelectedExercise;
}

const mapStateToProps = (state: State): StateProps => ({
  selected: state.activeWorkoutSelectedExercise,
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ActivityList);
