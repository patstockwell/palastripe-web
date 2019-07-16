import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';

import ActivityListHeading from './ActivityListHeading';
import ActivityTile from '../ActivityTile';
import {
  State, // eslint-disable-line no-unused-vars
  Workout,  // eslint-disable-line no-unused-vars
  WorkoutActivityGroup,  // eslint-disable-line no-unused-vars
} from '../../helpers/types';
import { unorderedListStyle } from '../SharedStyles';
import { bannerHeight } from '../../helpers/constants';

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
        key={uuidv4()}
        groupId={g.id}
        index={i}
        activity={e}
        editable
      />
    ));

    return (
      <ActivityListHeading
        key={g.id}
        stickyTop={bannerHeight}
        heading={g.name}
        id={g.id}
        activityTotal={tiles.length}
        editable
      >
        <Ul>{tiles}</Ul>
      </ActivityListHeading>
    );
  });

  return (
    <Ul>
      {exerciseGroupTiles}
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
