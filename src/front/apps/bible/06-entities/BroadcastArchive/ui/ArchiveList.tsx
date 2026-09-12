import { makeBibleJoinedAddressText } from '$bible/shared/hooks/texts';
import { useBibleCurrentLangi } from '$bible/shared/lib/useBibleCurrentLangi';
import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastCurrentSelectedIndexAtom, bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { useAtomValue } from 'atomaric';
import { memo, ReactNode } from 'react';
import { itIt } from 'shared/utils';
import { twJoin } from 'tailwind-merge';
import { bibleBroadcastArchiveStopClassName } from '../const/common';
import { BibleBroadcastArchiveContentText } from './ContentText';

interface Props {
  list: BibleBroadcastAddress[];
  children?: (nodeList: ReactNode[]) => ReactNode;
  scope: BibleBroadcastKeyListenScope;
}

export const BibleBroadcastArchiveList = memo(function BibleBroadcastArchive({ list, scope, children = itIt }: Props) {
  const selectedItemi = useAtomValue(bibleBroadcastCurrentSelectedIndexAtom);
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);
  const isCurrentScope = listenScope === scope;
  const langi = useBibleCurrentLangi();

  const takeClassName = isCurrentScope ? (itemi: number) => selectedItemi === itemi && 'bg-x2' : () => null;

  return (
    <>
      {children(
        list.map((item, itemi) => {
          const address = makeBibleJoinedAddressText(langi, item, 'short');

          return (
            <div
              key={address}
              id={address}
              data-archive-itemi={itemi}
              className={twJoin(
                bibleBroadcastArchiveStopClassName,
                'nowrap w-full pointer py-1 ellipsis pl-3',
                takeClassName(itemi),
              )}
            >
              <span className="text-x7">{address}</span>
              {' - '}
              <BibleBroadcastArchiveContentText item={item} />
            </div>
          );
        }),
      )}
    </>
  );
});
