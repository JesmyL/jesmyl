import BrutalItem from 'front/complect/brutal-item/BrutalItem';
import IconButton from 'front/complect/the-icon/IconButton';
import { IconArrowRight02StrokeRounded } from 'front/complect/the-icon/icons/arrow-right-02';
import { IconCalendar02StrokeRounded } from 'front/complect/the-icon/icons/calendar-02';
import { mylib } from 'front/utils';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IScheduleWidget, ScheduleComPackEventPath } from 'shared/api';

export const MeetingSchPackFace = ({ schedule }: { schedule: IScheduleWidget }) => {
  const [isOpenList, setIsOpenList] = useState<unknown>(false);
  const paths = useMemo(() => {
    const paths = {} as Record<ScheduleComPackEventPath, string>;

    schedule.days.forEach((day, dayi) => {
      day.list.forEach(event => {
        if (event.atts?.['[cm]:coms'] == null) return;
        paths[`${dayi}/${event.mi}`] = schedule.types[event.type].title;
      });
    });

    return paths;
  }, [schedule.days, schedule.types]);

  const isSetDayCount =
    schedule.days.filter(day => day.list.some(event => '[cm]:coms' in (event.atts ?? {}))).length > 1;

  return (
    <>
      <BrutalItem
        icon={<IconCalendar02StrokeRounded />}
        title={schedule.title}
        onClick={setIsOpenList}
      />
      {isOpenList &&
        mylib.keys(paths).map(path => {
          const title = paths[path];

          return (
            <Link
              key={path}
              to={`${schedule.w}/${path}`}
            >
              <IconButton
                className="pointer margin-big-gap"
                Icon={IconArrowRight02StrokeRounded}
                prefix={`${isSetDayCount ? `${parseInt(path) + 1}-й день ` : ''}${title}`}
              />
            </Link>
          );
        })}
    </>
  );
};
