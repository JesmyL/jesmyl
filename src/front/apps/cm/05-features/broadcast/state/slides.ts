import { contextCreator } from '#shared/lib/contextCreator';
import { emptyFunc } from 'shared/utils';
import { CmBroadcastSlidesContextState } from '../model/slides';

export const [CmBroadcastInnerSlidesContext, useCmBroadcastSlidesContext] =
  contextCreator<CmBroadcastSlidesContextState>({
    isDefault: true,
    currentSlidei: -2,
    nextSlidei: -2,
    html: '-',
    nextHtml: '-',
    setSlidei: emptyFunc,
    slides: [],
    toNextSlide: emptyFunc,
    toPrevSlide: emptyFunc,
  });
