import React from 'react';

interface Props {
  number: number;
  label: string;
}

const IncrementDecrementPanel: React.FC<Props> = ({
  number,
  label,
}) => (
  <div>
    <div>- {number} +</div>
    <div>{label}</div>
  </div>
);

export default IncrementDecrementPanel;
