import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login = (): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();

  if (router.pathname == '/user/signup') return <></>;

  if (session) {
    return (
      <div id='sign-out-menu'>
        Signed in as {session.user?.email} <br />
        <button id='sign-out-button' onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div id='sign-in-sign-up-menu'>
      Not signed in <br />
      <button id='sign-in-button' onClick={() => signIn()}>
        Sign in
      </button>
      <button id='sign-up-button' onClick={() => router.push('/user/signup')}>
        Sign up
      </button>
    </div>
  );
};

export default Login;
