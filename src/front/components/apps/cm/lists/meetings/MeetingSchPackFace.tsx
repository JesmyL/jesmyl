import { mylib } from '#shared/lib/my-lib';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { IconButton } from '#shared/ui/the-icon/IconButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
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
            iconNode={<LazyIcon icon="Calendar02" />}
            title={schedule.title}
            box={<LazyIcon icon="ArrowRight02" />}
            description={paths[pathsKeys[0]]}
          />
        </Link>
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
          const title = paths[path];

          return (
            <Link
              key={path}
              to={`${schedule.w}/${path}`}
            >
              <IconButton
                className="pointer margin-big-gap"
                icon="ArrowRight02"
                prefix={`${parseInt(path) + 1}-й день ${title}`}
              />
            </Link>
          );
        })}
    </>
  );
};
