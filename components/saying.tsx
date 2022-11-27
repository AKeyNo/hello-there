import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowBendDownRight } from 'phosphor-react';
import { SayingInSayingBox } from '../types/types';

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

  // depending on whether or not it was replied to, we want to display the saying differently
  if (!wasRepliedTo) {
    return (
      <div
        className='flex items-center justify-center w-full p-8 border-b-4 border-gray-700'
        onClick={onSayingClicked}
      >
        <Link href={`/user/${creatorID}`}>
          <div className='flex items-center justify-center w-16 h-16 mr-8 rounded-full bg-slate-500'>
            {creator?.username ? creator.username[0] : '?'}
          </div>
        </Link>
        <div className='flex items-center w-full h-full'>{text}</div>
      </div>
    );
  } else
    return (
      <div
        className='flex items-center justify-center w-full p-16 border-b-4 border-gray-700'
        onClick={onSayingClicked}
      >
        <ArrowBendDownRight size={32} weight='fill' className='mr-8' />
        <Link href={`/user/${creatorID}`}>
          <div className='flex items-center justify-center w-16 h-16 mr-8 rounded-full bg-slate-500'>
            {creator?.username ? creator.username[0] : '?'}
          </div>
        </Link>
        <div className='flex items-center w-full h-full'>{text}</div>
      </div>
    );
};

export default SayingBox;
