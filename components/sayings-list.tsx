import { Saying } from '@prisma/client';
import CreateSaying from './create-saying';
import SayingBox from './saying';

interface Props {
  sayings: Saying[] | null;
}

const SayingsList = ({ sayings }: Props): JSX.Element => {
  return (
    <div className='flex flex-col items-center w-4/6 h-screen py-12 border-gray-100/20 border-x-4'>
      <h1 className='mb-8 text-2xl font-bold'>Sayings</h1>
      <CreateSaying />
      <div id='sayings-list' className='flex flex-col items-start w-full'>
        {sayings &&
          sayings.map((saying, i) => {
            return <SayingBox key={i} saying={saying} />;
          })}
      </div>
    </div>
  );
};

export default SayingsList;
