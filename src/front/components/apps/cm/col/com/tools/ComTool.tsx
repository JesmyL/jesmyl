import { Link } from 'react-router-dom';
import { BottomPopupItem } from '../../../../../../complect/absolute-popup/bottom-popup/BottomPopupItem';
import { contextCreator } from '../../../../../../complect/contextCreator';

export const [IsComToolIconItemsContext, useIsComToolIconItemsContext] = contextCreator(false);
export const [ComToolItemAttrsContext, useComToolItemAttrsContext] = contextCreator<{
  onIconClick?: PreventerAndStopperCallback;
}>({});

type Props = Parameters<typeof BottomPopupItem>[0];

export const ComTool = ({ path, ...props }: Props) => {
  const itemNode = useIsComToolIconItemsContext() ? (
    <props.Icon
      className="pointer"
      onClick={props.onClick}
    />
  ) : (
    <Bottom {...props} />
  );

  return path ? <Link to={path}>{itemNode}</Link> : itemNode;
};

const Bottom = (props: Props) => {
  return (
    <BottomPopupItem
      {...useComToolItemAttrsContext()}
      {...props}
    />
  );
};
