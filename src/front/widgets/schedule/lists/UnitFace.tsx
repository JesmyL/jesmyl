import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ReactNode, useState } from 'react';
import { IScheduleWidgetListUnit } from 'shared/api';
import { useScheduleWidgetRightsContext } from '../contexts';

export function ScheduleWidgetListUnitFace({
  unitMi,
  unit: topUnit,
  postfix,
}: {
  unitMi?: number;
  unit?: IScheduleWidgetListUnit;
  postfix?: ReactNode;
}) {
  const rights = useScheduleWidgetRightsContext();
  const [isShowMentors, setIsShowMentors] = useState(false);

  const unit = topUnit ?? rights.schedule.lists?.units.find(unit => unit.mi === unitMi);
  if (unit === undefined) return null;
  const cat = rights.schedule.lists.cats[unit.cati];
  if (cat === undefined) return null;
  const mentors = rights.schedule.ctrl.users.filter(user => user.li?.[unit.cati] === -unit.mi);

  return (
    <div className="flex gap-2 my-2">
      <span
        className={'flex gap-2 pointer' + (rights.myUser?.li?.[unit.cati] === -unit.mi ? ' text-x7' : ' text-x3')}
        onClick={() => setIsShowMentors(!isShowMentors)}
      >
        <LazyIcon icon={cat?.icon} />
        {isShowMentors ? (
          mentors.length ? (
            mentors.map(user => user.fio || user.nick).join(', ')
          ) : (
            <span className="italic">{cat.titles[0]}</span>
          )
        ) : (
          <>
            {cat.title}
            <span>{unit.title}</span>
          </>
        )}
      </span>
      {postfix}
    </div>
  );
}
