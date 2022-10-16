import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import {
  Passenger as IPassengerProps,
  Response as IResponse,
} from '@_types/passenger';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

interface IProps {
  isLastItem: boolean;
  onFetchMorePassengers: () => void;
  children: React.ReactNode;
}

const Passenger = ({ isLastItem, onFetchMorePassengers, children }: IProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    if (isLastItem && isIntersecting) {
      onFetchMorePassengers();
    }
  }, [isLastItem, isIntersecting, onFetchMorePassengers]);

  return (
    <div
      ref={ref}
      style={{ minHeight: '100vh', display: 'flex', border: '1px dashed #000' }}
    >
      {children}
    </div>
  );
};

const HomePage = () => {
  const [passengers, setPassengers] = useState<Array<IPassengerProps>>([]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const getPassengers = async () => {
    const params = { page, size: 30 };

    try {
      const response = await axios.get<IResponse>(
        'https://api.instantwebtools.net/v1/passenger',
        { params },
      );

      setPassengers((prev) => [...prev, ...response.data.data]);
      setIsLast(isLast);
    } catch (e) {
      console.error('getPassengers error', e);
    }
  };

  useEffect(() => {
    if (!isLast) {
      getPassengers().then();
    }
  }, [isLast, page]);

  return (
    <div className="App">
      {passengers.map((passenger, idx) => {
        return (
          <Passenger
            key={passenger._id}
            isLastItem={passengers.length - 1 === idx}
            onFetchMorePassengers={() => {
              setPage((prev) => prev + 1);
            }}
          >
            {passenger.name}
          </Passenger>
        );
      })}
    </div>
  );
};

export default HomePage;
