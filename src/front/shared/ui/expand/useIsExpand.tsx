import { ReactNode, useState } from 'react';
import { isNIs } from 'shared/utils';
import { LazyIcon } from '../the-icon/LazyIcon';

export function useIsExpand(
  initIsExpand: boolean,
  prefix?: ReactNode,
  postfix?: ReactNode | ((isExpand: boolean) => ReactNode),
): [ReactNode, boolean, (isExpand?: boolean) => void] {
  const [isExpand, setIsExpand] = useState(initIsExpand);
  return [
    <span className="flex gap-2 w-full between">
      <span
        className="flex gap-2 flex-max pointer"
        onClick={() => setIsExpand(!isExpand)}
      >
        {prefix}
        {isExpand ? <LazyIcon icon="ArrowUp01" /> : <LazyIcon icon="ArrowDown01" />}
      </span>
      {typeof postfix === 'function' ? postfix(isExpand) : postfix}
    </span>,
    isExpand,
    isExpand => setIsExpand(isExpand ?? isNIs),
  ];
}
