import type { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { CircleNotch } from 'phosphor-react';
import Welcome from '../components/welcome';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-900'>
        <CircleNotch size={32} weight='fill' className='animate-spin' />
      </div>
    );
  } else if (session) {
    return <div>Hello {session.user?.email}</div>;
  } else {
    return <Welcome />;
  }
};

export default Home;
