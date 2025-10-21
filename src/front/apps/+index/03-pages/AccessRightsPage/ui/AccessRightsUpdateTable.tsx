import { MyLib } from '#shared/lib/my-lib';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { accessRightsCRUDOperations, CRUDOperation } from 'shared/utils/index/utils';

export function IndexAccessRightsUpdateTable({
  onChange,
  takeRuleClassName,
  takeIsChecked,
}: {
  onChange: (args: Parameters<IndexTsjrpcModel['updateRoleAccessRight']>[0]) => Promise<unknown>;
  takeRuleClassName?: (scope: string, rule: string) => string | und;
  takeIsChecked: (scope: string, rule: string, operation: CRUDOperation) => boolean;
}) {
  const { data: rightTitles } = useQuery({
    queryKey: ['getAccessRightTitles'],
    queryFn: () => indexTsjrpcClientMethods.getAccessRightTitles(),
  });

  if (rightTitles == null) return;

  const rightTitlesEntries = MyLib.entries(rightTitles);

  return (
    <>
      {rightTitlesEntries.map(([scope, { info, ...rightTitles }]) => {
        return (
          <div
            key={scope}
            className={scope === 'general' ? 'disabled' : undefined}
          >
            <h2>
              {info.title} ({scope})
            </h2>

            <table className="ml-2">
              {crudTableTHeader}
              <tbody>
                {MyLib.entries(rightTitles).map(([rule, title]) => {
                  return (
                    <tr
                      key={rule}
                      className={takeRuleClassName?.(scope, rule)}
                    >
                      {accessRightsCRUDOperations.map(operation => {
                        return (
                          <td key={operation}>
                            <IconCheckbox
                              className="ml-1"
                              checked={takeIsChecked(scope, rule, operation)}
                              onClick={() => onChange({ operation, rule, scope, role: '-' as 'TOP' })}
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
    </>
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
