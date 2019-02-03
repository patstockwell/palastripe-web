import React from 'react';

const TabWindowWrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow-x: hidden;
`

const TabWindow = ({ children }) => (
  <TabWindowWrapper>
      <Header />
  </TabWindowWrapper>
)

