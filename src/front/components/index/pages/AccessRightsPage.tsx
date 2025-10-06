import { Accordion } from '#shared/components/ui/accordion';
import { MyLib } from '#shared/lib/my-lib';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { indexAppUserAccessRightsMatrixAtom } from '$index/atoms';
import { indexTsjrpcClientMethods } from '$index/tsjrpc.methods';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { accessRightsCRUDOperations, checkUserScopeAccessRight } from 'shared/utils/index/utils';

export function AccessRightsPage() {
  const { data: rightTitles } = useQuery({
    queryKey: ['Index.getAccessRightTitles'],
    queryFn: () => indexTsjrpcClientMethods.getAccessRightTitles(),
  });
  const userRights = useAtomValue(indexAppUserAccessRightsMatrixAtom);

  useEffect(() => {
    (async () => {
      const rights = await indexTsjrpcClientMethods.getUserAccessRights();
      indexAppUserAccessRightsMatrixAtom.set(rights);
    })();
  }, []);

  if (rightTitles == null) return;

  const rightTitlesEntries = MyLib.entries(rightTitles);

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
            {MyLib.entries(userRights).map(([userLogin, userRights]) => {
              if (userRights == null) return null;

              return (
                <Accordion.Item
                  key={userLogin}
                  value={userLogin}
                >
                  <Accordion.Trigger>{userRights.info.fio}</Accordion.Trigger>
                  <Accordion.Content>
                    <div className="ml-3">
                      {rightTitlesEntries.map(([scope, { info, ...rightTitles }]) => {
                        return (
                          <div key={scope}>
                            <h2>
                              {info.title} ({scope})
                            </h2>

                            <table className="ml-2">
                              {crudTableTHeader}
                              <tbody>
                                {MyLib.entries(rightTitles).map(([rule, title]) => {
                                  return (
                                    <tr key={rule}>
                                      {accessRightsCRUDOperations.map(operation => {
                                        const checked = checkUserScopeAccessRight(userRights, scope, rule, operation);

                                        return (
                                          <td key={operation}>
                                            <IconCheckbox
                                              className="ml-1"
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
                                          </td>
                                        );
                                      })}
                                      <td>
                                        <span className="mx-2">{title}</span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        );
                      })}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
        </>
      }
    />
  );
}

const crudTableTHeader = (
  <thead>
    <tr>
      {accessRightsCRUDOperations.map(operation => {
        return <th key={operation}>{operation}</th>;
      })}
      <th>Название</th>
    </tr>
  </thead>
);
