import { translateBase } from '#basis/locale';
import { Accordion } from '#shared/components/ui/accordion';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { Modal, ModalBody, ModalHeader, usePrompt } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { WithAtomTruthfulValue } from '#shared/ui/WithAtomTruthfulValue';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import {
  indexAppUserInfoDictAtom,
  indexAppUserRoleInfoDictAtom,
  indexOpenAccessRoleRedactorAtom,
} from '$index/shared/state/atoms';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc/tsjrpc.methods';
import { atom, useAtomValue } from 'atomaric';
import { useEffect, useMemo, useState } from 'react';
import type { UserInfoUnsecure } from 'shared/api/complect/soki.model';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { checkIsNotNil } from 'shared/utils/checkIs';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';
import { objectEntries, objectKeys, objectLength } from 'shared/utils/object.utils';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { twMerge } from 'tailwind-merge';
import { IndexAccessRightsUpdateTable } from './AccessRightsUpdateTable';
import { IndexAccessRightsUserRoleSelector } from './UserRoleSelector';

const takeUserSearchText = (userInfo: UserInfoUnsecure) =>
  [
    userInfo.l,
    ...(userInfo.ls ?? []),
    userInfo.uauth.login,
    userInfo.uauth.fio,
    userInfo.uauth.nick,
    userInfo.uauth.email,
    userInfo.uauth.tgId,
    userInfo.r,
  ]
    .filter(checkIsNotNil)
    .join(' ')
    .toLowerCase();

const compareUsersByRoleThenName = (
  [loginA, infoA]: [string, UserInfoUnsecure | nil],
  [loginB, infoB]: [string, UserInfoUnsecure | nil],
) =>
  Number(!infoA?.r) - Number(!infoB?.r) ||
  (takeUserAuthName(infoA?.uauth) || loginA).localeCompare(takeUserAuthName(infoB?.uauth) || loginB);

export function IndexAccessRightsPage() {
  const userInfoDict = useAtomValue(indexAppUserInfoDictAtom);
  const roleInfoDict = useAtomValue(indexAppUserRoleInfoDictAtom);
  const prompt = usePrompt();
  const [searchTermAtom] = useState(() => atom(''));
  // Флаг открытия нижнего попапа с дополнительными действиями по ролям.
  const [isMoreOpenAtom] = useState(() => atom(false));
  const searchTerm = useAtomValue(searchTermAtom).trim().toLowerCase();
  const userEntries = useMemo(
    () =>
      objectEntries(userInfoDict)
        .filter(
          ([, userInfo]) =>
            checkIsNotNil(userInfo) && (!searchTerm || takeUserSearchText(userInfo).includes(searchTerm)),
        )
        .sort(compareUsersByRoleThenName),
    [userInfoDict, searchTerm],
  );

  useEffect(() => {
    (async () => {
      indexAppUserInfoDictAtom.set(await indexTsjrpcClientMethods.getUserInfoDict());
      indexAppUserRoleInfoDictAtom.set(await indexTsjrpcClientMethods.getRoleUnfoDict());
    })();
  }, []);

  return (
    <>
      <PageContainerConfigurer
        className="index-access-rights"
        headTitle={translateBase(BaseLocaleKey.AccessRights)}
        onMoreClick={isMoreOpenAtom.set}
        content={
          <>
            <DebouncedSearchInput
              className="debounced-searcher round-styled mb-2"
              placeholder={translateBase(BaseLocaleKey.Search)}
              termAtom={searchTermAtom}
            />

            <Accordion.Root
              type="single"
              collapsible
            >
              {userEntries.map(([userLogin, userInfo]) => {
                if (!userInfo) return null;

                return (
                  <Accordion.Item
                    key={userLogin}
                    value={userLogin}
                  >
                    <Accordion.Trigger>
                      <span className="flex gap-3">
                        <span className={twMerge(objectLength(userInfo) < 2 && 'opacity-70')}>
                          {takeUserAuthName(userInfo.uauth)}
                        </span>
                        {userInfo.r && <span className="text-x7">({userInfo.r})</span>}
                      </span>
                    </Accordion.Trigger>
                    <Accordion.Content>
                      <IndexAccessRightsUserRoleSelector
                        userLogin={userLogin}
                        userInfo={userInfo}
                      />

                      <div className="ml-3">
                        <IndexAccessRightsUpdateTable
                          takeIsChecked={(scope, rule, operation) =>
                            checkUserScopeAccessRight(
                              userInfo.r ? roleInfoDict?.[userInfo.r]?.r : null,
                              userInfo.r === 'TOP' ? { ...userInfo.rights, general: { ALL: 15 } } : userInfo.rights,
                              scope as never,
                              rule,
                              operation,
                            )
                          }
                          takeRuleClassName={(scope, rule) =>
                            twMerge(checkIsNotNil(userInfo.rights?.[scope as never]?.[rule]) && 'text-x7')
                          }
                          onChange={({ operation, rule, scope }) =>
                            indexTsjrpcClientMethods.updateUserAccessRight({
                              login: userLogin,
                              operation,
                              rule,
                              scope,
                            })
                          }
                        />
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                );
              })}
            </Accordion.Root>

            <Modal
              openAtom={indexOpenAccessRoleRedactorAtom}
              className="z-1000"
            >
              <WithAtomValue atom={indexOpenAccessRoleRedactorAtom}>
                {role => (
                  <>
                    <ModalHeader>{role}</ModalHeader>
                    {role && (
                      <ModalBody>
                        <IndexAccessRightsUpdateTable
                          onChange={({ operation, rule, scope }) =>
                            indexTsjrpcClientMethods.updateRoleAccessRight({ operation, role, rule, scope })
                          }
                          takeIsChecked={(scope, rule, operation) =>
                            checkUserScopeAccessRight(roleInfoDict?.[role]?.r, null, scope as never, rule, operation)
                          }
                        />
                      </ModalBody>
                    )}
                  </>
                )}
              </WithAtomValue>
            </Modal>
          </>
        }
      />

      {/* Нижний попап дополнительных действий: создание роли и переход к редактированию существующих. */}
      <WithAtomTruthfulValue atom={isMoreOpenAtom}>
        <BottomPopup onClose={isMoreOpenAtom.reset}>
          <BottomPopupItem
            icon="PlusSign"
            title={translateBase(BaseLocaleKey.Role)}
            onClick={async () => {
              // Спрашиваем имя новой роли и сразу создаём её на сервере.
              const roleName = await prompt(
                translateBase(BaseLocaleKey.EnterRoleName),
                translateBase(BaseLocaleKey.NewRole),
              );
              if (!roleName) return;
              return indexTsjrpcClientMethods.addNewAccessRole({ role: roleName as 'TOP' });
            }}
          />
          {/* Роль TOP всемогуща и не редактируется — в списке показываем только остальные роли. */}
          {!roleInfoDict ||
            objectKeys(roleInfoDict)
              .filter(role => role !== 'TOP')
              .map(role => (
                <BottomPopupItem
                  key={role}
                  icon="Edit02"
                  title={role}
                  onClick={() => indexOpenAccessRoleRedactorAtom.set(role)}
                />
              ))}
        </BottomPopup>
      </WithAtomTruthfulValue>
    </>
  );
}
