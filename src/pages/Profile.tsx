import React, {
  useState,
  CSSProperties, // eslint-disable-line no-unused-vars
} from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';

import SettingUnitOfMeasurement from '../components/SettingUnitOfMeasurement';
import ProfileName from '../components/ProfileName';
import { AnimatedSlidingPageStyle } from '../components/SharedStyles';
import BackLinkBanner from '../components/BackLinkBanner';

const AnimatedSlidingPage = styled(animated.div)<{ position?: string }>`
  ${AnimatedSlidingPageStyle}
  min-height: 100vh;
  background-color: lightgrey;
`;

const Panel = styled.div`
  background-color: white;
  margin-bottom: 8px;
  padding: 12px;
  position: relative;
`;

interface Props {
  atRest: boolean;
  backPath: string;
  animationStyles: CSSProperties;
}

const Profile: React.FC<Props> = ({ atRest, backPath, animationStyles }) => {
  const [exiting, setExiting] = useState(false);
  const position = atRest && !exiting
    ? 'relative'
    : 'fixed';

  return (
    <AnimatedSlidingPage
      position={position}
      style={{
        top: animationStyles.left,
      }}
    >
      <BackLinkBanner back={{
        link: backPath || '/',
        showArrows: false,
        text: 'Done',
        handleClick: () => setExiting(true),
      }}/>
      <Panel>
        <ProfileName />
      </Panel>
      <Panel>
        <SettingUnitOfMeasurement />
      </Panel>
    </AnimatedSlidingPage>
  );
};

export default Profile;
