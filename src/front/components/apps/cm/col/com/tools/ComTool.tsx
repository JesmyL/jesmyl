import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { IconButton } from '@mui/material';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useComToolItemAttrsContext, useComToolNameContext, useIsComToolIconItemsContext } from './lib/contexts';

type Props = Parameters<typeof BottomPopupItem>[0];

export const ComTool = memo(({ path, ...props }: Props) => {
  const toolName = useComToolNameContext();

  const itemNode = useIsComToolIconItemsContext() ? (
    props.icon ? (
      <IconButton>
        <LazyIcon
          icon={props.icon}
          kind={props.iconKind}
          className={`pointer com-tool com-tool-${toolName}`}
          onClick={props.onClick}
        />
      </IconButton>
    ) : (
      props.iconNode
    )
  ) : (
    <Bottom
      {...props}
      className={`com-tool com-tool-${toolName}`}
    />
  );

  return path ? <Link to={path}>{itemNode}</Link> : itemNode;
});

const Bottom = memo((props: Props) => {
  return (
    <BottomPopupItem
      {...useComToolItemAttrsContext()}
      {...props}
    />
  );
});
