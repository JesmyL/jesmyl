import { useMemo } from 'react';
import useSelectedComs from '../../../../../07-basis/lib/hooks/cm/useSelectedComs';
import { CmComListContext, CmComListContextValue } from './context';

export const CmTranslationComListContextInSelected = ({ children }: { children: React.ReactNode }) => {
  const list = useSelectedComs().selectedComs;

  const value = useMemo((): CmComListContextValue => {
    return {
      list,
      pageTitlePostfix: ' - Выбранное',
    };
  }, [list]);

  return <CmComListContext.Provider value={value}>{children}</CmComListContext.Provider>;
};
