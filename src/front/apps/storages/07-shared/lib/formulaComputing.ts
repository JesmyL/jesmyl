import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'regexpert';
import {
  StoragesCell,
  StoragesColumnType,
  StoragesNestedCellMi,
  StoragesRackColumn,
} from 'shared/model/storages/rack.model';
import { itIt } from 'shared/utils';

type UtilProps = {
  formula: string | nil;
  cells: (StoragesCell<StoragesColumnType> | nil)[] | nil;
  cols: (StoragesRackColumn<StoragesColumnType> | nil)[] | nil;
  resultFix: number | nil;
  onNestedColi: (coli: number, nestedColi: number) => number;
  funcPrefix?: string;
};

type Props = {
  coli: number;
  nestedColi: number | nil;
  nestedCellMi: StoragesNestedCellMi | nil;
  rackCols: StoragesRackColumn<StoragesColumnType>[];
  cardRow: (nil | StoragesCell<StoragesColumnType>)[] | nil;
};

export const storagesMakeActualFormulaProps = ({ cardRow, coli, nestedCellMi, nestedColi, rackCols }: Props) => {
  const cols = nestedCellMi == null ? rackCols : rackCols[coli]?.cols;

  return {
    cols,
    coli: nestedColi ?? coli,
    innerCall: -(cols?.length ?? 0),
    cells:
      nestedCellMi == null || cardRow == null || cardRow[coli] == null
        ? cardRow
        : 'row' in cardRow[coli]
          ? cardRow[coli].row.find(cell => cell.mi === nestedCellMi)?.row
          : null,
  };
};

export const storagesReplaceFormulaNumbers = <Ret extends unknown | string = unknown | string>(
  props: UtilProps,
  innerCall: number,
  mapError: (value: string, index: number) => Ret = itIt as never,
  mapRefs: (value: string, index: number, selector: string) => Ret = itIt as never,
): Ret[] => {
  if (innerCall > 100) return ['%Рекурсия!%'] as never;

  return props.formula
    ?.replace(makeRegExp('/(\\n|^) */{2}.*/g'), '')
    .trim()
    .replace(makeRegExp('/\\b([a-z.][a-z.0-9]*)\\s*(\\(?)/gi'), (_all, prop, bracket) => {
      if (!(prop in Math)) return bracket || (prop === prop.toUpperCase() ? prop : '0');
      return `${props.funcPrefix ?? 'Math.'}${prop}${bracket || (prop === prop.toUpperCase() ? '' : '0')}`;
    })
    .split(makeRegExp('/(#\\d+(?:\\.#\\d+)?)/g'))
    .map((value, valuei) => {
      if (value.startsWith('%') && value.endsWith('%')) return mapError(value, valuei);
      if (!value.startsWith('#')) return value;

      const indexes = value.slice(1).split('.#');
      const coli = +indexes[0] - 1;
      const nestedColi = indexes[1] ? +indexes[1] - 1 : null;

      let result = (() => {
        const cell = props.cells?.[coli];
        if (cell?.t === StoragesColumnType.Number) return '' + cell.val;

        const col = props.cols?.[coli] as StoragesRackColumn<StoragesColumnType.Formula>;
        if (col?.t === StoragesColumnType.Formula) {
          if (col?.t !== StoragesColumnType.Formula) return '0';

          try {
            const result = storagesComputeFormula(
              { ...props, formula: col.val, funcPrefix: undefined, resultFix: col.fx },
              innerCall + 1,
            );

            if (mylib.isNum(result)) return '' + result;

            return `%${result}%`;
          } catch (_) {
            return '%!Рекурсия!%';
          }
        }

        return '0';
      })();

      if (nestedColi !== null) result = '' + props.onNestedColi(coli, nestedColi);

      return (result.startsWith('%') && result.endsWith('%') ? mapError : mapRefs)(result, valuei, value);
    }) as never;
};

export const storagesComputeFormula = (props: UtilProps, innerCall: number) => {
  if (innerCall > 100) return '!Рекурсия';
  if (!props.cells || !props.formula) return 0;

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
      `return dict.res = ${storagesReplaceFormulaNumbers(props, innerCall + 1, retZero).join('')};`,
    )(dict);

    return mylib.isNum(dict.res) ? +dict.res.toFixed(props.resultFix ?? 2) : 0;
  } catch (_e) {
    return 'Ошибка';
  }
};

const retZero = () => 0;
