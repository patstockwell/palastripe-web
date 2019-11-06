import React from 'react';

interface Props {
  style?: any;
}

const SoundOff: React.FC<Props> = ({ style }) => (
  <svg width={style && style.width || '20'} fill='white' viewBox='0 0 461.55 461.55' style={style}>
    <path d="M345.525,229.5c0-45.9-25.5-84.15-63.75-102v56.1l63.75,63.75C345.525,239.7,345.525,234.6,345.525,229.5z M409.275,229.5
    c0,22.95-5.1,45.9-12.75,66.3l38.25,38.25c17.85-30.6,25.5-68.85,25.5-107.1c0-109.65-76.5-201.45-178.5-224.4V56.1
    C355.725,81.6,409.275,147.9,409.275,229.5z M34.425,0L1.275,33.15L121.125,153H1.275v153h102l127.5,127.5V262.65L340.425,372.3
    c-17.851,12.75-35.7,22.95-58.65,30.601v53.55c35.7-7.65,66.3-22.95,94.35-45.9l51,51l33.15-33.149l-229.5-229.5L34.425,0z
      M230.775,25.5l-53.55,53.55l53.55,53.55V25.5z"/>
  </svg>
);

export default SoundOff;
