import React from 'react';
import { BackLinkBanner } from '../components/BackLinkBanner';

export const CustomWorkout: React.FC = () => {

  return (
    <>
      <BackLinkBanner
        sticky={false}
        back={{
          showArrows: true,
          link: '/workouts/',
        }}
      />
      <div>Custom workout</div>
    </>
  );
};
