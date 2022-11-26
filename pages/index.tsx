import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Loading from '../components/loading';
import Menu from '../components/menu';
import SayingsList from '../components/sayings-list';
import Welcome from '../components/welcome';
import useSayings from '../hooks/useSayings';

const Home: NextPage = () => {
  const { data: session, status: sessionStatus } = useSession();

  const { sayings, isSayingsLoaded } = useSayings(session);

  if (sessionStatus === 'loading') return <Loading />;
  else if (session) {
    return (
      <div className='flex max-h-screen'>
        <Menu />
        {isSayingsLoaded ? (
          <SayingsList sayings={sayings} />
        ) : (
          <span className='w-3/12'>
            <Loading />
          </span>
        )}
        <div className='w-3/12'></div>
      </div>
    );
  } else {
    return <Welcome />;
  }
};

export default Home;
