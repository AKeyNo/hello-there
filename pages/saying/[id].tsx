import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import CreateSaying from '../../components/create-saying';
import Loading from '../../components/loading';
import SayingBox from '../../components/saying';
import SayingsList from '../../components/sayings-list';
import Wrapper from '../../components/wrapper';
import useSayings from '../../hooks/useSayings';

export default function SayingPage() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/saying/${id}`);
  const { sayings, isSayingsLoaded } = useSayings(session, id as string);

  return (
    <Wrapper>
      {data ? <SayingBox saying={data.saying} /> : <Loading />}
      <CreateSaying />
      {isSayingsLoaded ? (
        <SayingsList sayings={sayings} />
      ) : (
        <span className='w-6/12'>
          <Loading />
        </span>
      )}
    </Wrapper>
  );
}
