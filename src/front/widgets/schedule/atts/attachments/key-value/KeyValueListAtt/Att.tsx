import { Button } from '#shared/components/ui/button';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ReactNode } from 'react';
import {
  customAttUseRights,
  CustomAttUseRights,
  CustomAttUseTaleId,
  IScheduleWidgetListUnit,
  IScheduleWidgetRole,
  IScheduleWidgetTeamGame,
  IScheduleWidgetUser,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetAppAttCustomizableValue,
  ScheduleWidgetAppAttCustomizableValueItem,
  ScheduleWidgetAppAttCustomized,
  ScheduleWidgetRightsCtrl,
} from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { ScheduleKeyValueListAttStatistic } from '../Statistic';
import { ScheduleWidgetKeyValueItemGrabber } from './lib/itemGrabber';
import { scheduleWidgetKeyValueListAttMakeGamesAdder } from './lib/makeGamesAdder';
import { scheduleWidgetKeyValueListAttMakeListsAdder } from './lib/makeListsAdder';
import { scheduleWidgetKeyValueListAttMakeRolesAdder } from './lib/makeRolesAdder';
import { scheduleWidgetKeyValueListAttMakeTitlesAdder } from './lib/makeTitlesAdder';
import { scheduleWidgetKeyValueListAttMakeUsersAdder } from './lib/makeUsersAdder';
import { ScheduleWidgetKeyValueListValueItem } from './ui/ValueItem';

export function ScheduleKeyValueListAtt({
  value: attValue,
  att,
  isRedact,
  dayEventAttScopeProps,
}: {
  value: ScheduleWidgetAppAttCustomizableValue;
  att: ScheduleWidgetAppAttCustomized;
  isRedact: boolean;
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps;
}) {
  const rights = useScheduleWidgetRightsContext();

  let subItems: ((item: ScheduleWidgetAppAttCustomizableValueItem) => ReactNode) | null = null;

  let insertionNode = null;
  let checkboxes: ReactNode = null;
  let titles: ReactNode[] | nil = null;
  let games: ReactNode[] | nil = null;
  let roles: ReactNode[] | nil = null;
  let lists: ReactNode[] | nil = null;
  let users: ReactNode[] | nil = null;
  let dropdownUsers: IScheduleWidgetUser[] = [];
  let dropdownLists: IScheduleWidgetListUnit[] | und;
  let dropdownRoles: IScheduleWidgetRole[] | und;
  let dropdownTitles: string[] | und;

  let exclusiveUsers: IScheduleWidgetUser[] = [];
  let exclusiveLists: IScheduleWidgetListUnit[] | und;
  let exclusiveRoles: IScheduleWidgetRole[] | und;
  let exclusiveGames: IScheduleWidgetTeamGame[] | und;

  const userR = rights.myUser?.R ?? rights.schedule.ctrl.defu;

  if (isRedact) {
    checkboxes = customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.Checkboxes) && (
      <Button className="flex gap-2 my-2">
        <LazyIcon icon="CheckmarkSquare02" />
        <span className="italic">Пункт</span>
        <TheIconSendButton
          icon="PlusSign"
          onSend={() =>
            schDayEventsTsjrpcClient.putKeyValueAttachment({
              props: dayEventAttScopeProps,
              key: false,
              value: '',
            })
          }
        />
      </Button>
    );

    if (customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.Titles)) {
      dropdownTitles = att.titles;

      titles = scheduleWidgetKeyValueListAttMakeTitlesAdder(att, attValue, dayEventAttScopeProps);
    }

    const filterExclusive = (plus: CustomAttUseTaleId) => {
      return (item: { mi: number; title?: string }) =>
        item.title && !attValue.values?.some(li => li[0] === item.mi + plus || li[1] === item.mi + plus);
    };

    if (customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.Games)) {
      exclusiveGames = rights.schedule.games?.list.filter(filterExclusive(CustomAttUseTaleId.Games));

      const v = scheduleWidgetKeyValueListAttMakeGamesAdder(att, dayEventAttScopeProps, rights, exclusiveGames);
      games = v.games;
      subItems = v.subItems;
    }

    if (customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.Roles)) {
      dropdownRoles = rights.schedule.ctrl.roles.filter(role =>
        ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(att.roles, role.cati || 0),
      );
      exclusiveRoles = dropdownRoles.filter(filterExclusive(CustomAttUseTaleId.Roles));

      roles = scheduleWidgetKeyValueListAttMakeRolesAdder(dayEventAttScopeProps, exclusiveRoles, rights);
    }

    if (customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.Lists)) {
      dropdownLists = rights.schedule.lists.units.filter(unit =>
        ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(att.list, unit.cati),
      );
      exclusiveLists = dropdownLists.filter(filterExclusive(CustomAttUseTaleId.Lists));

      lists = scheduleWidgetKeyValueListAttMakeListsAdder(dayEventAttScopeProps, exclusiveLists);
    }

    if (customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.Users)) {
      dropdownUsers = [...rights.schedule.ctrl.users].sort((a, b) =>
        (a.fio || a.nick || '') < (b.fio || b.nick || '') ? -1 : (a.fio || a.nick) === (b.fio || b.nick) ? 0 : 1,
      );

      exclusiveUsers = dropdownUsers.filter(user => {
        return (
          (user.nick || user.fio) &&
          !attValue.values?.some(
            li => li[0] === user.mi + CustomAttUseTaleId.Users || li[1] === user.mi + CustomAttUseTaleId.Users,
          )
        );
      });

      users = scheduleWidgetKeyValueListAttMakeUsersAdder(att, dayEventAttScopeProps, exclusiveUsers);
    }

    const itemNode = (
      <Button className="flex gap-2 my-7">
        <LazyIcon icon="Text" />
        Пункт
        <TheIconSendButton
          icon="PlusSign"
          onSend={() =>
            schDayEventsTsjrpcClient.putKeyValueAttachment({
              props: dayEventAttScopeProps,
              key: 'Пункт',
              value: '+',
            })
          }
        />
      </Button>
    );

    if (checkboxes || (users || titles || roles || lists || games || null)?.length) {
      insertionNode = (
        <>
          <div className="my-2 text-x7">Вставить поле ввода:</div>
          {itemNode}
          <div className="my-10">{checkboxes}</div>
          <div className="my-10">{titles}</div>
          <div className="my-10">{roles}</div>
          <div className="my-10">{lists}</div>
          <div className="my-10">{users}</div>
          <div className="my-10">{games}</div>
        </>
      );
    } else insertionNode = itemNode || <div className="my-10 italic">{att.title}. Вставлять нечего</div>;
  }

  return (
    <div>
      <ScheduleWidgetKeyValueItemGrabber.Root
        onDrop={({ grabbedValue, targetValue }) => {
          return schDayEventsTsjrpcClient.transferKeyValueAttachment({
            props: dayEventAttScopeProps,
            grabbedItemMi: grabbedValue,
            targetItemMi: targetValue,
          });
        }}
      >
        {attValue.values?.map(([key, value, itemMi]) => {
          if (!isRedact && !value) return null;

          return (
            <ScheduleWidgetKeyValueListValueItem
              key={itemMi}
              isRedact={isRedact}
              att={att}
              attKey={key}
              userR={userR}
              value={value}
              itemMi={itemMi}
              rights={rights}
              attValue={attValue}
              scopeProps={{ ...dayEventAttScopeProps, itemMi }}
              exclusiveUsers={exclusiveUsers}
              exclusiveLists={exclusiveLists}
              exclusiveRoles={exclusiveRoles}
              exclusiveGames={exclusiveGames}
              dropdownLists={dropdownLists}
              dropdownRoles={dropdownRoles}
              dropdownTitles={dropdownTitles}
              dropdownUsers={dropdownUsers}
              subItems={subItems}
            />
          );
        })}
        <div className="flex flex-end">
          <ScheduleWidgetKeyValueItemGrabber.Drop
            render={({ className, onDrop }) => (
              <Button
                icon="PinLocation01"
                className={twMerge(className, 'mr-7 text-x7')}
                onClick={() => onDrop(null)}
              />
            )}
            value={null}
          />
        </div>
        {insertionNode}
        <ScheduleKeyValueListAttStatistic list={attValue.values} />
      </ScheduleWidgetKeyValueItemGrabber.Root>
    </div>
  );
}
