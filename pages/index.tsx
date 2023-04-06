import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import CreateSaying from '../src/components/saying/CreateSaying';
import Loading from '../src/components/ui/Loading';
import SayingsList from '../src/components/saying/SayingsList';
import Welcome from '../src/components/ui/Welcome';
import useSayings from '../lib/hooks/useSayings';

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
