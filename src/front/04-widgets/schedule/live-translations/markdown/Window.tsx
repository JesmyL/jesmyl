import { useAtomValue } from 'front/08-shared/lib/atoms';
import { ScheduleWidgetMarkdownLiveTranslation } from '../MarkdownLive';
import { markdownTranslationAtom } from './atoms';

export const ScheduleWidgetMarkdownTranslationWindow = () => {
  return <ScheduleWidgetMarkdownLiveTranslation md={useAtomValue(markdownTranslationAtom)} />;
};
