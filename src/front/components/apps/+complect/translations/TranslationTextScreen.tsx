import { useScheduleCurrentSchwContext } from '#widgets/schedule/complect/lib/contexts';
import { ScheduleWidgetLiveTranslation } from '#widgets/schedule/live-translations/Live';
import { useIndexSchedules } from '$index/atoms';
import { emptyFunc } from 'shared/utils';
import { useIsCanShowTextTranslation } from './atoms';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const TranslationTextScreen = ({ children }: Props) => {
  if (!useIsCanShowTextTranslation()[0]) return <>{children}</>;

  return <Screen>{children}</Screen>;
};

const Screen = ({ children }: Props) => {
  const schw = useScheduleCurrentSchwContext();
  const schedules = useIndexSchedules();
  const schedule = schedules?.find(sch => sch.w === schw);

  if (schedule === undefined) return <>{children}</>;

  return (
    <ScheduleWidgetLiveTranslation
      onClose={emptyFunc}
      schw={schedule.w}
      isShowMarkdownOnly
    />
  );
};
