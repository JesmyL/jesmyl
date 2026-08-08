import { translateBase } from '#basis/locale';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { CmComFaceList } from '$cm/entities/com-face';
import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { CmComWid } from 'shared/api';
import { objectValues } from 'shared/utils/object.utils';

interface Props {
  comws: CmComWid[];
}

export const CmComRatingSortedComList = ({ comws }: Props) => {
  const { data: visits = {}, isLoading } = useQuery({
    queryKey: ['CmRatingSortedComList visits'],
    queryFn: () => cmTsjrpcClient.getComwVisits(),
  });

  const sortedComws = useMemo(
    () => [...comws].sort((aw, bw) => (visits[bw] ?? 0) - (visits[aw] ?? 0)),
    [comws, visits],
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
        !sortedComws.length || (
          <CmComFaceList
            list={sortedComws}
            className="min-h-[110%]"
            isPutCcomFaceOff
            comDescription={com => <span className="nowrap">{visits[com.w] ?? 0}</span>}
          />
        )
      )}
    </>
  );
};
