import axios from 'axios';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import Loading from '../components/loading';
import Menu from '../components/menu';
import SayingsList from '../components/sayings-list';
import Welcome from '../components/welcome';
import useSayings from '../hooks/useSayings';

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { sayings, isLoading, isError } = useSayings(session);

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
