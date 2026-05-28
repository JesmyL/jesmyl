import { contextCreator } from '#shared/lib/contextCreator';
import { emptyFunc } from 'shared/utils';
import { CmBroadcastSlidesContextState } from '../model/slides';

export const [CmBroadcastInnerSlidesContext, useCmBroadcastSlidesContext] =
  contextCreator<CmBroadcastSlidesContextState>({
    slidei: -2,
    slideId: '' as never,
    nextSlidei: -2,
    html: '-',
    nextHtml: '-',
    setSlidei: emptyFunc,
    slides: [],
    toNextSlide: emptyFunc,
    toPrevSlide: emptyFunc,
  });
