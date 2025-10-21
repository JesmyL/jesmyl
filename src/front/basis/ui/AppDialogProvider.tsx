import { SetAppRootAnchorNodesContext } from '#basis/state/App.contexts';
import React, { useState } from 'react';

export const AppDialogProvider = ({ children, title: _ }: { children: React.ReactNode; title: string }) => {
  const [rootAnchorNodes, setRootAnchorNodes] = useState<Map<string, React.ReactNode>>(() => new Map());

  return (
    <>
      <SetAppRootAnchorNodesContext value={setRootAnchorNodes}>{children}</SetAppRootAnchorNodesContext>
      {Array.from(rootAnchorNodes.entries()).map(([key, node]) => (
        <React.Fragment key={key}>{node}</React.Fragment>
      ))}
    </>
  );
};
