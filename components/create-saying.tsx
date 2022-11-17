import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { mutate } from 'swr';

const CreateSaying = (): JSX.Element => {
  const { data: session, status } = useSession();
  const [createSayingText, setCreateSayingText] = useState('');
  const MAX_CHARACTER_COUNT: number = process.env.SAYING_CHARACTER_LENGTH
    ? parseInt(process.env.SAYING_CHARACTER_LENGTH)
    : 280;

  if (!session) return <></>;

  const countCharacters = () => {
    window.event?.preventDefault();
  };

  const submitSaying = async () => {
    window.event?.preventDefault();

    const updateWithNewSaying = async () => {
      await axios.post('/api/saying', {
        text: createSayingText,
      });
    };

    mutate(`/api/saying/feed/${session.user.id}`, updateWithNewSaying, {
      populateCache: (updatedNewSaying, sayings) => {
        return [sayings];
      },
    });
  };

  const { id, username, email, name } = session.user;
  return (
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
          ></textarea>
          <button type='submit' id='submitSaying'>
            Submit
          </button>
        </form>
      </div>
      <div className='block w-full text-end'>{`${createSayingText.length}/${MAX_CHARACTER_COUNT}`}</div>
    </div>
  );
};

export default CreateSaying;
