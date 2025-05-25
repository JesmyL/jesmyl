import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { mylib } from '#shared/lib/my-lib';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { ScheduleWidgetRoleFace } from '#widgets/schedule/control/roles/RoleFace';
import { schDayEventsSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import { ScheduleWidgetListUnitFace } from '#widgets/schedule/lists/UnitFace';
import { extractScheduleWidgetRole, extractScheduleWidgetRoleUser } from '#widgets/schedule/useScheduleWidget';
import Markdown from 'markdown-to-jsx';
import { ReactNode } from 'react';
import { makeRegExp } from 'regexpert';
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
import { itIt } from 'shared/utils';
import styled, { css } from 'styled-components';
import { ScheduleKeyValueListAttArrayItemKeyChange } from './ArrayItemSignChange';
import { KeyValueListAttNumberMember } from './KeyValueListAttNumberMember';
import { ScheduleKeyValueListAttLiItemDropdown } from './LiItemDropdown';
import { ScheduleKeyValueListAttStatistic } from './Statistic';

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
      <div className="flex flex-gap my-2">
        <LazyIcon icon="CheckmarkSquare02" />
        <span className="text-italic">Пункт</span>
        <TheIconSendButton
          icon="PlusSign"
          onSend={() =>
            schDayEventsSokiInvocatorClient.putKeyValueAttachment({
              props: dayEventAttScopeProps,
              key: false,
              value: '',
            })
          }
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
                  schDayEventsSokiInvocatorClient.putKeyValueAttachment({
                    props: dayEventAttScopeProps,
                    key: false,
                    value: title,
                  })
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
                  schDayEventsSokiInvocatorClient.putKeyValueAttachment({
                    props: dayEventAttScopeProps,
                    key: title,
                    value: '+',
                  })
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
                      return schDayEventsSokiInvocatorClient.addKeyValueAttachmentListItem({
                        props: dayEventAttScopeProps,
                        itemMi,
                        value:
                          `####${team.title.toUpperCase()}\n\n+ ` +
                          team.users
                            .map(({ mi }) => rights.schedule.ctrl.users.find(user => user.mi === mi)?.fio ?? '')
                            .filter(itIt)
                            .join('\n+ '),
                      });
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
              className="flex flex-gap my-2"
            >
              {customAttUseRights.checkIsHasIndividualRights(att.use, CustomAttUseRights.CheckGames) ? (
                <>
                  <LazyIcon icon="CheckmarkSquare02" />
                  <LazyIcon icon="Basketball01" />
                  {game.title}
                  <TheIconSendButton
                    icon="PlusSign"
                    onSend={() =>
                      schDayEventsSokiInvocatorClient.putKeyValueAttachment({
                        props: dayEventAttScopeProps,
                        key: false,
                        value: game.mi + CustomAttUseTaleId.Games,
                      })
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
                      schDayEventsSokiInvocatorClient.putKeyValueAttachment({
                        props: dayEventAttScopeProps,
                        key: game.mi + CustomAttUseTaleId.Games,
                        value: [],
                      })
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
          className="flex flex-gap my-2"
        >
          <ScheduleWidgetRoleFace
            role={role}
            schedule={rights.schedule}
          />
          <TheIconSendButton
            icon="PlusSign"
            onSend={() =>
              schDayEventsSokiInvocatorClient.putKeyValueAttachment({
                props: dayEventAttScopeProps,
                key: role.mi,
                value: '+',
              })
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
                schDayEventsSokiInvocatorClient.putKeyValueAttachment({
                  props: dayEventAttScopeProps,
                  key: unit.mi + CustomAttUseTaleId.Lists,
                  value: '+',
                })
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
                schDayEventsSokiInvocatorClient.putKeyValueAttachment({
                  props: dayEventAttScopeProps,
                  key: false,
                  value: user.mi + CustomAttUseTaleId.Users,
                })
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
                schDayEventsSokiInvocatorClient.putKeyValueAttachment({
                  props: dayEventAttScopeProps,
                  key: user.mi + CustomAttUseTaleId.Users,
                  value: '+',
                })
              }
            />
          </div>
        ),
      );
    }

    const itemNode = (
      <div className="flex gap-2 my-10">
        <LazyIcon icon="Text" />
        Пункт
        <TheIconSendButton
          icon="PlusSign"
          onSend={() =>
            schDayEventsSokiInvocatorClient.putKeyValueAttachment({
              props: dayEventAttScopeProps,
              key: 'Пункт',
              value: '+',
            })
          }
        />
      </div>
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
    } else insertionNode = itemNode || <div className="my-10 text-italic">{att.title}. Вставлять нечего</div>;
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
            className={'dropdown-ancestor' + (mylib.isArr(value) ? (isRedact ? ' mb-15 mt-10' : ' mb-10') : ' mb-2')}
          >
            <div className="flex gap-2 between mb-2">
              <div className="flex flex-gap">
                {generalNode !== null ? (
                  generalNode
                ) : mylib.isBool(key) ? (
                  <div className={'flex gap-2 text-x3' + (key ? ' fade-05' : '')}>
                    <TheIconSendButton
                      className="self-start relative z-15"
                      icon={key ? 'CheckmarkSquare02' : 'Square'}
                      disabled={!customAttUseRights.checkIsCan(userR, att.U)}
                      onSend={() =>
                        schDayEventsSokiInvocatorClient.setKeyValueAttachmentKey({
                          props: dayEventAttScopeProps,
                          itemMi,
                          value: !key,
                        })
                      }
                    />
                    {mylib.isNum(value) && <KeyValueListAttNumberMember value={value} />}
                  </div>
                ) : (
                  mylib.isStr(key) && (
                    <StrongEditableField
                      className="ml-3 -mt-4 mood-for-2 relative z-5"
                      value={key}
                      isRedact={isRedact}
                      setSelfRedact
                      onSend={value =>
                        schDayEventsSokiInvocatorClient.setKeyValueAttachmentKey({
                          props: dayEventAttScopeProps,
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
                      !mylib.isBool(key) &&
                      !mylib.isNil(value) &&
                      (value === '+' || value.length < 1) && (
                        <TheIconSendButton
                          icon={mylib.isArr(value) ? 'Text' : 'LeftToRightListDash'}
                          onSend={() =>
                            schDayEventsSokiInvocatorClient.setKeyValueAttachmentValue({
                              props: dayEventAttScopeProps,
                              itemMi,
                              value: mylib.isArr(value) ? '+' : [],
                            })
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
                <div className={'flex' + (mylib.isStr(value) ? ' mr-7' : '')}>
                  {itema.length > 1 && itemi > 0 && (
                    <TheIconSendButton
                      className="relative z-15 text-x7"
                      icon="ArrowDataTransferVertical"
                      onSend={() =>
                        schDayEventsSokiInvocatorClient.moveKeyValueAttachment({ props: dayEventAttScopeProps, itemMi })
                      }
                    />
                  )}
                  <TheIconSendButton
                    className="relative z-15 text-xKO"
                    confirm="Удалить пункт?"
                    icon="Delete02"
                    onSend={() =>
                      schDayEventsSokiInvocatorClient.putKeyValueAttachment({
                        props: dayEventAttScopeProps,
                        key: itemMi,
                        value: null,
                      })
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
                    `ml-3 ${isRedact ? '-mt-3' : '-mt-9'} mood-for-2 relative z-5 ` +
                    (mylib.isBool(key) ? (key ? 'text-x3 fade-05' : 'text-x3') : '')
                  }
                  value={value}
                  multiline
                  isRedact={isRedact}
                  setSelfRedact={setSelfRedact}
                  onSend={value =>
                    schDayEventsSokiInvocatorClient.setKeyValueAttachmentValue({
                      props: dayEventAttScopeProps,
                      itemMi,
                      value,
                    })
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
                                className="relative z-15 text-x7"
                                icon="ArrowDataTransferVertical"
                                onSend={() =>
                                  schDayEventsSokiInvocatorClient.moveKeyValueAttachmentListItem({
                                    props: dayEventAttScopeProps,
                                    itemMi,
                                    value: val,
                                  })
                                }
                              />
                            )}
                            <TheIconSendButton
                              className="relative z-15 text-xKO"
                              confirm="Удалить пункт?"
                              icon="Delete02"
                              onSend={() =>
                                schDayEventsSokiInvocatorClient.removeKeyValueAttachmentListItemValue({
                                  props: dayEventAttScopeProps,
                                  itemMi,
                                  value: val,
                                })
                              }
                            />
                          </div>
                        )}
                        <div className="full-width">
                          {mylib.isNum(val) ? (
                            <div className="my-2">
                              <KeyValueListAttNumberMember value={val} />
                            </div>
                          ) : (
                            <StrongEditableField
                              value={val}
                              className="mood-for-2 my-2"
                              isRedact
                              multiline
                              onSend={val => {
                                while (value?.includes(val)) val += '1';

                                return schDayEventsSokiInvocatorClient.setKeyValueAttachmentListItemValue({
                                  props: dayEventAttScopeProps,
                                  itemMi,
                                  valuei: vali,
                                  value: val,
                                });
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
                        schDayEventsSokiInvocatorClient.addKeyValueAttachmentListItem({
                          props: dayEventAttScopeProps,
                          itemMi,
                          value,
                        })
                      }
                    />
                  )}

                  {subItems?.([key, value, itemMi])}

                  <StrongEditableField
                    className="mood-for-2 relative z-5 mt-2"
                    placeholder="Новый подпункт"
                    isRedact={isRedact}
                    setSelfRedact={setSelfRedact}
                    multiline
                    onSend={val => {
                      while (value?.includes(val)) val += '1';

                      return schDayEventsSokiInvocatorClient.addKeyValueAttachmentListItem({
                        props: dayEventAttScopeProps,
                        itemMi,
                        value: val,
                      });
                    }}
                  />
                </div>
              ) : (
                <div>
                  {value?.map((val, vali) => {
                    return (
                      <div
                        key={vali}
                        className="flex flex-gap ml-10"
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

        > *:first-child > :where(p, h1, h2, h3, h4, h5, h6):first-child,
        > p:first-child {
          text-indent: var(--indent);
        }
      }
    `}
`;
