import { mylib } from '#shared/lib/my-lib';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useCmMeetingLinkToEvent } from '$cm/basis/lib/contexts/meeting';
import { useMemo, useState } from 'react';
import { IScheduleWidget, IScheduleWidgetDayEventMi, ScheduleComPackEventPath } from 'shared/api';
import { isNIs } from 'shared/utils';

export const MeetingSchPackFace = ({ schedule }: { schedule: IScheduleWidget }) => {
  const link = useCmMeetingLinkToEvent();
  const [isOpenList, setIsOpenList] = useState(false);
  const paths = useMemo(() => {
    const paths = {} as Record<
      ScheduleComPackEventPath,
      { title: string; dayi: number; eventMi: IScheduleWidgetDayEventMi }
    >;

    schedule.days.forEach((day, dayi) => {
      day.list.forEach(event => {
        if (event.atts?.['[cm]:coms'] == null) return;
        paths[`${dayi}/${event.mi}`] = {
          title: schedule.types[event.type].title,
          dayi,
          eventMi: event.mi,
        };
      });
    });

    return paths;
  }, [schedule.days, schedule.types]);

  const pathsKeys = mylib.keys(paths);

  if (!pathsKeys.length) return null;

  return (
    <>
      {pathsKeys.length === 1 ? (
        link({
          children: (
            <BrutalItem
              iconNode={<LazyIcon icon="Calendar02" />}
              title={schedule.title}
              box={<LazyIcon icon="ArrowRight02" />}
              description={paths[pathsKeys[0]].title}
            />
          ),
          search: {
            dayi: paths[pathsKeys[0]].dayi,
            eventMi: paths[pathsKeys[0]].eventMi,
            schw: schedule.w,
          },
        })
      ) : (
        <BrutalItem
          iconNode={<LazyIcon icon="Calendar02" />}
          title={schedule.title}
          onClick={() => setIsOpenList(isNIs)}
          box={isOpenList ? <LazyIcon icon="ArrowUp01" /> : <LazyIcon icon="ArrowDown01" />}
        />
      )}

      {isOpenList &&
        pathsKeys.map(path => {
          return link({
            children: (
              <TheIconButton
                className="pointer m-5"
                icon="ArrowRight02"
                prefix={`${parseInt(path) + 1}-й день ${paths[path].title}`}
              />
            ),
            search: {
              dayi: paths[path].dayi,
              eventMi: paths[path].eventMi,
              schw: schedule.w,
            },
          });
        })}
    </>
  );
};
