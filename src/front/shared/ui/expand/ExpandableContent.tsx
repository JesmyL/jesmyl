import { mylib } from '#shared/lib/my-lib';
import { FunctionComponent, HTMLAttributes, ReactNode, useState } from 'react';
import { LazyIcon } from '../icon';

interface Props<Element extends HTMLElement> {
  children: ReactNode | ((isExpand: boolean) => ReactNode);
  title: ReactNode | ((isExpand: boolean) => ReactNode);
  postfix?: ReactNode | ((isExpand: boolean) => ReactNode);
  icon?: TheIconKnownName;
  HeaderNode?: FunctionComponent<HTMLAttributes<Element>>;
}

export const ExpandableContent = <Element extends HTMLElement>({
  children,
  title,
  icon,
  postfix,
  HeaderNode,
}: Props<Element>) => {
  const [isExpand, setIsExpand] = useState(false);
  const header = (
    <>
      <span
        className="flex flex-gap flex-max pointer text-bold"
        onClick={() => setIsExpand(!isExpand)}
      >
        {icon && <LazyIcon icon={icon} />}
        {mylib.isFunc(title) ? title(isExpand) : title}
        {isExpand ? <LazyIcon icon="ArrowUp01" /> : <LazyIcon icon="ArrowDown01" />}
      </span>
      {mylib.isFunc(postfix) ? postfix(isExpand) : postfix}
    </>
  );
  const className = 'flex full-width between';

  return (
    <>
      {HeaderNode ? <HeaderNode className={className}>{header}</HeaderNode> : <div className={className}>{header}</div>}
      {isExpand && (mylib.isFunc(children) ? children(isExpand) : children)}
    </>
  );
};
