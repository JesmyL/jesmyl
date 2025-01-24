import { useMemo, useState } from 'react';
import useSelectedComs from '../useSelectedComs';
import { CmComListContext, CmComListContextValue } from './context';

export const CmTranslationComListContextInSelected = function InSelected({ children }: { children: React.ReactNode }) {
  const currentList = useSelectedComs().selectedComs;
  const [list] = useState(currentList);

  const value = useMemo((): CmComListContextValue => {
    return {
      list,
      pageTitlePostfix: ' - Выбранное',
    };
  }, [list]);

  return <CmComListContext.Provider value={value}>{children}</CmComListContext.Provider>;
};

export default CmTranslationComListContextInSelected;
