import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { StoragesNumberColumnMetricSelector } from '$storages/entities/NumberColumnMetricSelector';
import { storagesMakeActualFormulaProps } from '$storages/shared/lib/formulaComputing';
import { useStoragesHighlighUsedFormulaRefs } from '$storages/shared/lib/useHighlighUsedFormulaRefs';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useRef } from 'react';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeNumber = (props: StoragesCellTypeProps<StoragesColumnType.Number>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (isEdit) return <Edit {...props} />;

  return (
    !props.cell?.val || (
      <div className="flex gap-2">
        <span>{props.column.title}</span>
        <span className="font-bold">{props.cell?.val}</span>
        <span>{props.column.mt}</span>
      </div>
    )
  );
};

const Edit = (props: StoragesCellTypeProps<StoragesColumnType.Number>) => {
  const inputRef = useRef<(HTMLInputElement & HTMLTextAreaElement) | null>(null);
  const { coli, cols } = storagesMakeActualFormulaProps({
    coli: props.coli,
    nestedColi: props.nestedSelectors?.nestedColi,
    nestedCellMi: props.nestedSelectors?.nestedCellMi,
    rackCols: props.rack.cols,
    cardRow: props.card.row,
  });

  useStoragesHighlighUsedFormulaRefs(inputRef, coli, cols);

  return (
    <>
      <div>
        {props.columnTitleNode()}
        <div className="flex gap-3">
          <InputWithLoadingIcon
            icon={props.icon}
            type="number"
            inputRef={inputRef}
            defaultValue={props.cell ? '' + props.cell.val : ''}
            strongDefaultValue
            onChanged={amount =>
              storagesTsjrpcClient.setNumber({
                amount: Math.abs(+amount),
                cardMi: props.card.mi,
                rackw: props.rack.w,
                coli: props.coli,
                ...props.nestedSelectors,
              })
            }
          />
          <StoragesNumberColumnMetricSelector {...props} />
        </div>
      </div>
    </>
  );
};
