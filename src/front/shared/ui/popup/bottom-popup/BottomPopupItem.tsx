import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { HTMLAttributes, JSX } from 'react';
import { StameskaIconKind } from 'stameska-icon/utils';
import { twMerge } from 'tailwind-merge';
import { useBottomPopupOnCloseContext } from './context';

interface Props extends HTMLAttributes<HTMLLIElement> {
  icon?: KnownStameskaIconName;
  iconNode?: JSX.Element;
  iconKind?: StameskaIconKind;
  titleNode?: React.ReactNode;
  title?: string;
  rightNode?: React.ReactNode;
  iconWrapperClassName?: string;
  iconClassName?: string;
  onIconClick?: PreventerAndStopperCallback;
}

export const BottomPopupItem = ({
  icon,
  iconNode,
  iconKind,
  titleNode,
  title,
  rightNode,
  iconWrapperClassName = '',
  iconClassName = '',
  onClick,
  onIconClick,
  className = '',
  ...attrs
}: Props) => {
  const onClose = useBottomPopupOnCloseContext();

  return (
    <li
      {...attrs}
      className={twMerge('pointer px-7 xl:px-12 py-1.5 my-0 flex hover:bg-x2', className)}
      onClick={event => {
        onClick?.(event);
        if (event.isPropagationStopped()) return;
        onClose(false);
      }}
    >
      {(iconNode || icon) && (
        <div
          className={twMerge('icon-box my-.5 mr-5 p-2.5 rounded-[50%]', iconWrapperClassName)}
          onClick={onIconClick}
        >
          {iconNode ||
            (icon && (
              <LazyIcon
                icon={icon}
                kind={iconKind}
                className={iconClassName}
              />
            ))}
        </div>
      )}
      <div className="w-full">{titleNode ?? title}</div>
      {rightNode}
    </li>
  );
};
