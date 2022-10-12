import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Loading from '../components/loading';
import SayingsList from '../components/sayings-list';
import Welcome from '../components/welcome';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  // shows the welcome page only when the user is not logged in
  if (status === 'loading') {
    return <Loading />;
  } else if (session) {
    return (
      <div className='flex max-h-screen'>
        <div className='w-2/6'></div>
        <SayingsList saying={null} />
        <div className='w-2/6'></div>
      </div>
    );
  } else {
    return <Welcome />;
  }
};

export default Home;
