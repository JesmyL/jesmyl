import { indexTsjrpcClientMethods } from '$index/tsjrpc.methods';
import { useQuery } from '@tanstack/react-query';

export const useIndexValuesQuery = () => {
  return useQuery({
    queryKey: ['indexValues'],
    queryFn: () => indexTsjrpcClientMethods.getIndexValues(),
  });
};
