import { mylib } from '#shared/lib/my-lib';
import { storagesComputeFormula, storagesReplaceFormulaNumbers } from '$storages/shared/lib/formulaComputing';
import { StoragesCell, StoragesColumnType, StoragesRackColumn } from 'shared/model/storages/rack.model';

type Props = {
  formula: string;
  resultFix: number | nil;
  cells: nil | (nil | StoragesCell<StoragesColumnType>)[];
  cols: StoragesRackColumn<StoragesColumnType>[] | nil;
  coli: number;
  innerCall: number;
  onNestedColi: (coli: number, nestedColi: number) => number;
};

export const StoragesFormulaTexted = (props: Props) => {
  const result = storagesComputeFormula(props, props.innerCall);

  return (
    <div className="my-3">
      Итог:{' '}
      <span className="text-x3">
        {storagesReplaceFormulaNumbers(
          {
            ...props,
            funcPrefix: '',
          },
          props.innerCall,
          (value, i) => (
            <span
              key={i}
              className="text-xKO"
              storages-formula-used-coli={value}
            >
              {value}
            </span>
          ),
          (value, i) => (
            <span
              key={i}
              className="text-x7"
              storages-formula-used-coli={value}
            >
              {value}
            </span>
          ),
        )}
        {' = '}
        <span className="font-bold">{mylib.isStr(result) ? <span className="text-xKO">{result}</span> : result}</span>
      </span>
    </div>
  );
};
