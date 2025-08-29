import { useQuery } from '@tanstack/react-query';
import { StatesServicesApi } from '../../api';

export function useGetStatesDetails({ id }: { id?: number }) {
  return useQuery({
    queryKey: ['states', id],
    queryFn: () => StatesServicesApi.getStates(Number(id)),
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: 1,
    enabled: !!id, // only fetch if id is truthy
  });
}
