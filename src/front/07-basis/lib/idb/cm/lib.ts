import { DexieDB } from 'front/08-shared/lib/_DexieDB';
import { ChordVisibleVariant } from 'front/components/apps/cm/Cm.model';
import { defaultCmConfig } from 'front/components/apps/cm/translation/complect/controlled/hooks/configs';
import { CmIDBStorage } from './model';

class CmIDB extends DexieDB<CmIDBStorage> {
  constructor() {
    super('cm', {
      chordPack: { $byDefault: {} },
      lastModifiedAt: { $byDefault: 0 },
      eeStore: { $byDefault: {} },
      favoriteComs: { $byDefault: [] },
      selectedComws: { $byDefault: [] },
      comTopTools: { $byDefault: ['mark-com', 'fullscreen-mode', 'chords-variant'] as never },

      chordVisibleVariant: { $byDefault: ChordVisibleVariant.Maximal },
      comFontSize: { $byDefault: 14 },
      eventContext: { $byDefault: [] },
      favoriteMeetings: { $byDefault: { contexts: [], events: [] } },
      isMiniAnchor: { $byDefault: false },
      isShowComHashComments: { $byDefault: true },
      laterComwList: { $byDefault: [] },
      metronome: { $byDefault: { accentes: '1000', isHide: true, mainSound: '380', secondarySound: '200' } },
      playerHideMode: { $byDefault: 'expand' },
      speedRollKf: { $byDefault: 10 },
      translationScreenConfigs: { $byDefault: [defaultCmConfig] },

      coms: {
        w: '++',
        isRemoved: true,
      },
      fixedComs: {
        w: '++',
      },
      cats: {
        w: '++',
        isRemoved: true,
      },
      comComments: {
        comw: '++',
        isSavedLocal: true,
      },
      scheduleComPacks: {
        schw: '++',
      },
    });
  }
}

export const cmIDB = new CmIDB();
