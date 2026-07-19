import { contextCreator } from '#shared/lib/contextCreator';
import { CmBroadcastSlidesContextState } from '$cm/ext';
import { CmAudioMarkControlButtonsContextAfterIdDict, CmAudioMarkControlButtonsContextIdDict } from '../model/common';

export const [CmAudioMarkControlButtonsContextInner, useCmAudioMarkControlButtonsContext] = contextCreator<{
  controls: {
    idDict: CmAudioMarkControlButtonsContextIdDict;
    afterIdDict: CmAudioMarkControlButtonsContextAfterIdDict;
  };
  slides: CmBroadcastSlidesContextState;
} | null>(null);
