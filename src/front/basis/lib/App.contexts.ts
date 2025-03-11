import { AppName } from '#basis/model/App.model';
import { contextCreator } from '#shared/lib/contextCreator';
import { SetStateAction } from 'react';

export const [SetAppRootAnchorNodesContext, useSetAppRootAnchorNodesContext] = contextCreator(
  (_nodes: SetStateAction<Map<string, React.ReactNode>>) => {},
);

export const [CurrentAppFooterItemPlaceContext, useCurrentAppFooterItemPlaceContext] = contextCreator<string | und>(
  undefined,
);
export const [CurrentAppFooterItemAppNameContext, useCurrentAppFooterItemAppNameContext] = contextCreator<
  AppName | und
>(undefined);
export const footerItemPlaceLsPrefix = 'nav-link:';
