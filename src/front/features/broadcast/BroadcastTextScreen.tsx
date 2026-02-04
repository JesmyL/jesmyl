import { useScheduleCurrentSchwContext } from '#widgets/schedule/complect/lib/contexts';
import { ScheduleWidgetLiveBroadcast } from '#widgets/schedule/live-broadcast/Live';
import { useIndexSchedules } from '$index/shared/state';
import { useAtomValue } from 'atomaric';
import { takeIsCanShowTextBroadcastAtom } from './atoms';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const BroadcastTextScreen = ({ children }: Props) => {
  if (!useAtomValue(takeIsCanShowTextBroadcastAtom())) return <>{children}</>;

  return <Screen>{children}</Screen>;
};

const Screen = ({ children }: Props) => {
  const schw = useScheduleCurrentSchwContext();
  const schedules = useIndexSchedules();
  const schedule = schedules?.find(sch => sch.w === schw);

  if (schedule === undefined) return <>{children}</>;

  return (
    <ScheduleWidgetLiveBroadcast
      schw={schedule.w}
      isShowMarkdownOnly
    />
  );
};
