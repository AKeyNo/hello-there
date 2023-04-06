import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Loading from '../../components/loading';
import ProfileInformation from '../../components/profile-information';
import SayingsList from '../../components/sayings-list';
import useSayings from '../../hooks/useSayings';

export default function User() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const { sayings, isSayingsLoaded } = useSayings(
    session,
    'user',
    id as string
  );

  return (
    <div className='w-full'>
      <ProfileInformation userID={id as string} />
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
