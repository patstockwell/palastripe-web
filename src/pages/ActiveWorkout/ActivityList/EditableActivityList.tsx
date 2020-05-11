import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { ActivityListHeading } from './ActivityListHeading';
import { ActivityTile } from '../ActivityTile';
import { State } from '../../../helpers/types';
import { Workout, ActivityGroup } from '../../../reducers/workoutsReducer';
import { unorderedListStyle } from '../../../components/SharedStyles';
import { bannerHeight } from '../../../helpers/constants';

const Ul = styled.ul`
  ${unorderedListStyle}
`;

type Props = StateProps;

const EditableActivityList: React.FC<Props> = ({
  editableWorkout: { exerciseGroups },
}) => {
  const exerciseGroupTiles = exerciseGroups.map((g: ActivityGroup) => {
    const tiles = g.exercises.map((e, i) => (
      <ActivityTile
        key={uuidv4()}
        groupId={g.id}
        index={i}
        activity={e}
      />
    ));

    return (
      <ActivityListHeading
        key={g.id}
        stickyTop={bannerHeight}
        heading={g.name}
        id={g.id}
        activityTotal={tiles.length}
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

export default connect<StateProps, {}, {}>(
  mapStateToProps,
  null
)(EditableActivityList);
