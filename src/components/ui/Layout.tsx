import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { useSession } from 'next-auth/react';
import Menu from './Menu';

const Layout: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const { data: session } = useSession();

  // if sessionStatus is unauthenticated and the page is the home page, return the children
  if (!session) return <div>{children}</div>;

  return (
    <div className='flex max-h-screen'>
      <Menu />
      <div className='flex flex-col items-center w-full max-w-4xl pt-12 mx-auto border-b-2 h-max border-gray-100/20 border-x-4'>
        <Link href='/'>
          <h1 className='mb-8 text-2xl font-bold'>Hello There</h1>
        </Link>
        {children}
      </div>
      <div className='flex-1 hidden w-full sm:block' />
    </div>
  );
};

export default Layout;
