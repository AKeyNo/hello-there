import { CircleNotch } from 'phosphor-react';

const Loading = (): JSX.Element => {
  return (
    <div id='loading' className='flex items-center justify-center h-screen'>
      <CircleNotch size={32} weight='fill' className='animate-spin' />
    </div>
  );
};

export default Loading;
