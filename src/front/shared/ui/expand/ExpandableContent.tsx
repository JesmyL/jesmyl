import { FunctionComponent, HTMLAttributes, ReactNode, useState } from 'react';
import { checkIsFunction } from 'shared/utils/checkIs';
import { LazyIcon } from '../the-icon/LazyIcon';

interface Props<Element extends HTMLElement> {
  children: ReactNode | ((isExpand: boolean) => ReactNode);
  title: ReactNode | ((isExpand: boolean) => ReactNode);
  postfix?: ReactNode | ((isExpand: boolean) => ReactNode);
  icon?: KnownStameskaIconName;
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
        className="flex gap-2 flex-max pointer font-bold"
        onClick={() => setIsExpand(!isExpand)}
      >
        {icon && <LazyIcon icon={icon} />}
        {checkIsFunction(title) ? title(isExpand) : title}
        {isExpand ? <LazyIcon icon="ArrowUp01" /> : <LazyIcon icon="ArrowDown01" />}
      </span>
      {checkIsFunction(postfix) ? postfix(isExpand) : postfix}
    </>
  );
  const className = 'flex w-full between';

  return (
    <>
      {HeaderNode ? <HeaderNode className={className}>{header}</HeaderNode> : <div className={className}>{header}</div>}
      {isExpand && (checkIsFunction(children) ? children(isExpand) : children)}
    </>
  );
};
