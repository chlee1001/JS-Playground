import React, { FC, useEffect, useState } from 'react';

import styled from 'styled-components';

import Skeleton from '@components/Skeleton';

const Base = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 12px;
  row-gap: 24px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 4%) 0 4px 16px 0;
  border-radius: 4px;
`;

const ImageWrapper = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
`;

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 24px;
`;

const Description = styled.p`
  margin: 8px 0 0 0;
  padding: 0;
  font-size: 16px;
`;

const PlaceHolder: FC = () => {
  return (
    <Container>
      <ImageWrapper>
        <Skeleton width={250} height={250} />
      </ImageWrapper>
      <Info>
        <Skeleton width={150} height={29} rounded />
        <div style={{ height: '8px' }} />
        <Skeleton width={200} height={19} rounded />
      </Info>
    </Container>
  );
};

const Item: FC = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image src="https://via.placeholder.com/200" />
      </ImageWrapper>
      <Info>
        <Title>PlaceHolder</Title>
        <Description>Size 200</Description>
      </Info>
    </Container>
  );
};

const Home: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <Base>
      {loading
        ? Array.from({ length: 25 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <PlaceHolder key={index} />
          ))
        : Array.from({ length: 25 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Item key={index} />
          ))}
    </Base>
  );
};

export default Home;
