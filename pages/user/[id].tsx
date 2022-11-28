import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Loading from '../../components/loading';
import SayingsList from '../../components/sayings-list';
import Wrapper from '../../components/wrapper';
import useSayings from '../../hooks/useSayings';

export default function User() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const { sayings, isSayingsLoaded } = useSayings(
    session,
    'user',
    id as string
  );

  return (
    <Wrapper>
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
