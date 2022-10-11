import { getCsrfToken } from 'next-auth/react';

export default function SignIn({ csrfToken }: any) {
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-gray-900'>
      <div className='px-32 py-16 bg-gray-800 rounded-lg shadow-xl'>
        <h1 className='text-xl font-extrabold'>Login</h1>
        <form method='post' action='/api/auth/callback/credentials'>
          <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
          <label className='block py-4'>
            Username
            <input
              name='username'
              type='text'
              className='block w-full h-8 bg-gray-700 rounded-lg shadow-sm'
            />
          </label>
          <label className='block pb-4'>
            Password
            <input
              name='password'
              type='password'
              className='block w-full h-8 bg-gray-700 rounded-md shadow-sm'
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
        <button className='block w-full px-32 py-4 font-bold duration-150 bg-gray-700 rounded-md shadow-lg text-slate-400 hover:text-white hover:bg-slate-500 hover:shadow-md'>
          Create an account
        </button>
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
