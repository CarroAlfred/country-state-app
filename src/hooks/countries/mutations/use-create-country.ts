import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CountryServicesApi } from '../../../api';

// this is only used for demo purposes for mutation hook of country creation
export function useCreateCountry({
  onSuccess = () => {},
  onError = () => {},
}: {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}) {
  const queryClient = useQueryClient();

  const response = useMutation({
    mutationFn: async (body: { value: string }) => await CountryServicesApi.createCountry({ value: body.value }),
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({
        queryKey: ['countries'],
      });
    },
    onError,
  });

  return {
    ...response,
    handleCreateCountry: response.mutate,
  };
}
