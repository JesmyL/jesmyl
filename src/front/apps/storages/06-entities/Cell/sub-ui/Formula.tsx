import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { TextInput } from '#shared/ui/TextInput';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useEffect, useRef } from 'react';
import { makeRegExp } from 'regexpert';
import { StoragesCell, StoragesColumnType, StoragesRackColumn } from 'shared/model/storages/rack.model';
import { itIt } from 'shared/utils';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeFormula = (props: StoragesCellTypeProps<StoragesColumnType.Formula>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (isEdit) return <Edit {...props} />;
  const result = computeFormula(
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

  useEffect(() => {
    let elemCollection: NodeListOf<Element> | nil;
    const selector = `[storages-col-type]:not([storages-col-type="${StoragesColumnType.Number}"]):not([storages-col-type="${StoragesColumnType.Formula}"]),[storages-col-type][storages-coli-nn="${props.coli}"]`;
    const className = 'opacity-50!';

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(inputRef.current, 'focus', () => {
          elemCollection = document.querySelectorAll(selector);
          elemCollection.forEach(elem => elem.classList.add(className));
        }),
        addEventListenerPipe(inputRef.current, 'blur', () => {
          elemCollection = document.querySelectorAll(selector);
          elemCollection.forEach(elem => elem.classList.remove(className));
        }),
      )
      .effect(() => {
        elemCollection?.forEach(elem => elem.classList.remove(className));
      });
  }, [props.coli]);

  const result = computeFormula(
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
          <TextInput
            inputRef={inputRef}
            defaultValue={props.column.val}
            strongDefaultValue
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
              {replaceNumbers(
                {
                  formula: props.column.val,
                  cells: props.card.row,
                  funcPrefix: '',
                  cols: props.rack.cols,
                  numFix: props.column.fx,
                  coli: props.coli,
                },
                -props.rack.cols.length,
                (value, i) => (
                  <span
                    key={i}
                    className="text-xKO"
                  >
                    {value}
                  </span>
                ),
                (value, i) => (
                  <span
                    key={i}
                    className="text-x7"
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

type UtilProps = {
  formula: string | nil;
  cells: (StoragesCell<StoragesColumnType> | nil)[] | nil;
  cols: (StoragesRackColumn<StoragesColumnType> | nil)[];
  numFix: number | nil;
  coli: number;
  funcPrefix?: string;
};

const replaceNumbers = <Ret extends unknown | string = unknown | string>(
  props: UtilProps,
  innerCall: number,
  mapError: (value: string, index: number) => Ret = itIt as never,
  mapRefs: (value: string, index: number) => Ret = itIt as never,
): Ret[] => {
  if (innerCall > 100 || props.formula?.includes(`#${props.coli + 1}`)) return ['%Рекурсия!%'] as never;

  return props.formula
    ?.replace(makeRegExp('/\\b([a-z.][a-z.0-9]*)\\s*(\\(?)/gi'), (_all, prop, bracket) => {
      if (!(prop in Math)) return bracket || (prop === prop.toUpperCase() ? prop : '0');
      return `${props.funcPrefix ?? 'Math.'}${prop}${bracket || (prop === prop.toUpperCase() ? '' : '0')}`;
    })
    .split(makeRegExp('/(#\\d+)/g'))
    .map((value, valuei) => {
      if (value.startsWith('%') && value.endsWith('%')) return mapError(value, valuei);
      if (!value.startsWith('#')) return value;

      const retRef = () => {
        const index = +value.slice(1) - 1;
        const cell = props.cells?.[index];
        if (cell?.t === StoragesColumnType.Number) return '' + cell.val;

        const col = props.cols[index] as StoragesRackColumn<StoragesColumnType.Formula>;
        if (col?.t === StoragesColumnType.Formula) {
          if (props.coli === index) return '%Рекурсия%';
          if (col?.t !== StoragesColumnType.Formula) return '0';

          try {
            const result = computeFormula(
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

      return (ref.startsWith('%') && ref.endsWith('%') ? mapError : mapRefs)(ref, valuei);
    }) as never;
};

const computeFormula = (props: UtilProps, innerCall: number) => {
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
      `return dict.res = ${replaceNumbers(props, innerCall + 1).join('')};`,
    )(dict);

    return mylib.isNum(dict.res) ? +dict.res.toFixed(props.numFix ?? 2) : 0;
  } catch (_e) {
    return 'Ошибка';
  }
};
