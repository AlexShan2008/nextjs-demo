import { useRouter } from 'next/router';
import useSwr from 'swr';
import { fetcher } from '../../utils';

export default function User() {
  const router = useRouter();
  const { data, error } = useSwr(`/api/user/${router.query.id}`, fetcher);

  if (error) return <div>Failed to load user</div>;
  if (!data) return <div>Loading...</div>;

  return <div>{data.name}</div>;
}
