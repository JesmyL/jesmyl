import { translateBase } from '#basis/locale';
import { Accordion } from '#shared/components/ui/accordion';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
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
import { objectEntries, objectLength } from 'shared/utils/object.utils';
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
  const [searchTermAtom] = useState(() => atom(''));
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
    <PageContainerConfigurer
      className="index-access-rights"
      headTitle={translateBase(BaseLocaleKey.AccessRights)}
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
  );
}
