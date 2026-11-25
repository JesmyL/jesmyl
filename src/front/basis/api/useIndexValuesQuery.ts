import { QueryKey } from '#basis/model/QueryKey.model';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';

export const useIndexValuesQuery = () => {
  return useQuery({
    queryKey: [QueryKey.IndexValues],
    queryFn: () => indexTsjrpcClientMethods.getIndexValues(),
  });
};
