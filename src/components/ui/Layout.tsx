import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { useSession } from 'next-auth/react';
import Menu from './Menu';

const Layout: React.FC<PropsWithChildren<any>> = ({ data, children }) => {
  const { status: sessionStatus } = useSession();

  // if sessionStatus is unauthenticated and the page is the home page, return the children
  if (sessionStatus === 'unauthenticated' && window.location.pathname == '/')
    return <div>{children}</div>;

  return (
    <div className='flex max-h-screen'>
      <Menu />
      <div className='flex flex-col items-center w-6/12 pt-12 border-b-2 h-max border-gray-100/20 border-x-4'>
        <Link href='/'>
          <h1 className='mb-8 text-2xl font-bold '>Hello There</h1>
        </Link>
        {children}
      </div>
      <div className='w-3/12' />
    </div>
  );
};

export default Layout;
