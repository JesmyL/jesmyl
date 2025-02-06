import BrutalItem from 'front/complect/brutal-item/BrutalItem';
import IconButton from 'front/complect/the-icon/IconButton';
import { IconArrowDown01StrokeRounded } from 'front/complect/the-icon/icons/arrow-down-01';
import { IconArrowRight02StrokeRounded } from 'front/complect/the-icon/icons/arrow-right-02';
import { IconArrowUp01StrokeRounded } from 'front/complect/the-icon/icons/arrow-up-01';
import { IconCalendar02StrokeRounded } from 'front/complect/the-icon/icons/calendar-02';
import { mylib } from 'front/utils';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IScheduleWidget, ScheduleComPackEventPath } from 'shared/api';
import { isNIs } from 'shared/utils';

export const MeetingSchPackFace = ({ schedule }: { schedule: IScheduleWidget }) => {
  const [isOpenList, setIsOpenList] = useState(false);
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

  const pathsKeys = mylib.keys(paths);

  if (!pathsKeys.length) return null;

  return (
    <>
      {pathsKeys.length === 1 ? (
        <Link to={`${schedule.w}/${pathsKeys[0]}`}>
          <BrutalItem
            icon={<IconCalendar02StrokeRounded />}
            title={schedule.title}
            box={<IconArrowRight02StrokeRounded />}
            description={paths[pathsKeys[0]]}
          />
        </Link>
      ) : (
        <BrutalItem
          icon={<IconCalendar02StrokeRounded />}
          title={schedule.title}
          onClick={() => setIsOpenList(isNIs)}
          box={isOpenList ? <IconArrowUp01StrokeRounded /> : <IconArrowDown01StrokeRounded />}
        />
      )}

      {isOpenList &&
        pathsKeys.map(path => {
          const title = paths[path];

          return (
            <Link
              key={path}
              to={`${schedule.w}/${path}`}
            >
              <IconButton
                className="pointer margin-big-gap"
                Icon={IconArrowRight02StrokeRounded}
                prefix={`${parseInt(path) + 1}-й день ${title}`}
              />
            </Link>
          );
        })}
    </>
  );
};
