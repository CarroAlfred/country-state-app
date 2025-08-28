import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getCountryApi } from '../../api';
import type { Country } from '../../types';

export function useGetCountries(): UseQueryResult<Country.CountryInfo[], Error> {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountryApi.getAll,
    staleTime: 1000 * 60 * 5, // 5 mins
    retry: 1,
  });
}
