import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { Session } from '../types/types';

// handles the sayings that appear
// every time size gets added, it adds more and more to the list of sayings to display
const useSayings = (
  session?: Session | null,
  typeOfQuery?: string,
  id?: string
) => {
  // scrolling to the bottom of the page loads in more sayings
  useEffect(() => {
    const handleScroll = () => {
      window.event?.preventDefault();
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (bottom) {
        setSize(size + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const getKey = (pageIndex: number) => {
    if (typeOfQuery == 'replies') {
      return `/api/saying/replies/${id}?sort=${pageIndex}${
        timeFromLastCheckedSaying
          ? `&beforeTime=${timeFromLastCheckedSaying}`
          : ''
      }`;
    } else if (typeOfQuery == 'user') {
      return `/api/user/sayings/${id}?sort=${pageIndex}${
        timeFromLastCheckedSaying
          ? `&beforeTime=${timeFromLastCheckedSaying}`
          : ''
      }`;
    } else {
      return session
        ? `/api/saying/feed/${session.user.id}/?sort=${pageIndex}${
            timeFromLastCheckedSaying
              ? `&beforeTime=${timeFromLastCheckedSaying}`
              : ''
          }`
        : null;
    }
  };
  // we store the time in order to perform pagination
  // based on all the sayings that appear before the page loads
  // this is to prevent issues such as showing duplicate sayings
  const [timeFromLastCheckedSaying, setTimeFromLastCheckedSaying] = useState(
    new Date().toISOString()
  );
  const { data, error, size, setSize } = useSWRInfinite(getKey);

  return {
    sayings: data ? [].concat(...data) : [],
    isSayingsLoaded: error || data,
    isError: error,
    size,
    setSize,
    timeFromLastCheckedSaying,
    setTimeFromLastCheckedSaying,
  };
};

export default useSayings;
