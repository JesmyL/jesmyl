import { contextCreator } from '#shared/lib/contextCreator';
import { CmBroadcastSlidesContextState } from '../model/slides';

export const useCmBroadcastSlidesContext = () => {
  const state = useCtx();
  if (!state) throw 'Lost Slides Context';
  return state;
};

const [Context, useCtx] = contextCreator(null as never as CmBroadcastSlidesContextState);

export { Context as CmBroadcastInnerSlidesContext };
