import styled from 'styled-components';

const BackSplash = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  // this padding is to avoid the margin of the last child
  // of the BackSplash element adding extra height to the
  // viewport (100vh bug in webkit browsers)
  // https://www.bennadel.com/blog/3391-margin-collapsing-causes-unexpected-scrollbar-with-100vh-body-in-webkit.htm
  padding-bottom: 1px;
  background-color: ${({ topLeft }) => topLeft ? topLeft : 'white'};
  background-image: linear-gradient(
    ${({deg}) => deg || 140}deg,
    ${({ topLeft }) => topLeft},
    ${({ bottomRight }) => bottomRight}
  );
`;

export default BackSplash;

