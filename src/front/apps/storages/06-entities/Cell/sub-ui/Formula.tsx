import { mylib } from '#shared/lib/my-lib';
import { TextInput } from '#shared/ui/TextInput';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { makeRegExp } from 'regexpert';
import { StoragesCell, StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeFormula = (props: StoragesCellTypeProps<StoragesColumnType.Formula>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit) {
    return (
      <div>
        <span>{props.column.title} = </span>
        <span className="text-x7">{computeFormula(props.cell?.val, props.card.row)}</span>
      </div>
    );
  }

  return (
    <>
      <div>
        {props.column.title}

        <TextInput
          defaultValue={props.cell?.val}
          strongDefaultValue
          onChanged={value =>
            storagesTsjrpcClient.editCellValue({
              value,
              cardMi: props.card.mi,
              rackw: props.rack.w,
              coli: props.coli,
              ...props.nestedSelectors,
            })
          }
        />

        {props.cell && props.card.row && (
          <div className="my-3">
            Итог:{' '}
            <span className="text-x7">
              {replaceNumbers(props.cell.val, props.card.row, '')} = {computeFormula(props.cell.val, props.card.row)}
            </span>
          </div>
        )}

        <div>
          Вместо #.. - значения полей:
          {props.rack.cols.map((col, coli) => {
            if (col.t !== StoragesColumnType.Number) return;

            return (
              <div key={coli}>
                #{coli + 1} - {col.title}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const replaceNumbers = (formula: string, row: (StoragesCell<StoragesColumnType> | nil)[], funcPrefix = 'Math.') => {
  return formula
    .replace(makeRegExp('/#(\\d+)/g'), (_all, num) => {
      const cell = row[+num - 1];
      if (cell?.t !== StoragesColumnType.Number) return '0';
      return '' + cell.val;
    })
    .replace(makeRegExp('/\\b([a-z]+)\\s*(\\(?)/g'), (_all, prop, bracket) => {
      if (!(prop in Math)) return bracket || '0';
      return `${funcPrefix}${prop}${bracket || '0'}`;
    });
};

const computeFormula = (formula: string | nil, row: (nil | StoragesCell<StoragesColumnType>)[] | nil) => {
  if (!row || !formula) return 0;

  try {
    const dict = { res: 0 };

    new Function(
      'dict',
      'window',
      'exec',
      'Function',
      'document',
      'localStorage',
      'cookieStore',
      'CacheStorage',
      'sessionStorage',
      /////
      `return dict.res = ${replaceNumbers(formula, row)};`,
    )(dict);

    return mylib.isNum(dict.res) ? dict.res.toFixed(2) : 0;
  } catch (_e) {
    return <span className="text-xKO">Ошибка</span>;
  }
};
