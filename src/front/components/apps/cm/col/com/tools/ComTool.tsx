import { memo } from 'react';
import { Link } from 'react-router-dom';
import { BottomPopupItem } from '../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { contextCreator } from '../../../../../../complect/contextCreator';

export const [IsComToolIconItemsContext, useIsComToolIconItemsContext] = contextCreator(false);
export const [ComToolNameContext, useComToolNameContext] = contextCreator('');
export const [ComToolItemAttrsContext, useComToolItemAttrsContext] = contextCreator<{
  onIconClick?: PreventerAndStopperCallback;
}>({});

type Props = Parameters<typeof BottomPopupItem>[0];

export const ComTool = memo(({ path, ...props }: Props) => {
  const toolName = useComToolNameContext();

  const itemNode = useIsComToolIconItemsContext() ? (
    <props.Icon
      className={`pointer com-tool com-tool-${toolName}`}
      onClick={props.onClick}
    />
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
