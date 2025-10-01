import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import {
  extractScheduleWidgetRole,
  extractScheduleWidgetRoleUser,
  ScheduleWidgetRights,
} from '#widgets/schedule/useScheduleWidget';
import { ReactNode } from 'react';
import {
  customAttUseRights,
  CustomAttUseTaleId,
  IScheduleWidgetListUnit,
  IScheduleWidgetRole,
  IScheduleWidgetTeamGame,
  IScheduleWidgetUser,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetAppAttCustomizableValue,
  ScheduleWidgetAppAttCustomizableValueItem,
  ScheduleWidgetAppAttCustomized,
  ScheduleWidgetCleans,
} from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { ScheduleKeyValueListAttArrayItemKeyChange } from '../../ArrayItemSignChange';
import { KeyValueListAttNumberMember } from '../../KeyValueListAttNumberMember';
import { ScheduleWidgetKeyValueListAttPositionControls } from './AttPositionControls';
import { ScheduleWidgetAttKeyValueListSubItemsRedact } from './SubItems';

export const ScheduleWidgetKeyValueListValueItem = ({
  rights,
  valueKey,
  itemMi,
  scopeProps,
  isRedact,
  value,
  userR,
  att,
  exclusiveUsers,
  exclusiveLists,
  exclusiveRoles,
  exclusiveGames,
  attValue,
  dropdownLists,
  dropdownRoles,
  dropdownTitles,
  dropdownUsers,
  subItems,
}: {
  rights: ScheduleWidgetRights;
  valueKey: string | number | boolean;
  itemMi: number;
  scopeProps: ScheduleDayEventAttachmentScopeProps & { itemMi: number };
  isRedact: boolean;
  value: string | number | (string | number)[] | null;
  userR: number;
  att: ScheduleWidgetAppAttCustomized;
  exclusiveUsers: IScheduleWidgetUser[];
  exclusiveLists: IScheduleWidgetListUnit[] | undefined;
  exclusiveRoles: IScheduleWidgetRole[] | undefined;
  exclusiveGames: IScheduleWidgetTeamGame[] | undefined;
  attValue: ScheduleWidgetAppAttCustomizableValue;
  dropdownLists: IScheduleWidgetListUnit[] | undefined;
  dropdownRoles: IScheduleWidgetRole[] | undefined;
  dropdownTitles: string[] | undefined;
  dropdownUsers: IScheduleWidgetUser[];
  subItems: ((item: ScheduleWidgetAppAttCustomizableValueItem) => ReactNode) | null;
}) => {
  let role: IScheduleWidgetRole | und = undefined;
  let generalNode = null;

  let setSelfRedact = !rights.isCanTotalRedact;

  if (mylib.isNum(valueKey)) {
    generalNode = <KeyValueListAttNumberMember value={valueKey} />;

    if (ScheduleWidgetCleans.checkIsTaleIdUnit(valueKey, CustomAttUseTaleId.Roles))
      role = extractScheduleWidgetRole(rights.schedule, valueKey);

    if (!rights.isCanTotalRedact)
      if (ScheduleWidgetCleans.checkIsTaleIdUnit(valueKey, CustomAttUseTaleId.Roles))
        setSelfRedact =
          !!rights.myUser && extractScheduleWidgetRoleUser(rights.schedule, 0, role)?.login !== rights.myUser.login;
      else if (rights.myUser?.li) {
        const id = Math.trunc(valueKey);
        const unit = rights.schedule.lists.units.find(unit => unit.mi === id);
        if (unit) setSelfRedact = rights.myUser.li[unit.cati] !== -unit.mi;
      }
  }

  return (
    <div
      key={itemMi}
      className={twMerge('dropdown-ancestor', mylib.isArr(value) ? (isRedact ? 'mb-15 mt-10' : 'mb-10') : 'mb-2')}
    >
      <div className="flex gap-2 between mb-2">
        <div className="flex gap-2">
          {generalNode !== null ? (
            generalNode
          ) : mylib.isBool(valueKey) ? (
            <div className={twMerge('flex gap-2 text-x3', valueKey && 'opacity-50')}>
              <TheIconSendButton
                className="self-start relative z-15"
                icon={valueKey ? 'CheckmarkSquare02' : 'Square'}
                disabled={!customAttUseRights.checkIsCan(userR, att.U)}
                onSend={() =>
                  schDayEventsTsjrpcClient.setKeyValueAttachmentKey({
                    props: scopeProps,
                    itemMi,
                    value: !valueKey,
                  })
                }
              />
              {mylib.isNum(value) && <KeyValueListAttNumberMember value={value} />}
            </div>
          ) : (
            mylib.isStr(valueKey) && (
              <StrongEditableField
                className="ml-3 -mt-4 mood-for-2 relative z-5"
                value={valueKey}
                isRedact={isRedact}
                isSelfRedact
                onSend={value =>
                  schDayEventsTsjrpcClient.setKeyValueAttachmentKey({
                    props: scopeProps,
                    itemMi,
                    value,
                  })
                }
              />
            )
          )}
          {isRedact && (
            <>
              {!mylib.isNum(value) &&
                !mylib.isBool(valueKey) &&
                !mylib.isNil(value) &&
                (value === '+' || value.length < 1) && (
                  <Button size="icon">
                    <TheIconSendButton
                      icon={mylib.isArr(value) ? 'Text' : 'LeftToRightListDash'}
                      onSend={() =>
                        schDayEventsTsjrpcClient.setKeyValueAttachmentValue({
                          props: scopeProps,
                          itemMi,
                          value: mylib.isArr(value) ? '+' : [],
                        })
                      }
                    />
                  </Button>
                )}
              {mylib.isNum(valueKey) && (
                <ScheduleKeyValueListAttArrayItemKeyChange
                  dayEventAttScopeProps={scopeProps}
                  theKey={valueKey}
                  users={exclusiveUsers}
                  lists={exclusiveLists}
                  roles={exclusiveRoles}
                  games={exclusiveGames}
                />
              )}
            </>
          )}
        </div>
        {isRedact && customAttUseRights.checkIsCan(userR, att.U) && (
          <ScheduleWidgetKeyValueListAttPositionControls
            dayEventAttScopeProps={scopeProps}
            itemMi={itemMi}
            value={value}
          />
        )}
      </div>
      <ScheduleWidgetAttKeyValueListSubItemsRedact
        isRedact={isRedact}
        attValue={attValue}
        dayEventAttScopeProps={scopeProps}
        dropdownLists={dropdownLists}
        dropdownRoles={dropdownRoles}
        dropdownTitles={dropdownTitles}
        dropdownUsers={dropdownUsers}
        itemMi={itemMi}
        setSelfRedact={setSelfRedact}
        subItems={subItems}
        value={value}
        valueKey={valueKey}
        att={att}
        userR={userR}
      />
    </div>
  );
};
