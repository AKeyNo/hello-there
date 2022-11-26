import { PropsWithChildren } from 'react';
import Menu from './menu';

const Wrapper: React.FC<PropsWithChildren<any>> = ({ data, children }) => {
  return (
    <div className='flex max-h-screen'>
      <Menu />
      <div className='flex flex-col items-center w-6/12 h-full py-12 border-gray-100/20 border-x-4'>
        <h1 className='mb-8 text-2xl font-bold'>Hello There</h1>
        {children}
      </div>
      <div className='w-3/12'></div>
    </div>
  );
};

export default Wrapper;
