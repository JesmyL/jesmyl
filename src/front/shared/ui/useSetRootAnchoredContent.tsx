/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetAppRootAnchorNodesContext } from '#basis/state/App.contexts';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { Atom } from 'atomaric';
import { useCallback, useEffect, useId } from 'react';

export const useSetRootAnchoredContent = (openAtom: Atom<any>, topContent?: React.ReactNode) => {
  const updateContent = useSetAppRootAnchorNodesContext();
  const id = useId();

  useEffect(() => {
    const unsubscribe = openAtom.subscribe(isOpen => {
      if (isOpen) return;

      unsubscribe();
      updateContent(prev => {
        const map = new Map(prev);
        map.delete(id);
        return map;
      });
    });
  }, [openAtom, updateContent, id]);

  return useCallback(
    (content?: React.ReactNode) => {
      updateContent(prev => {
        const map = new Map(prev);
        map.set(id, <AppDialogProvider title="inner">{content ?? topContent}</AppDialogProvider>);
        return map;
      });
    },
    [topContent, updateContent, id],
  );
};
