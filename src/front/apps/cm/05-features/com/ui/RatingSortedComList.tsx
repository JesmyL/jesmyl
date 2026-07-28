import { translateBase } from '#basis/locale';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { CmComFaceList } from '$cm/entities/com-face';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { CmCom } from 'shared/const/cm/Com';
import { objectValues } from 'shared/utils/object.utils';

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

  return (
    <>
      <div className="sticky top-0 py-5 bg-x5">
        {translateBase(it => it.cm.com.watcheds, {
          c: objectValues(visits).reduce((sum, curr) => sum! + curr!, 0) || 0,
        })}
      </div>
      {isLoading ? (
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
      )}
    </>
  );
};
