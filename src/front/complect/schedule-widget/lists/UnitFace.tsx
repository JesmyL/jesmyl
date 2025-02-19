import { LazyIcon } from '#shared/ui/icon';
import { ReactNode, useState } from 'react';
import { IScheduleWidgetListUnit } from 'shared/api';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';

type Props = {
  unitMi?: number;
  unit?: IScheduleWidgetListUnit;
  postfix?: ReactNode;
};

export const ScheduleWidgetListUnitFace = ({ unitMi, unit: topUnit, postfix }: Props) => {
  const rights = useScheduleWidgetRightsContext();
  const [isShowMentors, setIsShowMentors] = useState(false);

  const unit = topUnit ?? rights.schedule.lists?.units.find(unit => unit.mi === unitMi);
  if (unit === undefined) return null;
  const cat = rights.schedule.lists.cats[unit.cati];
  if (cat === undefined) return null;
  const mentors = rights.schedule.ctrl.users.filter(user => user.li?.[unit.cati] === -unit.mi);

  return (
    <div className="flex flex-gap margin-gap-v">
      <span
        className={'flex flex-gap pointer' + (rights.myUser?.li?.[unit.cati] === -unit.mi ? ' color--7' : ' color--3')}
        onClick={() => setIsShowMentors(!isShowMentors)}
      >
        <LazyIcon icon={cat?.icon} />
        {isShowMentors ? (
          mentors.length ? (
            mentors.map(user => user.fio || user.nick).join(', ')
          ) : (
            <span className="text-italic">{cat.titles[0]}</span>
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
};
