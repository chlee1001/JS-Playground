import React, { FC } from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Home: FC = () => {
  return <Container>안녕 난 react infinite scroll의 스크롤방식이야</Container>;
};

export default Home;
