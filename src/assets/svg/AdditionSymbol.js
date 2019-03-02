import React from 'react';
import PropTypes from 'prop-types';

const AdditionSymbol = ({ fill }) => (
  <svg viewBox='0 0 42 42' width='20' height='20' fill={fill}>
    <polygon points='42,20 22,20 22,0 20,0 20,20 0,20 0,22 20,22 20,42 22,42 22,22 42,22 '/>
  </svg>
);

AdditionSymbol.propTypes = {
  fill: PropTypes.string,
};

export default AdditionSymbol;

