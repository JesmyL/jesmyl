import { useSetAppRootAnchorNodesContext } from '#basis/lib/App.contexts';
import { useWid } from '#shared/lib/hooks/useWid';
import { useEffect } from 'react';
import { Portal } from './Portal';

export const RootAnchoredContent = ({
  renderNode,
  subClose,
}: {
  renderNode: React.ReactNode;
  subClose: { current: () => void };
}) => {
  const addNode = useSetAppRootAnchorNodesContext();
  const wid = useWid();

  subClose.current = () =>
    addNode(prev => {
      const map = new Map(prev);
      map.delete(wid);
      return map;
    });

  useEffect(
    () =>
      addNode(prev => {
        const map = new Map(prev);
        map.set(wid, <Portal>{renderNode}</Portal>);
        return map;
      }),
    [addNode, renderNode, wid],
  );

  return <></>;
};
