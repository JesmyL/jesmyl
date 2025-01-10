import { useMemo } from 'react';
import { useMarks } from '../../lists/marks/useMarks';
import { CmComListContext, CmComListContextValue } from './context';

export const CmTranslationComListContextInMarks = function InMarks({ children }: { children: React.ReactNode }) {
  const list = useMarks().markedComs;

  const value = useMemo((): CmComListContextValue => {
    return {
      list,
      pageTitlePostfix: ' - Избранное',
    };
  }, [list]);

  return <CmComListContext.Provider value={value}>{children}</CmComListContext.Provider>;
};
export default CmTranslationComListContextInMarks;
