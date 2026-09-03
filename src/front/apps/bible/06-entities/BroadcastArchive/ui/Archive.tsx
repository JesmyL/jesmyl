import { translateBase } from '#basis/locale';
import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import {
  bibleBroadcastCurrentListLengthAtom,
  bibleBroadcastCurrentSelectedIndexAtom,
  bibleBroadcastKeyListenScopeAtom,
} from '$bible/shared/state';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { memo, useEffect } from 'react';
import { checkIsArray, checkIsNil } from 'shared/utils/checkIs';
import { twJoin } from 'tailwind-merge';
import { useBibleBroadcastArchiveItemHighlight } from '../lib/useBibleBroadcastArchiveItemHighlight';
import { useBibleBroadcastArchiveListFaceClickListener } from '../lib/useBibleBroadcastArchiveListFaceClickListener';
import { useBibleBroadcastArchiveListKeyListener } from '../lib/useBibleBroadcastArchiveListKeyListener';
import { BibleBroadcastArchiveJoinedAddressText } from './JoinedAddress';
import { BibleBroadcastArchiveJoinedContentText } from './JoinedContentText';
import { BibleBroadcastArchiveSingleAddressText } from './SingleAddressText';
import { BibleBroadcastArchiveSingleContentText } from './SingleContentText';

interface Props {
  title: string;
  list: BibleBroadcastAddress[] | nil;
  onRemove: (itemi?: number) => void;
  scope: BibleBroadcastKeyListenScope;
}

export const BibleBroadcastArchive = memo(function BibleBroadcastArchive({ title, list, onRemove, scope }: Props) {
  const stopClassName = 'archive-list-item';

  const selectedItemi = useAtomValue(bibleBroadcastCurrentSelectedIndexAtom);
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);

  const takeClassName = listenScope === scope ? (itemi: number) => selectedItemi === itemi && 'bg-x2' : () => null;
  const listLength = list?.length;

  useEffect(() => {
    if (listenScope !== scope || checkIsNil(listLength)) return;
    bibleBroadcastCurrentListLengthAtom.set(listLength);
  }, [listLength, listenScope, scope]);

  const nodeList = list?.map((item, itemi) => {
    const className = twJoin(stopClassName, 'nowrap w-full pointer py-1 ellipsis pl-3', takeClassName(itemi));

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

  useBibleBroadcastArchiveListKeyListener(title, scope, list, nodeList, onRemove);

  const { listRef, deleteKeyPrefix, modifyKeyPrefix } = useBibleBroadcastArchiveListFaceClickListener(
    scope,
    list,
    stopClassName,
  );

  useBibleBroadcastArchiveItemHighlight(listRef, scope);

  return (
    <StyledList
      ref={listRef}
      title={`${modifyKeyPrefix}+@ - добавить ссылку; ${modifyKeyPrefix}+${deleteKeyPrefix}+@ - вырезать ссылку; Enter - применить; Del - удалить пункт; Ctrl+Del - очистить список "${title}"`}
      className="h-full"
    >
      {nodeList?.length ? (
        nodeList
      ) : (
        <div className={twJoin('flex items-center justify-center h-full', scope === listenScope && 'text-x3')}>
          {translateBase(it => it.emptyList)}
        </div>
      )}
    </StyledList>
  );
});

const StyledList = styled.div`
  [data-archive-itemi] {
    counter-increment: archive-item;

    &:before {
      content: counter(archive-item) ' ';
      color: var(--color-x3);
    }
  }
`;
