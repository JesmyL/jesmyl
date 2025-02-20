import { ScheduleWidgetLiveTranslation } from '#widgets/schedule-widget/live-translations/Live';
import { useParams } from 'react-router-dom';
import { emptyFunc } from 'shared/utils';
import { useIndexSchedules } from '../../../components/index/atoms';
import { useIsCanShowTextTranslation } from '../lib/atoms';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const TranslationTextScreen = ({ children }: Props) => {
  if (!useIsCanShowTextTranslation()[0]) return <>{children}</>;

  return <Screen>{children}</Screen>;
};

const Screen = ({ children }: Props) => {
  const schw = +useParams().schw!;
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
