import useSWRInfinite from 'swr/infinite';

interface Session {
  user: {
    id: string;
    email: string;
    username: string;
    name?: string;
  };
}

// handles the sayings that appear
// every time size gets added, it adds more and more to the list of sayings to display
const useSayings = (
  session: Session | null,
  timeFromLastCheckedSaying: string
) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    return session
      ? `/api/saying/feed/${session.user.id}/?sort=${pageIndex}&beforeTime=${timeFromLastCheckedSaying}`
      : null;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey);

  return {
    sayings: data ? [].concat(...data) : [],
    isLoading: !error && !data,
    isError: error,
    size,
    setSize,
  };
};

export default useSayings;
