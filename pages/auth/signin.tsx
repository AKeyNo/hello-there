import { getCsrfToken, signIn } from 'next-auth/react';
import Link from 'next/link';
import Router from 'next/router';
import { useRef, useState } from 'react';

export default function SignIn({ csrfToken }: any) {
  const username = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState('');

  const signInSubmit = async () => {
    window.event?.preventDefault();

    await signIn('credentials', {
      redirect: false,
      username: username.current?.value,
      password: password.current?.value,
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
    <div className='flex items-center justify-center w-screen h-screen bg-gray-900'>
      {/* {error ? (
        <div
          id='sign-in-error'
          className='absolute top-0 w-screen py-6 text-center bg-red-600 rounded-lg shadow-xl animate-fade-in'
        >
          {error}
        </div>
      ) : (
        <></>
      )} */}

      <div className='px-32 py-16 bg-gray-800 rounded-lg shadow-xl'>
        <h1 className='text-xl font-extrabold'>Login</h1>
        <form method='post' onSubmit={signInSubmit}>
          <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
          <label className='block py-4'>
            Username
            <input
              name='username'
              type='text'
              className='block w-full h-8 bg-gray-700 rounded-lg shadow-sm'
              ref={username}
            />
          </label>
          <label className='block pb-4'>
            Password
            <input
              name='password'
              type='password'
              className='block w-full h-8 bg-gray-700 rounded-md shadow-sm'
              ref={password}
            />
          </label>
          <button
            type='submit'
            className='block w-full px-32 py-4 font-bold duration-150 bg-gray-700 rounded-md shadow-lg text-slate-400 hover:text-white hover:bg-slate-500 hover:shadow-md'
          >
            Sign in
          </button>
        </form>
        <hr className='w-full h-1 my-12 duration-100 rounded-lg bg-slate-50 opacity-10' />
        <Link href='/auth/signup'>
          <button className='block w-full px-32 py-4 font-bold duration-150 bg-gray-700 rounded-md shadow-lg text-slate-400 hover:text-white hover:bg-slate-500 hover:shadow-md'>
            Create an account
          </button>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
