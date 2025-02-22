import { complectIDB } from 'front/components/apps/+complect/_idb/complectIDB';
import { ReactNode, useCallback } from 'react';
import { LazyIcon } from '../the-icon/LazyIcon';

export const useIsRememberExpand = (
  scope: string,
  prefix?: ReactNode,
  postfix?: ReactNode | ((isExpand: boolean) => ReactNode),
): [ReactNode, boolean, (isExpand?: boolean) => void] => {
  const [expandes, setExpandes] = complectIDB.use.expands();
  const isExpand = expandes.has(scope);

  const switchExpand: (isExpand?: boolean) => void = useCallback(
    isExpand => {
      if (expandes.has(scope)) {
        if (isExpand === undefined || isExpand === false) {
          expandes.delete(scope);
          setExpandes(new Set(expandes));
        }
      } else {
        if (isExpand === undefined || isExpand === true) {
          setExpandes(new Set(expandes.add(scope)));
        }
      }
    },
    [expandes, scope, setExpandes],
  );

  return [
    <span className="flex flex-gap between margin-gap-v">
      <span
        className="flex flex-gap flex-max pointer"
        onClick={() => switchExpand()}
      >
        {prefix}
        {isExpand ? <LazyIcon icon="ArrowUp01" /> : <LazyIcon icon="ArrowDown01" />}
      </span>
      {typeof postfix === 'function' ? postfix(isExpand) : postfix}
    </span>,
    isExpand,
    switchExpand,
  ];
};
