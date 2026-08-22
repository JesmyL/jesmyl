import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { cmComMaxFontSize, cmComMinFontSize } from '$cm/shared/const';
import { atom } from 'atomaric';
import { CmComWid, MenuComToolName, ScheduleWidgetWid } from 'shared/api';

export const cmComChordHardLevelAtom = atom<1 | 2 | 3>(2, 'cm:chord-hard-level');
export const cmComIsComMiniAnchorAtom = atom(false, 'cm:is-com-mini-anchor');
export const cmComIsShowCatBindsInCompositionAtom = atom(false);

export const cmComChordVisibleVariantAtom = atom(ChordVisibleVariant.Maximal, 'cm:chordVisibleVariant');

export const cmComFavoriteComwsAtom = atom<CmComWid[]>([], 'cm:favoriteComs');
export const cmComTopToolsAtom = atom<MenuComToolName[]>(
  [MenuComToolName.MarkCom, MenuComToolName.FullscreenMode, MenuComToolName.ChordsVariant],
  'cm:comTopTools_v1',
);

export const cmComFontSizeAtom = atom(16, {
  storageKey: 'cm:comFontSize',
  map: val => (val < 0 ? val : Math.min(Math.max(Math.abs(Math.trunc(val)), cmComMinFontSize), cmComMaxFontSize)),
});

export const cmComSpeedRollKfAtom = atom(10, 'cm:speedRollKf');
export const cmComIsAudioPlayerHiddenAtom = atom(false, 'cm:isAudioPlayerHidden');
export const cmComLaterComwListAtom = atom<CmComWid[]>([], 'cm:laterComwList');
export const cmComSelectedComwsAtom = atom<CmComWid[]>([], 'cm:selectedComws');
export const cmComLastOpenComwAtom = atom<CmComWid | und>(undefined, 'cm:lastOpenComw');
export const cmComLastOpenSchwAtom = atom<ScheduleWidgetWid | nil>(null);

export const cmComWidNumberDictAtom = atom<PRecord<CmComWid, { i: number; n: string }>>({});
