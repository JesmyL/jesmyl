import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { IconButton } from '@mui/material';
import { memo } from 'react';
import { useComToolItemAttrsContext, useComToolNameContext, useIsComToolIconItemsContext } from './lib/contexts';

type Props = Parameters<typeof BottomPopupItem>[0];

export const ComTool = memo(({ ...props }: Props) => {
  const toolName = useComToolNameContext();

  return useIsComToolIconItemsContext() ? (
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
});

const Bottom = memo((props: Props) => {
  return (
    <BottomPopupItem
      {...useComToolItemAttrsContext()}
      {...props}
    />
  );
});
