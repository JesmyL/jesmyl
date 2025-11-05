import { mylib } from '#shared/lib/my-lib';
import { makeRegExp } from 'regexpert';
import { StoragesCell, StoragesColumnType, StoragesRackColumn } from 'shared/model/storages/rack.model';
import { itIt } from 'shared/utils';

type UtilProps = {
  formula: string | nil;
  cells: (StoragesCell<StoragesColumnType> | nil)[] | nil;
  cols: (StoragesRackColumn<StoragesColumnType> | nil)[];
  numFix: number | nil;
  coli: number;
  funcPrefix?: string;
};

export const storagesReplaceFormulaNumbers = <Ret extends unknown | string = unknown | string>(
  props: UtilProps,
  innerCall: number,
  mapError: (value: string, index: number, coli: number) => Ret = itIt as never,
  mapRefs: (value: string, index: number, coli: number) => Ret = itIt as never,
): Ret[] => {
  if (innerCall > 100 || props.formula?.includes(`#${props.coli + 1}`)) return ['%Рекурсия!%'] as never;

  return props.formula
    ?.replace(makeRegExp('/(\\n|^) */{2}.*/g'), '')
    .trim()
    .replace(makeRegExp('/\\b([a-z.][a-z.0-9]*)\\s*(\\(?)/gi'), (_all, prop, bracket) => {
      if (!(prop in Math)) return bracket || (prop === prop.toUpperCase() ? prop : '0');
      return `${props.funcPrefix ?? 'Math.'}${prop}${bracket || (prop === prop.toUpperCase() ? '' : '0')}`;
    })
    .split(makeRegExp('/(#\\d+)/g'))
    .map((value, valuei) => {
      const index = +value.slice(1) - 1;
      if (value.startsWith('%') && value.endsWith('%')) return mapError(value, valuei, index);
      if (!value.startsWith('#')) return value;

      const retRef = () => {
        const cell = props.cells?.[index];
        if (cell?.t === StoragesColumnType.Number) return '' + cell.val;

        const col = props.cols[index] as StoragesRackColumn<StoragesColumnType.Formula>;
        if (col?.t === StoragesColumnType.Formula) {
          if (props.coli === index) return '%Рекурсия%';
          if (col?.t !== StoragesColumnType.Formula) return '0';

          try {
            const result = storagesComputeFormula(
              { ...props, formula: col.val, funcPrefix: undefined, numFix: col.fx },
              innerCall + 1,
            );

            if (mylib.isNum(result)) return '' + result;

            return `%${result}%`;
          } catch (_) {
            return '%!Рекурсия!%';
          }
        }

        return '0';
      };

      const ref = retRef();

      return (ref.startsWith('%') && ref.endsWith('%') ? mapError : mapRefs)(ref, valuei, index);
    }) as never;
};

export const storagesComputeFormula = (props: UtilProps, innerCall: number) => {
  if (innerCall > 100 || props.formula?.includes(`#${props.coli + 1}`)) return '!Рекурсия';
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
      `return dict.res = ${storagesReplaceFormulaNumbers(props, innerCall + 1).join('')};`,
    )(dict);

    return mylib.isNum(dict.res) ? +dict.res.toFixed(props.numFix ?? 2) : 0;
  } catch (_e) {
    return 'Ошибка';
  }
};
