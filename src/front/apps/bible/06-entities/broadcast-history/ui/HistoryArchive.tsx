import { translateBase } from '#basis/locale';
import { BibleBroadcastArchive } from '$bible/entities/BroadcastArchive';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { memo } from 'react';

export const BibleBroadcastHistoryArchive = memo(function BibleBroadcastHistoryArchive() {
  const history = bibleIDB.useValue.broadcastHistory();

  return (
    <BibleBroadcastArchive
      title={translateBase(it => it.history)}
      list={history}
      scope={BibleBroadcastKeyListenScope.History}
    />
  );
});
