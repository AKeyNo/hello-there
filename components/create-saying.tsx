import { Saying } from '@prisma/client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import SayingBox from './saying';

const CreateSaying = (): JSX.Element => {
  const { data: session, status } = useSession();
  const [createSayingText, setCreateSayingText] = useState('');
  // because of the way SWR works and with the saying timing based off either page loading or get time for new sayings,
  // we need a separate area for newly created user sayings that will appear at the top when the user creates a new one
  const [newlyCreatedUserSayings, setNewlyCreatedUserSayings] = useState<
    Saying[]
  >([]);
  const MAX_CHARACTER_COUNT: number = process.env.SAYING_CHARACTER_LENGTH
    ? parseInt(process.env.SAYING_CHARACTER_LENGTH)
    : 280;

  if (!session) return <></>;

  const submitSaying = async () => {
    window.event?.preventDefault();

    const newSayingQuery = await axios.post('/api/saying', {
      text: createSayingText,
    });

    const newSaying = newSayingQuery.data as Saying;

    setNewlyCreatedUserSayings([newSaying, ...newlyCreatedUserSayings]);
  };

  // const { id, username, email, name } = session.user;
  return (
    <>
      <div className='flex flex-col items-center justify-center w-full p-8 border-b-4 border-gray-700'>
        <div className='flex items-center w-full h-full'>
          <form method='post' onSubmit={submitSaying} className='w-full'>
            <textarea
              name='create-saying'
              className='block w-full h-32 p-5 bg-gray-700 rounded-lg shadow-sm resize-none'
              onChange={(e) => setCreateSayingText(e.target.value)}
              placeholder='What is on your mind?'
              autoComplete='off'
              maxLength={MAX_CHARACTER_COUNT}
            />
            <button type='submit' id='submitSaying'>
              Submit
            </button>
          </form>
        </div>
        <div className='block w-full text-end'>{`${createSayingText.length}/${MAX_CHARACTER_COUNT}`}</div>
      </div>
      {newlyCreatedUserSayings &&
        newlyCreatedUserSayings.map((saying, i) => {
          return <SayingBox key={i} saying={saying} />;
        })}
    </>
  );
};

export default CreateSaying;
