import { contextCreator } from '#shared/lib/contextCreator';
import { emptyFunc } from 'shared/utils';

export const [SetAppRootAnchorNodesContext, useSetAppRootAnchorNodesContext] =
  contextCreator<React.Dispatch<React.SetStateAction<Map<string, React.ReactNode>>>>(emptyFunc);

export const [CurrentAppFooterItemPlaceContext, useCurrentAppFooterItemPlaceContext] = contextCreator<
  `/${string}/${string}/` | und
>(undefined);
