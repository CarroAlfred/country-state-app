import { useQuery } from '@tanstack/react-query';
import { getStatesApi } from '../../api/states/get-states';

export function useGetStatesDetails({ id }: { id: number }) {
  return useQuery({
    queryKey: ['states', id],
    queryFn: () => getStatesApi.getStateDetails(id),
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: 1,
  });
}
