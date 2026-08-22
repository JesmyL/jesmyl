import { contextCreator } from '#shared/lib/contextCreator';
import { emptyFunc } from 'shared/utils';
import { CmBroadcastSlidesContextState } from '../model/slides';

const html = 'Not In Context';

export const [CmBroadcastInnerSlidesContext, useCmBroadcastSlidesContext] =
  contextCreator<CmBroadcastSlidesContextState>({
    slidei: -2,
    nextSlidei: -2,
    html,
    nextHtml: html,
    hash: '',
    setSlidei: emptyFunc,
    slides: [],
    toSlide: emptyFunc,
  });
