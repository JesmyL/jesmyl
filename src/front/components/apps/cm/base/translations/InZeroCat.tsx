import { useCcat } from '@cm/col/cat/useCcat';
import { useComs } from '@cm/cols/useCols';
import { useMemo } from 'react';
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
export default CmTranslationComListContextInZeroCat;
