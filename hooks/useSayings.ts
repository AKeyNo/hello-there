import useSWR from 'swr';

interface Session {
  user: {
    id: string;
    email: string;
    username: string;
    name?: string;
  };
}

const useSayings = (session: Session | null) => {
  const { data, error } = useSWR(
    session ? `/api/saying/feed/${session.user.id}` : null
  );

  return {
    sayings: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useSayings;
