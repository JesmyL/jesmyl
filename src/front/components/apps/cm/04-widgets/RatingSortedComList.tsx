import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { Com } from '$cm/col/com/Com';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { cmTsjrpcClient } from '$cm/tsjrpc/basic.tsjrpc.methods';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { emptyFunc } from 'shared/utils';

interface Props {
  coms: Com[];
}

export const CmRatingSortedComList = ({ coms }: Props) => {
  const { data: visits = {}, isLoading } = useQuery({
    queryKey: ['CmRatingSortedComList visits'],
    queryFn: () => cmTsjrpcClient.getComwVisits(),
  });

  const sortedComs = useMemo(
    () => [...coms].sort((a, b) => (visits[b.wid] ?? 0) - (visits[a.wid] ?? 0)),
    [coms, visits],
  );

  return isLoading ? (
    <TheIconLoading />
  ) : (
    !sortedComs.length || (
      <ComFaceList
        list={sortedComs}
        className="min-h-[110%]"
        importantOnClick={emptyFunc}
        isPutCcomFaceOff
        comDescription={com => <span className="nowrap">{visits[com.wid] ?? 0}</span>}
      />
    )
  );
};
