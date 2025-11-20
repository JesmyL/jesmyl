import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import {
  storagesComputeFormula,
  storagesMakeActualFormulaProps,
  storagesReplaceFormulaNumbers,
} from '$storages/shared/lib/formulaComputing';
import { useStoragesHighlighUsedFormulaRefs } from '$storages/shared/lib/useHighlighUsedFormulaRefs';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useRef } from 'react';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { twMerge } from 'tailwind-merge';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeFormula = (props: StoragesCellTypeProps<StoragesColumnType.Formula>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (isEdit) return <Edit {...props} />;

  const { cells, coli, cols, innerCall } = storagesMakeActualFormulaProps({
    coli: props.coli,
    cardRow: props.card.row,
    rackCols: props.rack.cols,
    nestedColi: props.nestedSelectors?.nestedColi,
    nestedCellMi: props.nestedSelectors?.nestedCellMi,
  });

  const result = storagesComputeFormula(
    {
      formula: props.column?.val,
      numFix: props.column.fx,
      cells,
      coli,
      cols,
    },
    innerCall,
  );

  return (
    !result || (
      <div className="flex gap-2">
        <span>{props.column.title} =</span>
        <span className={twMerge('font-bold', mylib.isStr(result) ? 'text-xKO' : 'text-x3')}>{result}</span>
      </div>
    )
  );
};

const Edit = (props: StoragesCellTypeProps<StoragesColumnType.Formula>) => {
  const inputRef = useRef<(HTMLInputElement & HTMLTextAreaElement) | null>(null);
  const { coli, cols } = storagesMakeActualFormulaProps({
    coli: props.coli,
    cardRow: props.card.row,
    rackCols: props.rack.cols,
    nestedColi: props.nestedSelectors?.nestedColi,
    nestedCellMi: props.nestedSelectors?.nestedCellMi,
  });

  useStoragesHighlighUsedFormulaRefs(inputRef, coli, cols);

  return (
    <>
      <div>
        {props.columnTitleNode()}

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
            hiddenArrow
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
      </div>

      <TextedFormula {...props} />
    </>
  );
};

const TextedFormula = (props: StoragesCellTypeProps<StoragesColumnType.Formula>) => {
  const { coli, cols, cells, innerCall } = storagesMakeActualFormulaProps({
    coli: props.coli,
    cardRow: props.card.row,
    rackCols: props.rack.cols,
    nestedColi: props.nestedSelectors?.nestedColi,
    nestedCellMi: props.nestedSelectors?.nestedCellMi,
  });

  const formulaProps: Parameters<typeof storagesComputeFormula>[0] = {
    formula: props.column.val,
    numFix: props.column.fx,
    cells,
    cols,
    coli,
  };

  const result = storagesComputeFormula(formulaProps, innerCall);

  return (
    <>
      {props.column && props.card.row && props.column.val && (
        <div className="my-3">
          Итог:{' '}
          <span className="text-x3">
            {storagesReplaceFormulaNumbers(
              {
                ...formulaProps,
                funcPrefix: '',
              },
              innerCall,
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
            <span className="font-bold">
              {mylib.isStr(result) ? <span className="text-xKO">{result}</span> : result}
            </span>
          </span>
        </div>
      )}
    </>
  );
};
