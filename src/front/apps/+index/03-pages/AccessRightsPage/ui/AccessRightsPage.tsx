import { Accordion } from '#shared/components/ui/accordion';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import {
  indexAppUserInfoDictAtom,
  indexAppUserRoleInfoDictAtom,
  indexOpenAccessRoleRedactorAtom,
} from '$index/shared/state/atoms';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc/tsjrpc.methods';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { checkIsNotNil } from 'shared/utils/checkIs';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';
import { mapObjectEntries, objectLength } from 'shared/utils/object.utils';
import { twMerge } from 'tailwind-merge';
import { IndexAccessRightsUpdateTable } from './AccessRightsUpdateTable';
import { IndexAccessRightsUserRoleSelector } from './UserRoleSelector';

export function IndexAccessRightsPage() {
  const userInfoDict = useAtomValue(indexAppUserInfoDictAtom);
  const roleInfoDict = useAtomValue(indexAppUserRoleInfoDictAtom);

  useEffect(() => {
    (async () => {
      indexAppUserInfoDictAtom.set(await indexTsjrpcClientMethods.getUserInfoDict());
      indexAppUserRoleInfoDictAtom.set(await indexTsjrpcClientMethods.getRoleUnfoDict());
    })();
  }, []);

  return (
    <PageContainerConfigurer
      className="index-access-rights"
      headTitle="Права доступа"
      content={
        <>
          <Accordion.Root
            type="single"
            collapsible
          >
            {mapObjectEntries(userInfoDict ?? {}, (userLogin, userInfo) => {
              if (!userInfo) return null;

              return (
                <Accordion.Item
                  key={userLogin}
                  value={userLogin}
                >
                  <Accordion.Trigger>
                    <span className="flex gap-3">
                      <span className={twMerge(objectLength(userInfo) < 2 && 'opacity-70')}>{userInfo.uauth.fio}</span>
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
