import { Saying } from '@prisma/client';
import SayingBox from './saying';

interface Props {
  sayings: Saying[] | null;
}

const SayingsList = ({ sayings }: Props): JSX.Element => {
  return (
    <div id='sayings-list' className='flex flex-col items-start w-full'>
      {sayings &&
        sayings.map((saying, i) => {
          return <SayingBox key={i} saying={saying} />;
        })}
    </div>
  );
};

export default SayingsList;
