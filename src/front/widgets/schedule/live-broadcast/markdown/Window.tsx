import { useAtomValue } from 'atomaric';
import { ScheduleWidgetMarkdownLiveBroadcast } from '../MarkdownLive';
import { markdownBroadcastAtom } from './atoms';

export const ScheduleWidgetMarkdownBroadcastWindow = () => {
  return <ScheduleWidgetMarkdownLiveBroadcast md={useAtomValue(markdownBroadcastAtom)} />;
};
