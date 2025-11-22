import { StoragesFormulaEditValue } from '$storages/entities/FormulaEdit';
import { StoragesColumnEditTypeProps } from '$storages/shared/model/col-edit';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesColumnEditOfTypeFormula = (props: StoragesColumnEditTypeProps<StoragesColumnType.Formula>) => {
  return (
    <>
      <StoragesFormulaEditValue
        coli={props.coli}
        column={props.column}
        nestedSelectors={null}
        rack={props.rack}
      />
    </>
  );
};
