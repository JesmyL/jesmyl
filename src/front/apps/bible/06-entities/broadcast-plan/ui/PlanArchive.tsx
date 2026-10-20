import { translateBase } from '#basis/locale';
import { BibleBroadcastArchive } from '$bible/entities/BroadcastArchive';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleIDB } from '$bible/shared/state/bibleIDB';
import { memo } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const BibleBroadcastPlanArchive = memo(function BibleBroadcastPlanArchive() {
  const plan = bibleIDB.useValue.broadcastPlan();

  return (
    <BibleBroadcastArchive
      title={translateBase(BaseLocaleKey.Plan)}
      list={plan}
      scope={BibleBroadcastKeyListenScope.Plan}
    />
  );
});
