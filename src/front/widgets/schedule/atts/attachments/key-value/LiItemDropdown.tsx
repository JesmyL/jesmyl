import { mylib } from '#shared/lib/my-lib';
import { SendableDropdown } from '#shared/ui/sends/dropdown/SendableDropdown';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useState } from 'react';
import {
  CustomAttUseTaleId,
  IScheduleWidgetListUnit,
  IScheduleWidgetRole,
  IScheduleWidgetUser,
  ScheduleWidgetAppAttCustomizableValueItem,
} from 'shared/api';
import { KeyValueListAttNumberMember } from './KeyValueListAttNumberMember';

const zeroFunc = () => 0;

type Props = {
  value: (string | number)[];
  topValues: ScheduleWidgetAppAttCustomizableValueItem[];
  users: IScheduleWidgetUser[] | und;
  titles: string[] | und;
  roles: IScheduleWidgetRole[] | und;
  lists: IScheduleWidgetListUnit[] | und;
  onSend: (value: string | number) => Promise<unknown>;
};

export function ScheduleKeyValueListAttLiItemDropdown({
  value,
  users: topUsers,
  titles: topTitles,
  roles: topRoles,
  lists: topLists,
  topValues,
  onSend,
}: Props) {
  const [isShowAll, setIsShowAll] = useState(false);
  const filter = (id: number) =>
    !value.includes(id) &&
    (isShowAll ||
      !topValues.some(value => value[0] === id || value[1] === id || (mylib.isArr(value[1]) && value[1].includes(id))));

  const sort = isShowAll
    ? zeroFunc
    : (aid: number, bid: number) => {
        const isAIn = topValues.some(
          value => value[0] === aid || value[1] === aid || (mylib.isArr(value[1]) && value[1].includes(aid)),
        );
        const isBIn = topValues.some(
          value => value[0] === bid || value[1] === bid || (mylib.isArr(value[1]) && value[1].includes(bid)),
        );

        return isAIn ? (isBIn ? 0 : 1) : -1;
      };
  const map = (id: number) => ({
    id,
    title: <KeyValueListAttNumberMember value={id} />,
  });

  const titles =
    topTitles?.map(title => {
      if (value.includes(title)) return null;

      return {
        id: title,
        title,
      };
    }) ?? [];

  const users =
    topUsers
      ?.map(user => user.mi + CustomAttUseTaleId.Users)
      .filter(filter)
      .sort(sort)
      .map(map) ?? [];
  const roles =
    topRoles
      ?.map(user => user.mi + CustomAttUseTaleId.Roles)
      .filter(filter)
      .sort(sort)
      .map(map) ?? [];
  const lists =
    topLists
      ?.map(user => user.mi + CustomAttUseTaleId.Lists)
      .filter(filter)
      .sort(sort)
      .map(map) ?? [];

  if (lists.length === 0 && roles.length === 0 && users.length === 0 && titles.length === 0) return null;

  return (
    <div className="flex gap-2">
      <LazyIcon
        className="pointer"
        icon={isShowAll ? 'View' : 'ViewOffSlash'}
        onClick={() => setIsShowAll(!isShowAll)}
      />
      <SendableDropdown
        placeholder="Из списка"
        className="mood-for-2"
        items={[...titles, ...roles, ...lists, ...users]}
        onSend={onSend}
      />
    </div>
  );
}
