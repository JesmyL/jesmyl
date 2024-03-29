import { ReactNode, useState } from 'react';
import EvaIcon from '../eva-icon/EvaIcon';

const isNIs = (is: boolean) => !is;

export default function useIsExpand(
  initIsExpand: boolean,
  prefix?: ReactNode,
  postfix?: ReactNode | ((isExpand: boolean) => ReactNode),
): [ReactNode, boolean, (isExpand?: boolean) => void] {
  const [isExpand, setIsExpand] = useState(initIsExpand);
  return [
    <span className="flex flex-gap full-width between">
      <span
        className="flex flex-gap flex-max pointer"
        onClick={() => setIsExpand(!isExpand)}
      >
        {prefix}
        <EvaIcon name={isExpand ? 'chevron-up' : 'chevron-down'} />
      </span>
      {typeof postfix === 'function' ? postfix(isExpand) : postfix}
    </span>,
    isExpand,
    isExpand => setIsExpand(isExpand ?? isNIs),
  ];
}
