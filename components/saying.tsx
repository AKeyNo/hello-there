import { Saying } from '@prisma/client';
import Link from 'next/link';

const SayingBox = (props: { saying: Saying }) => {
  const { id, creatorID, text, createdAt } = props.saying;

  return (
    <Link href={`/saying/${id}`}>
      <div className='flex items-center justify-center w-full p-8 border-4 border-gray-700'>
        <Link href={`/user/${creatorID}`}>
          <div className='flex items-center justify-center w-16 h-16 mr-8 rounded-full bg-slate-500'>
            {creatorID}
          </div>
        </Link>
        <div className='flex items-center w-full h-full'>{text}</div>
      </div>
    </Link>
  );
};

export default SayingBox;
