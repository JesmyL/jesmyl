import { LazyIcon } from '#shared/ui/icon';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { contextCreator } from '../../../../../../shared/lib/contextCreator';
import { BottomPopupItem } from '../../../../../../shared/ui/absolute-popup/bottom-popup/BottomPopupItem';

export const [IsComToolIconItemsContext, useIsComToolIconItemsContext] = contextCreator(false);
export const [ComToolNameContext, useComToolNameContext] = contextCreator('');
export const [ComToolItemAttrsContext, useComToolItemAttrsContext] = contextCreator<{
  onIconClick?: PreventerAndStopperCallback;
}>({});

type Props = Parameters<typeof BottomPopupItem>[0];

export const ComTool = memo(({ path, ...props }: Props) => {
  const toolName = useComToolNameContext();

  const itemNode = useIsComToolIconItemsContext() ? (
    props.icon ? (
      <LazyIcon
        icon={props.icon}
        kind={props.iconKind}
        className={`pointer com-tool com-tool-${toolName}`}
        onClick={props.onClick}
      />
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
