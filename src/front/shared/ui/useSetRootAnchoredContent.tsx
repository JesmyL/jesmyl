import { useSetAppRootAnchorNodesContext } from '#basis/lib/App.contexts';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { useWid } from '#shared/lib/hooks/useWid';
import { useCallback } from 'react';
import { Portal } from './Portal';

export const useSetRootAnchoredContent = (
  onCloseRef: { current: () => void },
  topContent?: React.ReactNode,
  topClassNames?: string[],
) => {
  const updateContent = useSetAppRootAnchorNodesContext();
  const wid = useWid();

  onCloseRef.current = () => {
    updateContent(prev => {
      const map = new Map(prev);
      map.delete(wid);
      return map;
    });
  };

  return useCallback(
    (content?: React.ReactNode, classNames?: string[]) => {
      updateContent(prev => {
        const map = new Map(prev);
        map.set(
          wid,
          <AppDialogProvider title="inner">
            <Portal classNames={classNames ?? topClassNames}>{content ?? topContent}</Portal>
          </AppDialogProvider>,
        );
        return map;
      });
    },
    [topClassNames, topContent, updateContent, wid],
  );
};
