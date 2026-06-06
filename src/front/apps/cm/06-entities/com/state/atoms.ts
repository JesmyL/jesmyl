import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { cmComMaxFontSize, cmComMinFontSize } from '$cm/shared/const';
import { atom } from 'atomaric';
import { CmComWid, MigratableComToolName } from 'shared/api';

export const cmComChordHardLevelAtom = atom<1 | 2 | 3>(2, 'cm:chord-hard-level');
export const cmComIsComMiniAnchorAtom = atom(false, 'cm:is-com-mini-anchor');
export const cmComIsShowCatBindsInCompositionAtom = atom(false);

export const cmComChordVisibleVariantAtom = atom(ChordVisibleVariant.Maximal, 'cm:chordVisibleVariant');

export const cmComFavoriteComsAtom = atom<CmComWid[]>([], 'cm:favoriteComs');
export const cmComTopToolsAtom = atom<MigratableComToolName[]>(
  ['mark-com', 'fullscreen-mode', 'chords-variant'],
  'cm:comTopTools',
);

export const cmComFontSizeAtom = atom(16, {
  storageKey: 'cm:comFontSize',
  map: (val, prev) => (Math.abs(val) >= cmComMinFontSize && Math.abs(val) <= cmComMaxFontSize ? val : prev),
});

export const cmComSpeedRollKfAtom = atom(10, 'cm:speedRollKf');
export const cmComIsAudioPlayerHiddenAtom = atom(false, 'cm:isAudioPlayerHidden');
export const cmComLaterComwListAtom = atom<CmComWid[]>([], 'cm:laterComwList');
export const cmComSelectedComwsAtom = atom<CmComWid[]>([], 'cm:selectedComws');
export const cmComLastOpenComwAtom = atom<CmComWid | und>(undefined, 'cm:lastOpenComw');

export const cmComWidNumberDictAtom = atom<PRecord<CmComWid, number>>({});
