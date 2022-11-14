import { Saying } from '@prisma/client';
import { CircleNotch } from 'phosphor-react';
import CreateSaying from './create-saying';
import SayingBox from './saying';

const SayingsList = (sayings: Saying[]): JSX.Element => {
  const tempSayings: Saying[] = [
    {
      id: '1',
      creatorID: '123',
      repliedToSayingID: null,
      text: 'This is a test saying!',
      createdAt: new Date(),
    },
    {
      id: '2',
      creatorID: '123',
      repliedToSayingID: null,
      text: 'Bzzz im a bee',
      createdAt: new Date(),
    },
    {
      id: '1',
      creatorID: '123',
      repliedToSayingID: null,
      text: 'Put the spotlight on me!',
      createdAt: new Date(),
    },
  ];

  return (
    <div className='flex flex-col items-center w-4/6 h-screen py-12 border-gray-100/20 border-x-4'>
      <h1 className='mb-8 text-2xl font-bold'>Sayings</h1>
      <CreateSaying />
      <div id='sayings-list' className='flex flex-col items-start w-full'>
        {tempSayings.map((saying, i) => {
          return <SayingBox key={i} saying={saying} />;
        })}
      </div>
    </div>
  );
};

export default SayingsList;
