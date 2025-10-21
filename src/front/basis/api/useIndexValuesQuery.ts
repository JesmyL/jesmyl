import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';

export const useIndexValuesQuery = () => {
  return useQuery({
    queryKey: ['indexValues'],
    queryFn: () => indexTsjrpcClientMethods.getIndexValues(),
  });
};
