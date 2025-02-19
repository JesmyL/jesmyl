import { memo } from 'react';
import { BibleTranslationArchive } from '../Archive';
import { useBibleClearTranslationHistorySetter, useBibleTranslationHistory } from './hooks/history';

export const BibleTranslationHistoryArchive = memo(function BibleTranslationHistoryArchive(): JSX.Element {
  const history = useBibleTranslationHistory();
  const clearHistory = useBibleClearTranslationHistorySetter();

  return (
    <BibleTranslationArchive
      title="История"
      list={history}
      onRemove={clearHistory}
    />
  );
});
