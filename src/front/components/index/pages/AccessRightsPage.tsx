import { Accordion } from '#shared/components/ui/accordion';
import { MyLib } from '#shared/lib/my-lib';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { indexAppUserAccessRightsMatrixAtom, indexOpenAccessRoleRedactorAtom } from '$index/atoms';
import { AccessRightsUpdateTable } from '$index/parts/ui/AccessRightsUpdateTable';
import { indexTsjrpcClientMethods } from '$index/tsjrpc.methods';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { checkUserScopeAccessRight } from 'shared/utils/index/utils';
import { IndexUserRoleSelector } from '../parts/ui/UserRoleSelector';

export function AccessRightsPage() {
  const userRightsAndRoles = useAtomValue(indexAppUserAccessRightsMatrixAtom);

  useEffect(() => {
    (async () => {
      const rightsAndRoles = await indexTsjrpcClientMethods.getUserAccessRightsAndRoles();
      indexAppUserAccessRightsMatrixAtom.set(rightsAndRoles);
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
            <ConditionalRender
              value={userRightsAndRoles?.rights}
              render={rights =>
                MyLib.entries(rights).map(([userLogin, userRights]) => {
                  if (userRights == null) return null;

                  return (
                    <Accordion.Item
                      key={userLogin}
                      value={userLogin}
                    >
                      <Accordion.Trigger>
                        <span className="flex gap-3">
                          {userRights.info.fio}
                          {userRights.info.role && <span className="text-x7">({userRights.info.role})</span>}
                        </span>
                      </Accordion.Trigger>
                      <Accordion.Content>
                        <IndexUserRoleSelector
                          userLogin={userLogin}
                          userRights={userRights}
                        />

                        <div className="ml-3">
                          <AccessRightsUpdateTable
                            takeIsChecked={(scope, rule, operation) =>
                              checkUserScopeAccessRight(
                                userRights.info.role ? userRightsAndRoles?.roles[userRights.info.role] : null,
                                userRights.info.role === 'TOP' ? { ...userRights, general: { ALL: 15 } } : userRights,
                                scope as never,
                                rule,
                                operation,
                              )
                            }
                            takeRuleClassName={(scope, rule) =>
                              userRights[scope as never]?.[rule] != null ? 'text-x7' : undefined
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
                })
              }
            />
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
                      <AccessRightsUpdateTable
                        onChange={({ operation, rule, scope }) =>
                          indexTsjrpcClientMethods.updateRoleAccessRight({ operation, role, rule, scope })
                        }
                        takeIsChecked={(scope, rule, operation) =>
                          checkUserScopeAccessRight(
                            userRightsAndRoles?.roles[role],
                            null,
                            scope as never,
                            rule,
                            operation,
                          )
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
