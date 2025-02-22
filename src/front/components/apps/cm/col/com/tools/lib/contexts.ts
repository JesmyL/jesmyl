import { contextCreator } from '#shared/lib/contextCreator';

export const [IsComToolIconItemsContext, useIsComToolIconItemsContext] = contextCreator(false);
export const [ComToolNameContext, useComToolNameContext] = contextCreator('');
export const [ComToolItemAttrsContext, useComToolItemAttrsContext] = contextCreator<{
  onIconClick?: PreventerAndStopperCallback;
}>({});
