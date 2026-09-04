import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastCurrentSelectedIndexAtom, bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { useAtomValue } from 'atomaric';
import { memo, ReactNode } from 'react';
import { itIt } from 'shared/utils';
import { checkIsArray } from 'shared/utils/checkIs';
import { twJoin } from 'tailwind-merge';
import { bibleBroadcastArchiveStopClassName } from '../const/common';
import { BibleBroadcastArchiveJoinedAddressText } from './JoinedAddress';
import { BibleBroadcastArchiveJoinedContentText } from './JoinedContentText';
import { BibleBroadcastArchiveSingleAddressText } from './SingleAddressText';
import { BibleBroadcastArchiveSingleContentText } from './SingleContentText';

interface Props {
  list: BibleBroadcastAddress[];
  children?: (nodeList: ReactNode[]) => ReactNode;
  scope: BibleBroadcastKeyListenScope;
}

export const BibleBroadcastArchiveList = memo(function BibleBroadcastArchive({ list, scope, children = itIt }: Props) {
  const selectedItemi = useAtomValue(bibleBroadcastCurrentSelectedIndexAtom);
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);
  const isCurrentScope = listenScope === scope;

  const takeClassName = isCurrentScope ? (itemi: number) => selectedItemi === itemi && 'bg-x2' : () => null;

  const nodeList = list.map((item, itemi) => {
    const className = twJoin(
      bibleBroadcastArchiveStopClassName,
      'nowrap w-full pointer py-1 ellipsis pl-3',
      takeClassName(itemi),
    );

    if (checkIsArray(item))
      return (
        <div
          key={item[0] + ' ' + item[1] + ':' + item[2]}
          data-archive-itemi={itemi}
          className={className}
        >
          <span className="text-x7">
            <BibleBroadcastArchiveSingleAddressText item={item} />
          </span>
          {' - '}
          <BibleBroadcastArchiveSingleContentText item={item} />
        </div>
      );

    return (
      <div
        key={itemi}
        data-archive-itemi={itemi}
        className={className}
      >
        <span className="text-x7">
          <BibleBroadcastArchiveJoinedAddressText item={item} />
        </span>
        {' - '}
        <BibleBroadcastArchiveJoinedContentText item={item} />
      </div>
    );
  });

  return <>{children(nodeList)}</>;
});
