import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '../components/loading';
import Menu from '../components/menu';
import SayingsList from '../components/sayings-list';
import Welcome from '../components/welcome';
import useSayings from '../hooks/useSayings';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  // when the page is loaded for the first time,
  // we store the time in order to perform pagination
  // based on all the sayings that appear before the page loads
  // this is to prevent issues such as showing duplicate sayings
  const [timeFromLastCheckedSaying, setTimeFromLastCheckedSaying] = useState(
    new Date().toISOString()
  );
  const { sayings, isLoading, isError, size, setSize } = useSayings(
    session,
    timeFromLastCheckedSaying
  );

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

  const data = 0;
  if (status === 'loading' && !data) return <Loading />;
  else if (session) {
    return (
      <div className='flex max-h-screen'>
        <Menu />
        <SayingsList sayings={sayings} />
        <div className='w-2/6'></div>
      </div>
    );
  } else {
    return <Welcome />;
  }
};

export default Home;
