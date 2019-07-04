import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ActivityListHeading from './ActivityListHeading';
import ActivityTile from '../ActivityTile';
import {
  State, // eslint-disable-line no-unused-vars
  Workout,  // eslint-disable-line no-unused-vars
  WorkoutActivityGroup,  // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { unorderedListStyle } from '../SharedStyles';
import {
  activityHeadingHeight,
  bannerHeight,
} from '../../helpers/constants';

const BottomEmptySpace = styled.div`
  height: calc(100vh - ${activityHeadingHeight + bannerHeight}px);
`;

const Ul = styled.ul`
  ${unorderedListStyle}
`;

type Props = StateProps;

const EditableActivityList: React.FC<Props> = ({
  editableWorkout: { exerciseGroups },
}) => {
  const exerciseGroupTiles = exerciseGroups.map((g: WorkoutActivityGroup) => {
    const tiles = g.exercises.map((e, i) => (
      <ActivityTile
        key={e.id}
        groupId={g.id}
        index={i}
        handleSelect={() => {console.log('clicked')}}
        selectable={false}
        activity={e}
      />
    ));

    return (
      <ActivityListHeading
        key={g.id}
        stickyTop={bannerHeight}
        heading={g.name}
        activityTotal={tiles.length}
      >
        <Ul>{tiles}</Ul>
      </ActivityListHeading>
    );
  });

  return (
    <Ul>
      {exerciseGroupTiles}

      <BottomEmptySpace />
    </Ul>
  );
};

interface StateProps {
  editableWorkout: Workout;
}

const mapStateToProps = ({ editableWorkout }: State): StateProps => ({
  editableWorkout,
});

export default connect<StateProps, void, void>(
  mapStateToProps,
  null
)(EditableActivityList);
