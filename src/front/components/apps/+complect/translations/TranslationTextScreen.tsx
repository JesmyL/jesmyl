import { useParams } from 'react-router-dom';
import { emptyFunc } from '../../../../../back/complect/utils';
import { ScheduleWidgetLiveTranslation } from '../../../../complect/schedule-widget/live-translations/Live';
import { useIndexSchedules } from '../../../index/molecules';
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
  const schw = +useParams().schw!;
  const schedules = useIndexSchedules();
  const schedule = schedules.list.find(sch => sch.w === schw);

  if (schedule === undefined) return <>{children}</>;

  return (
    <ScheduleWidgetLiveTranslation
      onClose={emptyFunc}
      schedule={schedule}
      isShowMarkdownOnly
    />
  );
};
