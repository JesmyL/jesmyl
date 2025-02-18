import { contextCreator } from '#shared/lib/contextCreator';
import { SetStateAction } from 'react';

export const [AppRootAnchorNodesContext, useAppRootAnchorNodesContext] = contextCreator(
  (_nodes: SetStateAction<Record<string, React.ReactNode>>) => {},
);
