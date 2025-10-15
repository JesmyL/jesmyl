import { contextCreator } from '#shared/lib/contextCreator';

export const [CmComToolIsComToolIconItemsContext, useCmComToolIsComToolIconItemsContext] = contextCreator(false);
export const [CmComToolNameContext, useCmComToolNameContext] = contextCreator('');
export const [CmComToolItemAttrsContext, useCmComToolItemAttrsContext] = contextCreator<{
  onIconClick?: PreventerAndStopperCallback;
}>({});
