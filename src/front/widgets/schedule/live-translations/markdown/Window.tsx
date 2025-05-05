import { useAtomValue } from 'atomaric';
import { ScheduleWidgetMarkdownLiveTranslation } from '../MarkdownLive';
import { markdownTranslationAtom } from './atoms';

export const ScheduleWidgetMarkdownTranslationWindow = () => {
  return <ScheduleWidgetMarkdownLiveTranslation md={useAtomValue(markdownTranslationAtom)} />;
};
