import Link from 'next/link';
import { useRouter } from 'next/router';
import { SayingInSayingBox } from '../types/types';

const SayingBox = (props: { saying: SayingInSayingBox }) => {
  const router = useRouter();

  if (!props.saying) return <></>;
  const { id, creatorID, text, createdAt, creator } = props.saying;

  const onSayingClicked = () => {
    window.event?.preventDefault();

    const selection = window.getSelection()?.toString();

    if (selection!.length == 0) {
      router.push(`/saying/${id}`);
    }
  };

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
};

export default SayingBox;
