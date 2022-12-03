import { signIn } from 'next-auth/react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import Router from 'next/router';

const Welcome = (): JSX.Element => {
  // assumes that the database has been seeded
  // if this ever goes to actual real world production, this will not be available normally, only for convenience
  const guestSignIn = async () => {
    await signIn('credentials', {
      redirect: false,
      username: 'realCaesarAugustus',
      password: '!eg_g-tof-u_fis3h',
    }).then((response: any) => {
      if (response!.ok) {
        Router.push('/');
      } else if (response!.error == 'CredentialsSignin') {
        // setError('Invalid username or password!');
        window.alert('Invalid username or password!');
      } else {
        // setError('An unknown error has occurred!');
        window.alert('An unknown error as occurred!');
      }
    });
  };

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
      <div className='flex flex-col justify-center w-1/2 h-screen px-12 bg-gray-900'>
        <h1
          className='text-5xl font-extrabold drop-shadow-xl'
          data-cy='home-page-title'
        >
          See what people are saying
        </h1>
        <h2 className='py-16 text-xl font-bold drop-shadow-md'>
          Join Hello There today.
        </h2>
        <Link href='/auth/signup'>
          <button
            id='sign-up'
            className='block w-64 h-16 p-4 my-4 font-bold text-left duration-300 bg-gray-800 rounded-lg text-slate-400 hover:text-white drop-shadow-xl'
            data-cy='sign-up'
          >
            Sign up
          </button>
        </Link>
        <button
          id='sign-in'
          className='block w-64 h-16 p-4 mb-4 font-bold text-left duration-300 bg-gray-800 rounded-lg text-slate-400 hover:text-white drop-shadow-xl'
          onClick={() => signIn()}
          data-cy='sign-in'
        >
          Sign in
        </button>
        <button
          id='guest-sign-in'
          className='block w-64 h-16 p-4 font-bold text-left duration-300 bg-gray-800 rounded-lg text-slate-400 hover:text-white drop-shadow-xl'
          onClick={() => guestSignIn()}
          data-cy='guest-sign-in'
        >
          Use Guest Account
        </button>
      </div>
    </div>
  );
};

export default Welcome;
