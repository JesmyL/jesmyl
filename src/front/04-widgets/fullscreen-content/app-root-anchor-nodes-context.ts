import { contextCreator } from '#shared/lib/contextCreator';
import { SetStateAction } from 'react';

const [SetAppRootAnchorNodesContext, useSetAppRootAnchorNodesContext] = contextCreator(
  (_nodes: SetStateAction<Record<string, React.ReactNode>>) => {},
);

export { SetAppRootAnchorNodesContext, useSetAppRootAnchorNodesContext };
