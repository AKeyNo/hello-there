import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { getCsrfToken, signIn } from 'next-auth/react';
import Link from 'next/link';
import Router from 'next/router';
import { useRef } from 'react';
import authOptions from '../api/auth/[...nextauth]';

export default function SignIn({ csrfToken }: any) {
  const username = useRef<HTMLInputElement | null>(null);
  const password = useRef<HTMLInputElement | null>(null);
  // const [error, setError] = useState('');

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
        window.alert('An unknown error has occurred!');
      }
    });
  };

  return (
    <div className='flex items-center justify-center w-screen h-full min-h-screen bg-gray-900'>
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

      <div className='w-full h-full min-h-screen p-4 overflow-y-auto bg-gray-800 rounded-lg shadow-xl sm:min-h-fit sm:h-fit sm:px-32 sm:py-16 sm:w-fit sm:p-0'>
        <h1 className='text-xl font-extrabold' data-cy='signin-title'>
          Sign In
        </h1>
        <form method='post' onSubmit={signInSubmit}>
          <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
          <label className='block py-4'>Username</label>
          <input
            name='username'
            type='text'
            className='block w-full h-8 bg-gray-700 rounded-lg shadow-sm'
            ref={username}
          />
          <label className='block pb-4'>Password</label>
          <input
            name='password'
            type='password'
            className='block w-full h-8 mb-4 bg-gray-700 rounded-md shadow-sm'
            ref={password}
          />
          <button
            type='submit'
            className='block w-full px-32 py-4 font-bold duration-150 bg-gray-700 rounded-md shadow-lg text-slate-400 hover:text-white hover:bg-slate-500 hover:shadow-md'
            data-cy='user-sign-in'
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
