import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { HTMLAttributes, JSX } from 'react';
import { Link } from 'react-router-dom';
import { useBottomPopupOnCloseContext } from './context';

interface Props extends HTMLAttributes<HTMLLIElement> {
  icon?: TheIconKnownName;
  iconNode?: JSX.Element;
  iconKind?: TheIconNameKind;
  titleNode?: React.ReactNode;
  title?: string;
  rightNode?: React.ReactNode;
  iconWrapperClassName?: string;
  path?: string;
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
  path,
  onClick,
  onIconClick,
  className = '',
  ...attrs
}: Props) => {
  const onClose = useBottomPopupOnCloseContext();

  const node = (
    <ListItem
      disablePadding
      {...attrs}
      onClick={event => {
        onClick?.(event);
        if (event.isPropagationStopped()) return;
        onClose(false);
      }}
      className={'pointer ' + className}
      secondaryAction={rightNode}
    >
      <ListItemButton>
        {(iconNode || icon) && (
          <ListItemIcon>
            <div
              className={'icon-box ' + iconWrapperClassName}
              onClick={onIconClick}
            >
              {iconNode ||
                (icon && (
                  <LazyIcon
                    icon={icon}
                    kind={iconKind}
                  />
                ))}
            </div>
          </ListItemIcon>
        )}
        <ListItemText
          primary={titleNode ?? title}
          className="button-item-text"
        />
      </ListItemButton>
    </ListItem>
  );

  return path && onClick === undefined ? <Link to={path}>{node}</Link> : node;
};
