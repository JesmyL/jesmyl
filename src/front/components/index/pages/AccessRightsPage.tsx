import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { MyLib } from '#shared/lib/my-lib';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { indexAppUserAccessRightsMatrixAtom } from '$index/atoms';
import { indexTsjrpcClientMethods } from '$index/tsjrpc.methods';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { accessRightsCRUDOperations, checkUserScopeAccessRight } from 'shared/utils/index/utils';

export function AccessRightsPage() {
  const [rightTitles] = useInvocatedValue({} as never, () => indexTsjrpcClientMethods.getAccessRightTitles(), []);
  const userRights = useAtomValue(indexAppUserAccessRightsMatrixAtom);

  const rightTitlesEntries = MyLib.entries(rightTitles);

  useEffect(() => {
    (async () => {
      const rights = await indexTsjrpcClientMethods.getUserAccessRights();
      indexAppUserAccessRightsMatrixAtom.set(rights);
    })();
  }, []);

  return (
    <PageContainerConfigurer
      className="index-access-rights"
      headTitle="Права доступа"
      content={
        <>
          {MyLib.entries(userRights).map(([userLogin, userRights]) => {
            if (userRights == null) return null;

            return (
              <div key={userLogin}>
                <Accordion>
                  <AccordionSummary>{userRights.info.fio}</AccordionSummary>
                  <AccordionDetails>
                    <div className="ml-3">
                      {rightTitlesEntries.map(([scope, { info, ...rightTitles }]) => {
                        return (
                          <div key={scope}>
                            <h2>
                              {info.title} ({scope})
                            </h2>

                            <div className="ml-3">
                              {MyLib.entries(rightTitles).map(([rule, title]) => {
                                return (
                                  <div
                                    key={rule}
                                    className="flex gap-3 my-3"
                                  >
                                    {accessRightsCRUDOperations.map(operation => {
                                      const checked = checkUserScopeAccessRight(userRights, scope, rule, operation);

                                      return (
                                        <label
                                          key={operation}
                                          className="flex gap-1"
                                        >
                                          <span>{operation}</span>
                                          <IconCheckbox
                                            checked={checked}
                                            onClick={() =>
                                              indexTsjrpcClientMethods.updateUserAccessRight({
                                                login: userLogin,
                                                operation,
                                                rule,
                                                scope,
                                                value: !checked,
                                              })
                                            }
                                          />
                                        </label>
                                      );
                                    })}
                                    {title}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
        </>
      }
    />
  );
}
