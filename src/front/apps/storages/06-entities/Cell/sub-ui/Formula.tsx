import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { storagesComputeFormula, storagesReplaceFormulaNumbers } from '$storages/shared/lib/formulaComputing';
import { useStoragesHighlighUsedFormulaRefs } from '$storages/shared/lib/useHighlighUsedFormulaRefs';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useRef } from 'react';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeFormula = (props: StoragesCellTypeProps<StoragesColumnType.Formula>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (isEdit) return <Edit {...props} />;
  const result = storagesComputeFormula(
    {
      formula: props.column?.val,
      cells: props.card.row,
      numFix: props.column.fx,
      coli: props.coli,
      cols: props.rack.cols,
    },
    0,
  );

  return (
    !result || (
      <div>
        <span>{props.column.title} = </span>
        <span className="text-x3">{result}</span>
      </div>
    )
  );
};

const Edit = (props: StoragesCellTypeProps<StoragesColumnType.Formula>) => {
  const inputRef = useRef<(HTMLInputElement & HTMLTextAreaElement) | null>(null);

  useStoragesHighlighUsedFormulaRefs(inputRef, props.coli, props.rack.cols);

  const result = storagesComputeFormula(
    {
      formula: props.column.val,
      cells: props.card.row,
      cols: props.rack.cols,
      numFix: props.column.fx,
      coli: props.coli,
    },
    -props.rack.cols.length,
  );

  return (
    <>
      <div>
        {props.columnTitleNode}

        <div className="flex gap-3">
          <InputWithLoadingIcon
            icon={props.icon}
            inputRef={inputRef}
            defaultValue={props.column.val}
            strongDefaultValue
            multiline
            onChanged={value =>
              storagesTsjrpcClient.editColumnFields({
                rackw: props.rack.w,
                coli: props.coli,
                data: { [StoragesColumnType.Formula]: { val: value } },
                ...props.nestedSelectors,
              })
            }
          />
          <Dropdown
            id={props.column.fx ?? 2}
            items={[0, 1, 2, 3, 4, 5].map(fx => ({ id: fx, title: fx }))}
            renderItem={({ node }) => <div>После запятой - {node} зн.</div>}
            onSelectId={fx =>
              storagesTsjrpcClient.editColumnFields({
                rackw: props.rack.w,
                coli: props.coli,
                data: { [StoragesColumnType.Formula]: { fx } },
                ...props.nestedSelectors,
              })
            }
          />
        </div>

        {props.column && props.card.row && props.column.val && (
          <div className="my-3">
            Итог:{' '}
            <span className="text-x3">
              {storagesReplaceFormulaNumbers(
                {
                  formula: props.column.val,
                  cells: props.card.row,
                  funcPrefix: '',
                  cols: props.rack.cols,
                  numFix: props.column.fx,
                  coli: props.coli,
                },
                -props.rack.cols.length,
                (value, i, coli) => (
                  <span
                    key={i}
                    className="text-xKO"
                    storages-formula-used-coli={coli}
                  >
                    {value}
                  </span>
                ),
                (value, i, coli) => (
                  <span
                    key={i}
                    className="text-x7"
                    storages-formula-used-coli={coli}
                  >
                    {value}
                  </span>
                ),
              )}
              {' = '}
              {mylib.isStr(result) ? <span className="text-xKO">{result}</span> : result}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
