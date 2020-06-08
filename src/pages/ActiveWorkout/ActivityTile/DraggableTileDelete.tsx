import React, {useState} from 'react';
import styled from 'styled-components';
import { orange } from '../../../helpers/constants';
import AlertConfirm from '../../../components/AlertConfirm';
import { buttonStyle } from '../../../components/SharedStyles';
import { useActiveWorkout } from '../../../reducers/activeWorkoutReducer';

const deleteButtonWidth = 100;

const ConfirmButton = styled.button<{ background?: string }>`
  ${buttonStyle}
`;

const DeleteButton = styled.button`
  height: 100%;
  position: absolute;
  right: -${deleteButtonWidth}px;
  top: 0;
  background-color: ${orange}
  width: ${deleteButtonWidth}px;
  border: none;
  scroll-snap-align: end;
`;

const ScrollSnapWrapper = styled.div`
  scroll-snap-align: start;
`;

const SlidingLayer = styled.div`
  position: relative;
  overflow: scroll;
  scrollbar-width: none; // This only works in Firefox.
  scroll-snap-type: x proximity;

  // non standard css. Not supported in all browsers.
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface Props {
  id: string;
  disable: boolean;
}

// TODO: Ensure that only one tray is open at a time.
export const DraggableTileDelete: React.FC<Props> = ({ disable, id, children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const { deleteActivity } = useActiveWorkout();

  return (
    <>
      {disable ? (
        <>{children}</>
      ) : (
        <>
          <SlidingLayer>
            <ScrollSnapWrapper>
              {children}
            </ScrollSnapWrapper>
            <DeleteButton onClick={() => setShowAlert(true)}>
              Delete
            </DeleteButton>
          </SlidingLayer>
          <AlertConfirm
            showAlert={showAlert}
            message={'Delete this activity?'}
            cancelAlert={() => setShowAlert(false)}
          >
            <ConfirmButton onClick={() => setShowAlert(false)} background={'grey'}>
              No
            </ConfirmButton>
            <ConfirmButton onClick={() => deleteActivity(id)}>Yes</ConfirmButton>
          </AlertConfirm>
        </>
      )}
    </>
  );
};
