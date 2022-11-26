import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import CreateSaying from '../components/create-saying';
import Loading from '../components/loading';
import SayingsList from '../components/sayings-list';
import Welcome from '../components/welcome';
import Wrapper from '../components/wrapper';
import useSayings from '../hooks/useSayings';

const Home: NextPage = () => {
  const { data: session, status: sessionStatus } = useSession();

  const { sayings, isSayingsLoaded } = useSayings(session);

  if (sessionStatus === 'loading') return <Loading />;
  else if (session) {
    return (
      <Wrapper>
        <CreateSaying />
        {isSayingsLoaded ? (
          <SayingsList sayings={sayings} />
        ) : (
          <span className='w-3/12'>
            <Loading />
          </span>
        )}
      </Wrapper>
    );
  } else {
    return <Welcome />;
  }
};

export default Home;
