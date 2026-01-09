import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { CmComFaceList } from '$cm/entities/com-face';
import { CmCom } from '$cm/ext';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface Props {
  coms: CmCom[];
}

export const CmComRatingSortedComList = ({ coms }: Props) => {
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
      <CmComFaceList
        list={sortedComs}
        className="min-h-[110%]"
        isPutCcomFaceOff
        comDescription={com => <span className="nowrap">{visits[com.wid] ?? 0}</span>}
      />
    )
  );
};
