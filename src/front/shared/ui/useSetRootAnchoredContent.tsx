/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetAppRootAnchorNodesContext } from '#basis/state/App.contexts';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { useWid } from '#shared/lib/hooks/useWid';
import { Atom } from 'atomaric';
import { useCallback, useEffect } from 'react';

export const useSetRootAnchoredContent = (openAtom: Atom<any>, topContent?: React.ReactNode) => {
  const updateContent = useSetAppRootAnchorNodesContext();
  const wid = useWid();

  useEffect(() => {
    const unsubscribe = openAtom.subscribe(isOpen => {
      if (isOpen) return;

      unsubscribe();
      updateContent(prev => {
        const map = new Map(prev);
        map.delete(wid);
        return map;
      });
    });
  }, [openAtom, updateContent, wid]);

  return useCallback(
    (content?: React.ReactNode) => {
      updateContent(prev => {
        const map = new Map(prev);
        map.set(wid, <AppDialogProvider title="inner">{content ?? topContent}</AppDialogProvider>);
        return map;
      });
    },
    [topContent, updateContent, wid],
  );
};
