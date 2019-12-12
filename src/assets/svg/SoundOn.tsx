import React from 'react';

interface Props {
  style?: any;
}

const SoundOn: React.FC<Props> = ({ style }) => (
  <svg role="img" width={style && style.width || '20'} fill='white' viewBox='0 0 459 459' style={style}>
    <path d="M0,153v153h102l127.5,127.5v-408L102,153H0z M344.25,229.5c0-45.9-25.5-84.15-63.75-102v204
      C318.75,313.65,344.25,275.4,344.25,229.5z M280.5,5.1v53.55C354.45,81.6,408,147.899,408,229.5S354.45,377.4,280.5,400.35V453.9
      C382.5,430.949,459,339.15,459,229.5C459,119.85,382.5,28.049,280.5,5.1z"/>
  </svg>
);

export default SoundOn;
