import { useAtomValue } from '#shared/lib/atom';
import { ScheduleWidgetMarkdownLiveTranslation } from '../MarkdownLive';
import { markdownTranslationAtom } from './atoms';

export const ScheduleWidgetMarkdownTranslationWindow = () => {
  return <ScheduleWidgetMarkdownLiveTranslation md={useAtomValue(markdownTranslationAtom)} />;
};
