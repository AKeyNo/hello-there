import Link from 'next/link';
import { PropsWithChildren } from 'react';
import Menu from './menu';

const Wrapper: React.FC<PropsWithChildren<any>> = ({ data, children }) => {
  return (
    <div className='flex max-h-screen'>
      <Menu />
      <div className='flex flex-col items-center w-6/12 pt-12 border-b-2 h-max border-gray-100/20 border-x-4'>
        <Link href='/'>
          <h1 className='mb-8 text-2xl font-bold '>Hello There</h1>
        </Link>
        {children}
      </div>
      <div className='w-3/12'></div>
    </div>
  );
};

export default Wrapper;
