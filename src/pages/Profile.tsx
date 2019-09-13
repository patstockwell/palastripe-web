import React, {
  CSSProperties, // eslint-disable-line no-unused-vars
} from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';

import { AnimatedSlidingPageStyle } from '../components/SharedStyles';
import BackLinkBanner from '../components/BackLinkBanner';

const AnimatedSlidingPage = styled(animated.div)<{ position?: string }>`
  ${AnimatedSlidingPageStyle}
  min-height: 100vh;
  background-color: white;
`;

interface Props {
  backPath: string;
  animationStyles: CSSProperties;
}

const Profile: React.FC<Props> = ({ backPath, animationStyles }) => {
  return (
    <AnimatedSlidingPage
      position={'fixed'}
      style={{
        top: animationStyles.left,
      }}
    >
      <BackLinkBanner back={{
        link: backPath,
        showArrows: false,
        text: 'Done',
      }}/>
    </AnimatedSlidingPage>
  );
};

export default Profile;
