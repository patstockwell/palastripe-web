import React from 'react';
import PropTypes from 'prop-types';

// https://www.flaticon.com/packs/finance-57
const Badge = ({ style }) => (
  <svg x="0px" y="0px" viewBox="0 0 454.656 454.656" style={style}>
    <g>
      <g>
        <path d="M454.656,227.584l-38.912-50.688l8.704-62.976l-59.392-23.552l-23.552-59.392l-62.976,8.704l-51.2-39.424L176.64,39.168
      l-62.976-8.704L90.112,89.856L30.72,113.408l8.704,62.976L0,227.584l38.912,50.688l-8.704,62.976L89.6,364.8l23.552,59.392
      l62.976-8.704l50.688,38.912l50.688-38.912l62.976,8.704l23.552-59.392l59.392-24.064l-8.704-62.976L454.656,227.584z
       M208.896,301.312l-75.776-62.464l16.384-19.968l56.32,46.08l96.256-111.104l19.456,16.896L208.896,301.312z"/>
      </g>
    </g>
  </svg>
);

Badge.propTypes = {
  style: PropTypes.object,
};

export default Badge;

