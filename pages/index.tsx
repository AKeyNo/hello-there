import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div className='flex flex-row max-h-screen'>
      <div className='relative w-1/2'>
        <Image
          src='/background-images/1.jpg'
          alt='nature'
          layout='fill'
          objectFit='cover'
          className='shadow-xl'
        ></Image>
      </div>
      <div id='sign-in-tab' className='w-1/2 h-screen px-12 py-56 bg-gray-900'>
        <h1 className='text-5xl font-extrabold drop-shadow-xl'>
          See what people are saying
        </h1>
        <h2 className='py-16 text-xl font-bold drop-shadow-md'>
          Join Hello There today.
        </h2>
        <button
          id='sign-up'
          className='block w-64 h-16 p-4 my-4 font-bold text-left duration-300 bg-gray-800 rounded-lg text-slate-400 hover:text-white drop-shadow-xl'
          onClick={() => signOut()}
        >
          Sign up
        </button>
        <button
          id='sign-in'
          className='block w-64 h-16 p-4 font-bold text-left duration-300 bg-gray-800 rounded-lg text-slate-400 hover:text-white drop-shadow-xl'
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Home;
