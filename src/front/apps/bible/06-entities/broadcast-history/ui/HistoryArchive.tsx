import { translateBase } from '#basis/locale';
import { BibleBroadcastArchive } from '$bible/entities/BroadcastArchive';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { memo } from 'react';
import { checkIsNil } from 'shared/utils/checkIs';

export const BibleBroadcastHistoryArchive = memo(function BibleBroadcastHistoryArchive() {
  const history = bibleIDB.useValue.broadcastHistory();

  return (
    <BibleBroadcastArchive
      title={translateBase(it => it.history)}
      list={history}
      onRemove={itemi =>
        bibleIDB.set.broadcastHistory(prev => (checkIsNil(itemi) ? [] : prev?.filter((_, iti) => iti !== itemi)))
      }
      scope={BibleBroadcastKeyListenScope.History}
    />
  );
});
