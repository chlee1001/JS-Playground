import React, { FC, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { throttle } from 'lodash';

import { Passenger, Response } from '@_types/passenger';

import styles from './homePage.module.css';

const Home: FC = () => {
  const scrollRef = useRef<HTMLUListElement | null>(null);
  const currentPageRef = useRef<number>(0);

  const [passengers, setPassengers] = useState<Array<Passenger>>([]);
  const [isLast, setIsLast] = useState<boolean>(false); // 마지막 페이지인지
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false); // 스크롤이 맨마지막인지 판단

  const getPassengers = async (init?: boolean) => {
    const params = { page: currentPageRef.current, size: 30 };

    try {
      const response = await axios.get<Response>(
        'https://api.instantwebtools.net/v1/passenger',
        { params },
      );
      if (init) {
        setPassengers(response.data.data);
      } else {
        setPassengers((prev) => [...prev, ...response.data.data]);
      }
      setIsLast(response.data.totalPages === currentPageRef.current);
    } catch (e) {
      console.error('getPassengers error', e);
    }
  };

  const handleScroll = throttle(() => {
    if (scrollRef.current) {
      const { scrollHeight, offsetHeight, scrollTop } = scrollRef.current;

      const offset = 100;

      setIsScrollBottom(scrollHeight - offsetHeight - scrollTop < offset);
    }
  }, 300);

  useEffect(() => {
    if (!isScrollBottom || isLast) {
      return;
    }
    currentPageRef.current += 1;
    getPassengers().then();
  }, [isLast, isScrollBottom]);

  useEffect(() => {
    getPassengers(true).then();
  }, []);

  return (
    <div className="App">
      <ul ref={scrollRef} className={styles.list} onScroll={handleScroll}>
        {passengers.map((passenger) => (
          <li className={styles.item} key={passenger._id}>
            {passenger.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
