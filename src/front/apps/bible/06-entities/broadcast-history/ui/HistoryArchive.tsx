import { BibleBroadcastArchive } from '$bible/entities/broadcast-archive';
import { memo } from 'react';
import { useBibleBroadcastHistory, useBibleBroadcastHistoryClearHistorySetter } from '../lib/history';

export const BibleBroadcastHistoryArchive = memo(function BibleBroadcastHistoryArchive() {
  const history = useBibleBroadcastHistory();
  const clearHistory = useBibleBroadcastHistoryClearHistorySetter();

  return (
    <BibleBroadcastArchive
      title="История"
      list={history}
      onRemove={clearHistory}
    />
  );
});
