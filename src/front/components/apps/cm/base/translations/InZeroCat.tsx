import { useMemo } from 'react';
import { useCcat } from '../../col/cat/useCcat';
import { useComs } from '../../cols/useCols';
import { CmComListContext, CmComListContextValue } from './context';

export const CmTranslationComListContextInZeroCat = function InZeroCat({ children }: { children: React.ReactNode }) {
  const cat = useCcat(true);
  const coms = useComs();

  const value = useMemo((): CmComListContextValue => {
    if (cat == null) return {};

    return {
      list: coms,
      pageTitlePostfix: ' - ' + cat.name,
    };
  }, [cat, coms]);

  return <CmComListContext.Provider value={value}>{children}</CmComListContext.Provider>;
};
