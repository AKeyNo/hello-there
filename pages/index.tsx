import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import CreateSaying from '../components/create-saying';
import Loading from '../components/loading';
import SayingsList from '../components/sayings-list';
import Welcome from '../components/welcome';
import useSayings from '../hooks/useSayings';

const Home: NextPage = () => {
  const { data: session, status: sessionStatus } = useSession();

  const { sayings, isSayingsLoaded } = useSayings(session);

  if (sessionStatus === 'loading') return <Loading />;
  else if (session) {
    return (
      <div className='w-full'>
        <CreateSaying />
        {isSayingsLoaded ? (
          <SayingsList sayings={sayings} />
        ) : (
          <span className='w-3/12'>
            <Loading />
          </span>
        )}
      </div>
    );
  } else {
    return <Welcome />;
  }
};

export default Home;
