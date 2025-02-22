import { memo } from 'react';
import { useBibleClearTranslationHistorySetter, useBibleTranslationHistory } from './hooks/history';

export default memo(function BibleTranslationHistoryArchive(): JSX.Element {
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
