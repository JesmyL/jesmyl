import { useMemo } from 'react';
import { useMeetings } from '../../lists/meetings/useMeetings';
import { CmComListContext, CmComListContextValue } from './context';

export const CmTranslationComListContextInMeetings = function InMeetings({ children }: { children: React.ReactNode }) {
  const { currentEvent } = useMeetings();

  const value = useMemo((): CmComListContextValue => {
    if (currentEvent == null) return {};

    return {
      list: currentEvent.coms,
      pageTitlePostfix: ' - ' + currentEvent.name,
    };
  }, [currentEvent]);

  return <CmComListContext.Provider value={value}>{children}</CmComListContext.Provider>;
};
export default CmTranslationComListContextInMeetings;
