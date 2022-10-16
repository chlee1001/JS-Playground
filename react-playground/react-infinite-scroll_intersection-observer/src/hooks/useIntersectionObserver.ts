import { RefObject, useEffect, useState } from 'react';

const useIntersectionObserver = (
  targetRef: RefObject<Element>,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  },
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const isIntersecting = entry?.isIntersecting;

  const updateEntry = (entries: IntersectionObserverEntry[]): void => {
    const [newEntry] = entries;
    setEntry(newEntry);
  };

  useEffect(() => {
    const target = targetRef?.current;

    if (isIntersecting || !target) return undefined;

    const observer = new IntersectionObserver(updateEntry, options);
    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, options, isIntersecting]);

  return entry;
};

export default useIntersectionObserver;
