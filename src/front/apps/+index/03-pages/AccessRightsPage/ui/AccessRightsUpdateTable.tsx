import { translateBase } from '#basis/locale';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useQuery } from '@tanstack/react-query';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { accessRightsCRUDOperations, CRUDOperation } from 'shared/utils/index/utils';
import { mapObjectEntries } from 'shared/utils/object.utils';

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

  return (
    <>
      {mapObjectEntries(rightTitles, (scope, { info, ...rightTitles }) => {
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
                {mapObjectEntries(rightTitles, (rule, title) => {
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
                              onClick={() => onChange({ operation, rule, scope, role: '-' } as never)}
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
      {accessRightsCRUDOperations.map(operation => (
        <th key={operation}>{operation}</th>
      ))}
      <th>{translateBase(it => it.name)}</th>
    </tr>
  </thead>
);
