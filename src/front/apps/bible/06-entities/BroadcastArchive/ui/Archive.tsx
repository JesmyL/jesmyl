import { translateBase } from '#basis/locale';
import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { memo } from 'react';
import { twJoin } from 'tailwind-merge';
import { useBibleBroadcastArchiveItemHighlight } from '../lib/useBibleBroadcastArchiveItemHighlight';
import { useBibleBroadcastArchiveListFaceClickListener } from '../lib/useBibleBroadcastArchiveListFaceClickListener';
import { BibleBroadcastArchiveList } from './ArchiveList';

interface Props {
  title: string;
  list: BibleBroadcastAddress[] | nil;
  scope: BibleBroadcastKeyListenScope;
}

export const BibleBroadcastArchive = memo(function BibleBroadcastArchive({ title, list, scope }: Props) {
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);
  const isCurrentScope = listenScope === scope;

  const { listRef, deleteKeyPrefix, modifyKeyPrefix } = useBibleBroadcastArchiveListFaceClickListener(scope, list);

  useBibleBroadcastArchiveItemHighlight(listRef, scope);

  return (
    <StyledList
      ref={listRef}
      title={`${modifyKeyPrefix}+@ - добавить ссылку; ${modifyKeyPrefix}+${deleteKeyPrefix}+@ - вырезать ссылку; Enter - применить; Del - удалить пункт; Ctrl+Del - очистить список "${title}"`}
      className={twJoin('min-h-full', isCurrentScope && 'bg-x3/10')}
    >
      {list?.length ? (
        <BibleBroadcastArchiveList
          list={list}
          scope={scope}
        />
      ) : (
        list && (
          <div className={twJoin('flex items-center justify-center h-full pt-5', scope === listenScope && 'text-x3')}>
            {translateBase(it => it.emptyList)}
          </div>
        )
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
