import styled from 'styled-components';

const BackSplash = styled.div`
  min-height: 96vh;
  background-color: ${({ topLeft, bottomRight }) => topLeft};
  background-image: linear-gradient(
    140deg,
    ${({ topLeft }) => topLeft},
    ${({ bottomRight }) => bottomRight}
  );
`

export default BackSplash;

