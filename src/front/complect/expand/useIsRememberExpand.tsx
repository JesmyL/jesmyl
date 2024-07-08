import { ReactNode, useCallback } from 'react';
import { IconArrowDown01StrokeRounded } from '../../complect/the-icon/icons/arrow-down-01';
import { IconArrowUp01StrokeRounded } from '../../complect/the-icon/icons/arrow-up-01';
import { atom, useAtom } from '../atoms';

const expandsAtom = atom<Set<string>>(new Set(), 'complect', 'expandes');

export const useIsRememberExpand = (
  scope: string,
  prefix?: ReactNode,
  postfix?: ReactNode | ((isExpand: boolean) => ReactNode),
): [ReactNode, boolean, (isExpand?: boolean) => void] => {
  const [expandes, setExpandes] = useAtom(expandsAtom);
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
        {isExpand ? <IconArrowUp01StrokeRounded /> : <IconArrowDown01StrokeRounded />}
      </span>
      {typeof postfix === 'function' ? postfix(isExpand) : postfix}
    </span>,
    isExpand,
    switchExpand,
  ];
};
