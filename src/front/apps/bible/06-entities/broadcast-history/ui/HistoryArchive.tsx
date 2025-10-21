import { JSX, memo } from 'react';
import { BibleBroadcastArchive } from '../../broadcast-archive/ui/Archive';
import { useBibleBroadcastHistory, useBibleBroadcastHistoryClearHistorySetter } from '../lib/history';

export const BibleBroadcastHistoryArchive = memo(function BibleBroadcastHistoryArchive(): JSX.Element {
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
