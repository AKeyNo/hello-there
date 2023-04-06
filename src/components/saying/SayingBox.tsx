import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowBendDownRight } from 'phosphor-react';
import { SayingInSayingBox } from '../../../lib/types/types';

interface Props {
  saying: SayingInSayingBox;
  wasRepliedTo?: boolean;
}

const SayingBox = ({ saying, wasRepliedTo = false }: Props): JSX.Element => {
  const router = useRouter();

  if (!saying) return <></>;
  const { id, creatorID, text, createdAt, creator } = saying;

  const onSayingClicked = () => {
    window.event?.preventDefault();

    const selection = window.getSelection()?.toString();

    if (selection!.length == 0) {
      router.push(`/saying/${id}`);
    }
  };

  // given ISO time format (2021-07-01T00:00:00.000Z), return a string like "July 1, 2021", 5m, or 2h
  const timeSincePosted = (time: string | Date) => {
    const timeInMinutes = Math.floor(
      (new Date().getTime() - new Date(time).getTime()) / 1000 / 60
    );

    if (timeInMinutes < 1) return 'just now';
    else if (timeInMinutes < 60) {
      return `${timeInMinutes}m`;
    } else if (timeInMinutes < 60 * 24) {
      const timeInHours = Math.floor(timeInMinutes / 60);
      return `${timeInHours}h`;
    } else {
      const date = new Date(time);
      const month = date.toLocaleString('default', { month: 'short' });
      const day = date.getDate();
      const year = date.getFullYear();

      return `${month} ${day}, ${year}`;
    }
  };

  return (
    <article className='flex items-center justify-center w-full h-32 border-b-4 border-gray-700'>
      {wasRepliedTo ? (
        <ArrowBendDownRight size={32} weight='fill' className='ml-8' />
      ) : null}
      <Link href={`/user/${creatorID}`}>
        <div className='flex items-center justify-center w-16 h-16 m-8 mr-8 rounded-full bg-slate-500'>
          {creator?.username ? creator.username[0] : '?'}
        </div>
      </Link>
      <div className='flex flex-col w-full h-full p-4'>
        <div>
          <Link href={`/user/${creatorID}`}>
            <span>@{creator!.username} | </span>
          </Link>
          <span className='text-gray-400'>
            {createdAt ? timeSincePosted(createdAt) : 'unknown time posted'}
          </span>
        </div>
        <div
          className='flex items-center w-full h-full'
          onClick={onSayingClicked}
        >
          {text}
        </div>
      </div>
    </article>
  );
};

export default SayingBox;
