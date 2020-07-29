import React, {useState} from 'react';
import styled from 'styled-components';
import { orange } from '../../../helpers/constants';
import { ConfirmButton, MessageText, AlertConfirm } from '../../../components/AlertConfirm';
import { useActiveWorkout } from '../../../reducers/activeWorkoutReducer';

const deleteButtonWidth = 100;

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
  background-color: transparent;
  background-image: linear-gradient(90deg, transparent 50%, ${orange} 50%);

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
            cancelAlert={() => setShowAlert(false)}
          >
            <MessageText>Delete this activity?</MessageText>
            <ConfirmButton onClick={() => deleteActivity(id)}>Yes</ConfirmButton>
            <ConfirmButton onClick={() => setShowAlert(false)} background={'darkgrey'}>
              No
            </ConfirmButton>
          </AlertConfirm>
        </>
      )}
    </>
  );
};
