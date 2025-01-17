import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { mylib } from 'front/utils';
import Markdown from 'markdown-to-jsx';
import { ReactNode } from 'react';
import {
  CustomAttUseRights,
  customAttUseRights,
  CustomAttUseTaleId,
  IScheduleWidgetListUnit,
  IScheduleWidgetRole,
  IScheduleWidgetTeamGame,
  IScheduleWidgetUser,
  ScheduleWidgetAppAttCustomizableValue,
  ScheduleWidgetAppAttCustomizableValueItem,
  ScheduleWidgetAppAttCustomized,
  ScheduleWidgetCleans,
  ScheduleWidgetRightsCtrl,
} from 'shared/api';
import { itIt, makeRegExp } from 'shared/utils';
import styled, { css } from 'styled-components';
import { IconCheckmarkSquare02StrokeRounded } from '../../../../../complect/the-icon/icons/checkmark-square-02';
import { IconDelete02StrokeRounded } from '../../../../../complect/the-icon/icons/delete-02';
import { IconLeftToRightListDashStrokeRounded } from '../../../../../complect/the-icon/icons/left-to-right-list-dash';
import { IconPlusSignStrokeRounded } from '../../../../../complect/the-icon/icons/plus-sign';
import { IconSquareStrokeRounded } from '../../../../../complect/the-icon/icons/square';
import { IconTextStrokeRounded } from '../../../../../complect/the-icon/icons/text';
import { MoveListItemArrowIcon } from '../../../../MoveListItemArrowIcon';
import StrongEditableField from '../../../../strong-control/field/StrongEditableField';
import { IconBasketball01StrokeRounded } from '../../../../the-icon/icons/basketball-01';
import ScheduleWidgetRoleFace from '../../../control/roles/RoleFace';
import ScheduleWidgetListUnitFace from '../../../lists/UnitFace';
import {
  extractScheduleWidgetRole,
  extractScheduleWidgetRoleUser,
  takeStrongScopeMaker,
  useScheduleWidgetRightsContext,
} from '../../../useScheduleWidget';
import ScheduleKeyValueListAttArrayItemKeyChange from './ArrayItemSignChange';
import KeyValueListAttNumberMember from './KeyValueListAttNumberMember';
import ScheduleKeyValueListAttLiItemDropdown from './LiItemDropdown';
import ScheduleKeyValueListAttStatistic from './Statistic';

export default function ScheduleKeyValueListAtt({
  value: attValue,
  scope,
  att,
  isRedact,
}: {
  value: ScheduleWidgetAppAttCustomizableValue;
  scope: string;
  att: ScheduleWidgetAppAttCustomized;
  isRedact: boolean;
}) {
  const attScope = scope + ' keyValue';
  const rights = useScheduleWidgetRightsContext();

  let subItems: ((item: ScheduleWidgetAppAttCustomizableValueItem, itemScope: string) => ReactNode) | null = null;

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
      <div className="flex flex-gap margin-gap-v">
        <IconCheckmarkSquare02StrokeRounded />
        <span className="text-italic">Пункт</span>
        <EvaSendButton
          // scope={attScope}
          // fieldName=""
          // fieldKey={false}
          // fieldValue=""
          Icon={IconPlusSignStrokeRounded}
          onSend={async () => {}}
        />
      </div>
    );

    if (customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.Titles)) {
      dropdownTitles = att.titles;

      titles = att.titles
        ?.map((title, titlei) => {
          if (!title || attValue.values?.some(li => li[0] === title)) return null;

          return customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.CheckTitles) ? (
            <div
              key={titlei}
              className="flex flex-gap"
            >
              <IconCheckmarkSquare02StrokeRounded />
              {title}
              <EvaSendButton
                Icon={IconPlusSignStrokeRounded}
                // scope={attScope}
                // fieldName=""
                // fieldKey={false}
                // fieldValue={title}
                onSend={async () => {}}
              />
            </div>
          ) : (
            <div
              key={titlei}
              className="flex flex-gap"
            >
              {title}
              <EvaSendButton
                Icon={IconPlusSignStrokeRounded}
                // scope={attScope}
                // fieldName=""
                // fieldKey={title}
                // fieldValue="+"
                onSend={async () => {}}
              />
            </div>
          );
        })
        .filter(itIt);
    }

    const filterExclusive = (plus: CustomAttUseTaleId) => {
      return (item: { mi: number; title?: string }) =>
        item.title && !attValue.values?.some(li => li[0] === item.mi + plus || li[1] === item.mi + plus);
    };

    if (customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.Games)) {
      exclusiveGames = rights.schedule.games?.list.filter(filterExclusive(CustomAttUseTaleId.Games));

      subItems = ([key, value], itemScope) => {
        if (!mylib.isNum(key) || !mylib.isArr(value) || rights.schedule.games == null) return;
        const gameMi = key - CustomAttUseTaleId.Games;

        const game = rights.schedule.games.list.find(game => game.mi === gameMi);
        if (game == null) return;

        return (
          <>
            {game.teams.map(team => {
              if (value.some(val => (mylib.isStr(val) ? makeRegExp(`/${team.title}/i`).test(val) : false))) return null;

              return (
                <div key={team.mi}>
                  <EvaSendButton
                    Icon={IconPlusSignStrokeRounded}
                    // scope={itemScope}
                    // fieldName="value list"
                    // fieldValue={
                    //   `####${team.title.toUpperCase()}\n\n+ ` +
                    //   team.users
                    //     .map(({ mi }) => rights.schedule.ctrl.users.find(user => user.mi === mi)?.fio ?? '')
                    //     .filter(itIt)
                    //     .join('\n+ ')
                    // }
                    prefix={team.title}
                    onSend={async () => {}}
                  />
                </div>
              );
            })}
          </>
        );
      };

      games = exclusiveGames
        ?.map(game => {
          return (
            <div
              key={game.mi}
              className="flex flex-gap margin-gap-v"
            >
              {customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.CheckGames) ? (
                <>
                  <IconCheckmarkSquare02StrokeRounded />
                  <IconBasketball01StrokeRounded />
                  {game.title}
                  <EvaSendButton
                    Icon={IconPlusSignStrokeRounded}
                    // scope={attScope}
                    // fieldName=""
                    // fieldKey={false}
                    // fieldValue={game.mi + CustomAttUseTaleId.Games}
                    onSend={async () => {}}
                  />
                </>
              ) : (
                <>
                  <IconBasketball01StrokeRounded />
                  {game.title}
                  <EvaSendButton
                    Icon={IconPlusSignStrokeRounded}
                    // scope={attScope}
                    // fieldName=""
                    // fieldKey={game.mi + CustomAttUseTaleId.Games}
                    // fieldValue={[]}
                    onSend={async () => {}}
                  />
                </>
              )}
            </div>
          );
        })
        .filter(itIt);
    }

    if (customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.Roles)) {
      dropdownRoles = rights.schedule.ctrl.roles.filter(role =>
        ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(att.roles, role.cati || 0),
      );
      exclusiveRoles = dropdownRoles.filter(filterExclusive(CustomAttUseTaleId.Roles));

      roles = exclusiveRoles.map(role => (
        <div
          key={role.mi}
          className="flex flex-gap margin-gap-v"
        >
          <ScheduleWidgetRoleFace
            role={role}
            schedule={rights.schedule}
          />
          <EvaSendButton
            Icon={IconPlusSignStrokeRounded}
            // scope={attScope}
            // fieldName=""
            // fieldKey={role.mi}
            // fieldValue="+"

            onSend={async () => {}}
          />
        </div>
      ));
    }

    if (customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.Lists)) {
      dropdownLists = rights.schedule.lists.units.filter(unit =>
        ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(att.list, unit.cati),
      );
      exclusiveLists = dropdownLists.filter(filterExclusive(CustomAttUseTaleId.Lists));

      lists = exclusiveLists.map(unit => (
        <ScheduleWidgetListUnitFace
          key={unit.mi}
          unit={unit}
          postfix={
            <EvaSendButton
              Icon={IconPlusSignStrokeRounded}
              // scope={attScope}
              // fieldName=""
              // fieldKey={unit.mi + CustomAttUseTaleId.Lists}
              // fieldValue="+"
              onSend={async () => {}}
            />
          }
        />
      ));
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

      users = exclusiveUsers.map(user =>
        customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.CheckUsers) ? (
          <div
            key={user.mi}
            className="flex flex-gap"
          >
            <IconCheckmarkSquare02StrokeRounded />
            {user.fio || user.nick}
            <EvaSendButton
              Icon={IconPlusSignStrokeRounded}
              // scope={attScope}
              // fieldName=""
              // fieldKey={false}
              // fieldValue={user.mi + CustomAttUseTaleId.Users}
              onSend={async () => {}}
            />
          </div>
        ) : (
          <div
            key={user.mi}
            className="flex flex-gap"
          >
            {user.fio || user.nick}
            <EvaSendButton
              Icon={IconPlusSignStrokeRounded}
              // scope={attScope}
              // fieldName=""
              // fieldKey={user.mi + CustomAttUseTaleId.Users}
              // fieldValue="+"
              onSend={async () => {}}
            />
          </div>
        ),
      );
    }

    const itemNode = (
      <div className="flex flex-gap margin-big-gap-v">
        <IconTextStrokeRounded />
        Пункт
        <EvaSendButton
          Icon={IconPlusSignStrokeRounded}
          // scope={attScope}
          // fieldName=""
          // fieldKey="Пункт"
          // fieldValue="+"
          onSend={async () => {}}
        />
      </div>
    );

    if (checkboxes || (users || titles || roles || lists || games || null)?.length) {
      insertionNode = (
        <>
          <div className="margin-gap-v color--7">Вставить поле ввода:</div>
          {itemNode}
          <div className="margin-big-gap-v">{checkboxes}</div>
          <div className="margin-big-gap-v">{titles}</div>
          <div className="margin-big-gap-v">{roles}</div>
          <div className="margin-big-gap-v">{lists}</div>
          <div className="margin-big-gap-v">{users}</div>
          <div className="margin-big-gap-v">{games}</div>
        </>
      );
    } else
      insertionNode = itemNode || <div className="margin-big-gap-v text-italic">{att.title}. Вставлять нечего</div>;
  }

  return (
    <div>
      {attValue.values?.map(([key, value, itemMi], itemi, itema) => {
        if (!isRedact && !value) return null;

        const itemScope = takeStrongScopeMaker(attScope, ' itemMi/', itemMi);
        let role: IScheduleWidgetRole | und = undefined;
        let generalNode = null;

        let setSelfRedact = !rights.isCanTotalRedact;

        if (mylib.isNum(key)) {
          generalNode = <KeyValueListAttNumberMember value={key} />;

          if (ScheduleWidgetCleans.checkIsTaleIdUnit(key, CustomAttUseTaleId.Roles))
            role = extractScheduleWidgetRole(rights.schedule, key);

          if (!rights.isCanTotalRedact)
            if (ScheduleWidgetCleans.checkIsTaleIdUnit(key, CustomAttUseTaleId.Roles))
              setSelfRedact =
                !!rights.myUser &&
                extractScheduleWidgetRoleUser(rights.schedule, 0, role)?.login !== rights.myUser.login;
            else if (rights.myUser?.li) {
              const id = Math.trunc(key);
              const unit = rights.schedule.lists.units.find(unit => unit.mi === id);
              if (unit) setSelfRedact = rights.myUser.li[unit.cati] !== -unit.mi;
            }
        }

        return (
          <div
            key={itemMi}
            className={
              'dropdown-ancestor' +
              (mylib.isArr(value)
                ? isRedact
                  ? ' margin-giant-gap-b margin-big-gap-t'
                  : ' margin-big-gap-b'
                : ' margin-gap-b')
            }
          >
            <div className="flex flex-gap between margin-gap-b">
              <div className="flex flex-gap">
                {generalNode !== null ? (
                  generalNode
                ) : mylib.isBool(key) ? (
                  <div className={'flex flex-gap color--3' + (key ? ' fade-05' : '')}>
                    <EvaSendButton
                      // scope={itemScope}
                      // fieldName="key"
                      // fieldValue={!key}
                      className="self-start relative z-index:15"
                      // cud="U"
                      Icon={key ? IconCheckmarkSquare02StrokeRounded : IconSquareStrokeRounded}
                      // isCanSend={!!scope && customAttUseRights.checkIsCan(userR, att.U)}
                      onSend={async () => {}}
                    />
                    {mylib.isNum(value) && <KeyValueListAttNumberMember value={value} />}
                  </div>
                ) : (
                  mylib.isStr(key) && (
                    <StrongEditableField
                      // scope={itemScope}
                      // fieldName="key"
                      className="margin-gap-l mood-for-2 relative z-index:5"
                      value={key}
                      isRedact={isRedact}
                      setSelfRedact
                      onSend={async () => {}}
                    />
                  )
                )}
                {isRedact && (
                  <>
                    {!mylib.isNum(value) &&
                      !mylib.isBool(key) &&
                      !mylib.isNil(value) &&
                      (value === '+' || value.length < 1) && (
                        <EvaSendButton
                          // scope={itemScope}
                          // cud="U"
                          // fieldName="value"
                          // fieldValue={mylib.isArr(value) ? '+' : []}
                          Icon={mylib.isArr(value) ? IconTextStrokeRounded : IconLeftToRightListDashStrokeRounded}
                          onSend={async () => {}}
                        />
                      )}
                    {mylib.isNum(key) && (
                      <ScheduleKeyValueListAttArrayItemKeyChange
                        scope={itemScope}
                        theKey={key}
                        users={exclusiveUsers}
                        lists={exclusiveLists}
                        roles={exclusiveRoles}
                        games={exclusiveGames}
                      />
                    )}
                  </>
                )}
              </div>
              {isRedact && !!scope && customAttUseRights.checkIsCan(userR, att.U) && (
                <div className={'flex flex-gap' + (mylib.isStr(value) ? ' margin-giant-gap-r' : '')}>
                  {itema.length > 1 && (
                    <EvaSendButton
                      // scope={attScope}
                      // fieldName="move"
                      // fieldValue={itemi === 0 ? 2 : itemi - 1}
                      // fieldKey={itemMi}
                      className="relative z-index:15 color--7"
                      // cud="U"
                      Icon={MoveListItemArrowIcon(itemi)}
                      onSend={async () => {}}
                    />
                  )}
                  <EvaSendButton
                    // scope={attScope}
                    // fieldName=""
                    // fieldKey={itemMi}
                    className="relative z-index:15 color--ko"
                    // cud="D"
                    confirm="Удалить пункт?"
                    Icon={IconDelete02StrokeRounded}
                    onSend={async () => {}}
                  />
                </div>
              )}
            </div>
            {(isRedact || value !== '+') &&
              !mylib.isNum(value) &&
              (mylib.isStr(value) ? (
                <StrongField
                  $indent={!isRedact && mylib.isBool(key)}
                  // scope={itemScope}
                  // fieldName="value"
                  className={
                    'margin-gap-l mood-for-2 relative z-index:5 ' +
                    (mylib.isBool(key) ? (key ? 'color--3 fade-05' : 'color--3') : '')
                  }
                  value={value}
                  multiline
                  isRedact={isRedact}
                  setSelfRedact={setSelfRedact}
                  onSend={async () => {}}
                />
              ) : isRedact ? (
                <div>
                  {value?.map((val, vali, vala) => {
                    return (
                      <div key={vali}>
                        {!!scope && customAttUseRights.checkIsCan(userR, att.U) && (
                          <div className="flex flex-gap">
                            <span className="flex self-start">{vali + 1}.</span>
                            {vala.length > 1 && (
                              <EvaSendButton
                                // scope={itemScope}
                                // fieldName="value list move"
                                // fieldValue={vali === 0 ? 2 : vali - 1}
                                // fieldKey={vali}
                                className="relative z-index:15 color--7"
                                // cud="U"
                                Icon={MoveListItemArrowIcon(vali)}
                                // mapExecArgs={args => {
                                //   return {
                                //     ...args,
                                //     find: ['.', '===', val],
                                //   };
                                // }}
                                onSend={async () => {}}
                              />
                            )}
                            <EvaSendButton
                              // scope={itemScope}
                              // fieldName="value list"
                              // fieldKey={['.', '===', val]}
                              className="relative z-index:15 color--ko"
                              // cud="D"
                              confirm="Удалить пункт?"
                              Icon={IconDelete02StrokeRounded}
                              onSend={async () => {}}
                            />
                          </div>
                        )}
                        <div className="full-width">
                          {mylib.isNum(val) ? (
                            <div className="margin-gap-v">
                              <KeyValueListAttNumberMember value={val} />
                            </div>
                          ) : (
                            <StrongEditableField
                              // scope={itemScope}
                              // fieldName="value list key"
                              value={val}
                              className="mood-for-2 margin-gap-v"
                              isRedact
                              multiline
                              // mapExecArgs={(args, val) => {
                              //   while (value.includes(val)) val += '1';
                              //   return {
                              //     ...args,
                              //     key: vali,
                              //     value: val,
                              //   };
                              // }}
                              onSend={async () => {}}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {value && (
                    <ScheduleKeyValueListAttLiItemDropdown
                      scope={itemScope}
                      value={value}
                      topValues={attValue.values!}
                      users={dropdownUsers}
                      titles={dropdownTitles}
                      lists={dropdownLists}
                      roles={dropdownRoles}
                    />
                  )}

                  {subItems?.([key, value, itemMi], itemScope)}

                  <StrongEditableField
                    // scope={itemScope}
                    // fieldName="value list"
                    // cud="C"
                    className="mood-for-2 relative z-index:5 margin-gap-t"
                    placeholder="Новый подпункт"
                    isRedact={isRedact}
                    setSelfRedact={setSelfRedact}
                    multiline
                    // mapExecArgs={(args, val) => {
                    //   while ((value as string[]).includes(val)) val += '1';
                    //   return {
                    //     ...args,
                    //     value: val,
                    //   };
                    // }}
                    onSend={async () => {}}
                  />
                </div>
              ) : (
                <div>
                  {value?.map((val, vali) => {
                    return (
                      <div
                        key={vali}
                        className="flex flex-gap margin-big-gap-l"
                      >
                        <span className="flex self-start">{vali + 1}.</span>
                        {mylib.isNum(val) ? <KeyValueListAttNumberMember value={val} /> : <Markdown>{val}</Markdown>}
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        );
      })}
      {insertionNode}
      <ScheduleKeyValueListAttStatistic list={attValue.values} />
    </div>
  );
}

const StrongField = styled(StrongEditableField)<{ $indent: boolean }>`
  ${props =>
    props.$indent &&
    css`
      --indent: 24px;

      margin-top: -1.7em;

      .markdownFieldContent {
        ol,
        ul {
          padding-inline-start: 15px;

          > li > ol {
            list-style-type: lower-latin;

            > li > ol {
              list-style-type: lower-roman;

              > li > ol {
                list-style-type: lower-greek;
              }
            }
          }
        }

        > :not(p, div),
        > p:has([prop-src], table),
        > div:has([prop-src], table) {
          &:first-child {
            margin-left: var(--indent);

            &:not([prop-src]) {
              width: calc(100% - var(--indent));
            }
          }
        }

        > *:first-child > p:first-child,
        > p:first-child {
          text-indent: var(--indent);
        }
      }
    `}
`;
