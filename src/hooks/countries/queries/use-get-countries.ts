import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { CountryServicesApi } from '../../../api';
import type { Country } from '../../../types';

export function useGetCountries(): UseQueryResult<Country.CountryInfo[], Error> {
  return useQuery({
    queryKey: ['countries'],
    queryFn: () => CountryServicesApi.getAllCountries(), // directly return promise
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
