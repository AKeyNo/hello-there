import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import CreateSaying from '../../src/components/saying/CreateSaying';
import Loading from '../../src/components/ui/Loading';
import SayingBox from '../../src/components/saying/SayingBox';
import SayingsList from '../../src/components/saying/SayingsList';
import useSayings from '../../lib/hooks/useSayings';

export default function SayingPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/saying/${id}`);
  const { sayings, isSayingsLoaded } = useSayings(
    session,
    'replies',
    id as string
  );

  return (
    <div className='w-full'>
      {data ? <SayingBox saying={data.saying} /> : <Loading />}
      {data?.saying?.repliedToSaying ? (
        <SayingBox saying={data.saying.repliedToSaying} wasRepliedTo={true} />
      ) : null}
      <CreateSaying />
      {isSayingsLoaded ? (
        <SayingsList sayings={sayings} />
      ) : (
        <span className='w-6/12'>
          <Loading />
        </span>
      )}
    </div>
  );
}
