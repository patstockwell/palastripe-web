import React from 'react';

interface Props {
  style?: React.CSSProperties;
}

export const FastClock: React.FC<Props> = ({ style }) => (
  <svg role="img" style={style} width="20" height="20" viewBox="0 0 511.63 511.631">
    <rect x="27.689" y="181" width="58.8" height="30"/>
    <rect x="27.689" y="301" width="58.8" height="30"/>
    <rect y="241" width="86.49" height="30"/>
    <path d="M314.245,58.245C205.028,58.245,116.49,146.783,116.49,256s88.538,197.755,197.755,197.755S512,365.217,512,256
      S423.462,58.245,314.245,58.245z M376.609,337.216l-83.115-56.641v-121.36h30v105.5l70.01,47.709L376.609,337.216z"/>
  </svg>
);
