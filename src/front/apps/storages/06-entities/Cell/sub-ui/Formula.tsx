import { mylib } from '#shared/lib/my-lib';
import { StoragesFormulaEditValue } from '$storages/entities/FormulaEdit';
import { StoragesFormulaTexted } from '$storages/entities/FormulaTexted';
import { storagesComputeFormula, storagesMakeActualFormulaProps } from '$storages/shared/lib/formulaComputing';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { twMerge } from 'tailwind-merge';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeFormula = (props: StoragesCellTypeProps<StoragesColumnType.Formula>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (isEdit) return <Edit {...props} />;

  const { cells, cols, innerCall } = storagesMakeActualFormulaProps({
    coli: props.coli,
    cardRow: props.card.row,
    rackCols: props.rack.cols,
    nestedColi: props.nestedSelectors?.nestedColi,
    nestedCellMi: props.nestedSelectors?.nestedCellMi,
  });

  const result = storagesComputeFormula(
    {
      formula: props.column?.val,
      resultFix: props.column.fx,
      cells,
      cols,
      onNestedColi: () => 0,
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
  const { cols, cells, innerCall } = storagesMakeActualFormulaProps({
    coli: props.coli,
    cardRow: props.card.row,
    rackCols: props.rack.cols,
    nestedColi: props.nestedSelectors?.nestedColi,
    nestedCellMi: props.nestedSelectors?.nestedCellMi,
  });

  return (
    <>
      <div>{props.columnTitleNode()}</div>

      <StoragesFormulaEditValue
        coli={props.coli}
        column={props.column}
        nestedSelectors={props.nestedSelectors}
        rack={props.rack}
      />

      {props.column && props.card.row && props.column.val && (
        <StoragesFormulaTexted
          {...props}
          cells={cells}
          cols={cols}
          formula={props.column.val}
          innerCall={innerCall}
          resultFix={props.column.fx}
          coli={props.coli}
          onNestedColi={() => 0}
        />
      )}
    </>
  );
};
