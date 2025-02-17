import TheIconSendButton from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { schDayEventsSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import StrongEditableField from '#widgets/schedule/strong-control/field/StrongEditableField';
import { mylib } from 'front/utils';
import Markdown from 'markdown-to-jsx';
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
  ScheduleWidgetCleans,
  ScheduleWidgetRightsCtrl,
} from 'shared/api';
import { itIt, makeRegExp } from 'shared/utils';
import styled, { css } from 'styled-components';
import ScheduleWidgetRoleFace from '../../../control/roles/RoleFace';
import ScheduleWidgetListUnitFace from '../../../lists/UnitFace';
import {
  extractScheduleWidgetRole,
  extractScheduleWidgetRoleUser,
  useScheduleWidgetRightsContext,
} from '../../../useScheduleWidget';
import ScheduleKeyValueListAttArrayItemKeyChange from './ArrayItemSignChange';
import KeyValueListAttNumberMember from './KeyValueListAttNumberMember';
import ScheduleKeyValueListAttLiItemDropdown from './LiItemDropdown';
import ScheduleKeyValueListAttStatistic from './Statistic';

export default function ScheduleKeyValueListAtt({
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
      <div className="flex flex-gap margin-gap-v">
        <LazyIcon icon="CheckmarkSquare02" />
        <span className="text-italic">Пункт</span>
        <TheIconSendButton
          icon="PlusSign"
          onSend={() => schDayEventsSokiInvocatorClient.putKeyValueAttachment(null, dayEventAttScopeProps, false, '')}
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
              <LazyIcon icon="CheckmarkSquare02" />
              {title}
              <TheIconSendButton
                icon="PlusSign"
                onSend={() =>
                  schDayEventsSokiInvocatorClient.putKeyValueAttachment(null, dayEventAttScopeProps, false, title)
                }
              />
            </div>
          ) : (
            <div
              key={titlei}
              className="flex flex-gap"
            >
              {title}
              <TheIconSendButton
                icon="PlusSign"
                onSend={() =>
                  schDayEventsSokiInvocatorClient.putKeyValueAttachment(null, dayEventAttScopeProps, title, '+')
                }
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

      subItems = ([key, value, itemMi]) => {
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
                  <TheIconSendButton
                    icon="PlusSign"
                    prefix={team.title}
                    onSend={() => {
                      return schDayEventsSokiInvocatorClient.addKeyValueAttachmentListItem(
                        null,
                        dayEventAttScopeProps,
                        itemMi,
                        `####${team.title.toUpperCase()}\n\n+ ` +
                          team.users
                            .map(({ mi }) => rights.schedule.ctrl.users.find(user => user.mi === mi)?.fio ?? '')
                            .filter(itIt)
                            .join('\n+ '),
                      );
                    }}
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
                  <LazyIcon icon="CheckmarkSquare02" />
                  <LazyIcon icon="Basketball01" />
                  {game.title}
                  <TheIconSendButton
                    icon="PlusSign"
                    onSend={() =>
                      schDayEventsSokiInvocatorClient.putKeyValueAttachment(
                        null,
                        dayEventAttScopeProps,
                        false,
                        game.mi + CustomAttUseTaleId.Games,
                      )
                    }
                  />
                </>
              ) : (
                <>
                  <LazyIcon icon="Basketball01" />
                  {game.title}
                  <TheIconSendButton
                    icon="PlusSign"
                    onSend={() =>
                      schDayEventsSokiInvocatorClient.putKeyValueAttachment(
                        null,
                        dayEventAttScopeProps,
                        game.mi + CustomAttUseTaleId.Games,
                        [],
                      )
                    }
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
          <TheIconSendButton
            icon="PlusSign"
            onSend={() =>
              schDayEventsSokiInvocatorClient.putKeyValueAttachment(null, dayEventAttScopeProps, role.mi, '+')
            }
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
            <TheIconSendButton
              icon="PlusSign"
              onSend={() =>
                schDayEventsSokiInvocatorClient.putKeyValueAttachment(
                  null,
                  dayEventAttScopeProps,
                  unit.mi + CustomAttUseTaleId.Lists,
                  '+',
                )
              }
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
            <LazyIcon icon="CheckmarkSquare02" />
            {user.fio || user.nick}
            <TheIconSendButton
              icon="PlusSign"
              onSend={() =>
                schDayEventsSokiInvocatorClient.putKeyValueAttachment(
                  null,
                  dayEventAttScopeProps,
                  false,
                  user.mi + CustomAttUseTaleId.Users,
                )
              }
            />
          </div>
        ) : (
          <div
            key={user.mi}
            className="flex flex-gap"
          >
            {user.fio || user.nick}
            <TheIconSendButton
              icon="PlusSign"
              onSend={() =>
                schDayEventsSokiInvocatorClient.putKeyValueAttachment(
                  null,
                  dayEventAttScopeProps,
                  user.mi + CustomAttUseTaleId.Users,
                  '+',
                )
              }
            />
          </div>
        ),
      );
    }

    const itemNode = (
      <div className="flex flex-gap margin-big-gap-v">
        <LazyIcon icon="Text" />
        Пункт
        <TheIconSendButton
          icon="PlusSign"
          onSend={() =>
            schDayEventsSokiInvocatorClient.putKeyValueAttachment(null, dayEventAttScopeProps, 'Пункт', '+')
          }
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
                    <TheIconSendButton
                      className="self-start relative z-index:15"
                      icon={key ? 'CheckmarkSquare02' : 'Square'}
                      disabled={!customAttUseRights.checkIsCan(userR, att.U)}
                      onSend={() =>
                        schDayEventsSokiInvocatorClient.setKeyValueAttachmentKey(
                          null,
                          dayEventAttScopeProps,
                          itemMi,
                          !key,
                        )
                      }
                    />
                    {mylib.isNum(value) && <KeyValueListAttNumberMember value={value} />}
                  </div>
                ) : (
                  mylib.isStr(key) && (
                    <StrongEditableField
                      className="margin-gap-l mood-for-2 relative z-index:5"
                      value={key}
                      isRedact={isRedact}
                      setSelfRedact
                      onSend={value =>
                        schDayEventsSokiInvocatorClient.setKeyValueAttachmentKey(
                          null,
                          dayEventAttScopeProps,
                          itemMi,
                          value,
                        )
                      }
                    />
                  )
                )}
                {isRedact && (
                  <>
                    {!mylib.isNum(value) &&
                      !mylib.isBool(key) &&
                      !mylib.isNil(value) &&
                      (value === '+' || value.length < 1) && (
                        <TheIconSendButton
                          icon={mylib.isArr(value) ? 'Text' : 'LeftToRightListDash'}
                          onSend={() =>
                            schDayEventsSokiInvocatorClient.setKeyValueAttachmentValue(
                              null,
                              dayEventAttScopeProps,
                              itemMi,
                              mylib.isArr(value) ? '+' : [],
                            )
                          }
                        />
                      )}
                    {mylib.isNum(key) && (
                      <ScheduleKeyValueListAttArrayItemKeyChange
                        dayEventAttScopeProps={dayEventAttScopeProps}
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
              {isRedact && customAttUseRights.checkIsCan(userR, att.U) && (
                <div className={'flex flex-gap' + (mylib.isStr(value) ? ' margin-giant-gap-r' : '')}>
                  {itema.length > 1 && itemi > 0 && (
                    <TheIconSendButton
                      className="relative z-index:15 color--7"
                      icon="ArrowDataTransferVertical"
                      onSend={() =>
                        schDayEventsSokiInvocatorClient.moveKeyValueAttachment(null, dayEventAttScopeProps, itemMi)
                      }
                    />
                  )}
                  <TheIconSendButton
                    className="relative z-index:15 color--ko"
                    confirm="Удалить пункт?"
                    icon="Delete02"
                    onSend={() =>
                      schDayEventsSokiInvocatorClient.putKeyValueAttachment(null, dayEventAttScopeProps, itemMi, null)
                    }
                  />
                </div>
              )}
            </div>
            {(isRedact || value !== '+') &&
              !mylib.isNum(value) &&
              (mylib.isStr(value) ? (
                <StrongField
                  $indent={!isRedact && mylib.isBool(key)}
                  className={
                    'margin-gap-l mood-for-2 relative z-index:5 ' +
                    (mylib.isBool(key) ? (key ? 'color--3 fade-05' : 'color--3') : '')
                  }
                  value={value}
                  multiline
                  isRedact={isRedact}
                  setSelfRedact={setSelfRedact}
                  onSend={value =>
                    schDayEventsSokiInvocatorClient.setKeyValueAttachmentValue(
                      null,
                      dayEventAttScopeProps,
                      itemMi,
                      value,
                    )
                  }
                />
              ) : isRedact ? (
                <div>
                  {value?.map((val, vali, vala) => {
                    return (
                      <div key={vali}>
                        {customAttUseRights.checkIsCan(userR, att.U) && (
                          <div className="flex flex-gap">
                            <span className="flex self-start">{vali + 1}.</span>
                            {vala.length > 1 && vali > 0 && (
                              <TheIconSendButton
                                className="relative z-index:15 color--7"
                                icon="ArrowDataTransferVertical"
                                onSend={() =>
                                  schDayEventsSokiInvocatorClient.moveKeyValueAttachmentListItem(
                                    null,
                                    dayEventAttScopeProps,
                                    itemMi,
                                    val,
                                  )
                                }
                              />
                            )}
                            <TheIconSendButton
                              className="relative z-index:15 color--ko"
                              confirm="Удалить пункт?"
                              icon="Delete02"
                              onSend={() =>
                                schDayEventsSokiInvocatorClient.removeKeyValueAttachmentListItemValue(
                                  null,
                                  dayEventAttScopeProps,
                                  itemMi,
                                  val,
                                )
                              }
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
                              value={val}
                              className="mood-for-2 margin-gap-v"
                              isRedact
                              multiline
                              onSend={val => {
                                while (value?.includes(val)) val += '1';

                                return schDayEventsSokiInvocatorClient.setKeyValueAttachmentListItemValue(
                                  null,
                                  dayEventAttScopeProps,
                                  itemMi,
                                  vali,
                                  val,
                                );
                              }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {value && (
                    <ScheduleKeyValueListAttLiItemDropdown
                      value={value}
                      topValues={attValue.values!}
                      users={dropdownUsers}
                      titles={dropdownTitles}
                      lists={dropdownLists}
                      roles={dropdownRoles}
                      onSend={value =>
                        schDayEventsSokiInvocatorClient.addKeyValueAttachmentListItem(
                          null,
                          dayEventAttScopeProps,
                          itemMi,
                          value,
                        )
                      }
                    />
                  )}

                  {subItems?.([key, value, itemMi])}

                  <StrongEditableField
                    className="mood-for-2 relative z-index:5 margin-gap-t"
                    placeholder="Новый подпункт"
                    isRedact={isRedact}
                    setSelfRedact={setSelfRedact}
                    multiline
                    onSend={val => {
                      while (value?.includes(val)) val += '1';

                      return schDayEventsSokiInvocatorClient.addKeyValueAttachmentListItem(
                        null,
                        dayEventAttScopeProps,
                        itemMi,
                        val,
                      );
                    }}
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
