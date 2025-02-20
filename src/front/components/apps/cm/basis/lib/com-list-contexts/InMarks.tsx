import { useMemo } from 'react';
import { useFavoriteComs } from '../../../lists/favorites/useFavoriteComs';
import { CmComListContext, CmComListContextValue } from './context';

export const CmTranslationComListContextInMarks = function InMarks({ children }: { children: React.ReactNode }) {
  const list = useFavoriteComs().markedComs;

  const value = useMemo((): CmComListContextValue => {
    return {
      list,
      pageTitlePostfix: ' - Избранное',
    };
  }, [list]);

  return <CmComListContext.Provider value={value}>{children}</CmComListContext.Provider>;
};
