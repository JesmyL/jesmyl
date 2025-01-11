import { CmComWid } from '../../../../shared/api/complect/apps/cm/complect/enums';
import { atom, Molecule } from '../../../complect/atoms';
import { FractionalServerStore } from '../../../complect/atoms/FractionalServerStore';
import { CmState } from './Cm.model';
import { CmEditorStoraged } from './editor/CmEditor.model';
import { defaultCmConfig } from './translation/complect/controlled/hooks/configs';

export const comCommentFractionalStore = new FractionalServerStore<CmComWid, string | und>(
  'cm/comComment::',
  'cm/comCommentLastTs:',
  '',
);
export const useComComment = comCommentFractionalStore.useValue;

export const cmMolecule = new Molecule<CmState & CmEditorStoraged>(
  {
    meetings: { contexts: [] },

    chordVisibleVariant: 0,
    laterComwList: [],
    isMiniAnchor: false,
    playerHideMode: 'min',
    marks: [],
    comFontSize: 15,
    comTopTools: ['mark-com', 'fullscreen-mode', 'chords-variant'],
    translationScreenConfigs: [defaultCmConfig],
    comComments: {},
    isMetronomeHide: true,
    metronomeAccentes: '1000',
    metronomeMainSound: '380',
    metronomeSecondarySound: '200',
    eventContext: [],
    isShowComHashComments: false,
    speedRollKf: 10,
    favoriteMeetings: { contexts: [], events: [] },

    // editor
    rules: [],
    eeStorage: {},
  },
  'cm',
  {
    serverStored: ['marks', 'favoriteMeetings', 'comComments', 'comTopTools'],
    dynamicStores: { ...comCommentFractionalStore.self },
  },
);

export const cmEventContextAtom = cmMolecule.select(s => s.eventContext);
export const cmMeetingsAtom = cmMolecule.select(s => s.meetings);
export const cmComFontSizeAtom = cmMolecule.select(s => s.comFontSize);
export const cmTranslationScreenConfigsAtom = cmMolecule.select(s => s.translationScreenConfigs);

export const isOpenChordImagesAtom = atom(false);
export const cmIsShowCatBindsInCompositionAtom = atom(false);
