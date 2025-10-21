import { ChordVisibleVariant, PlayerHideMode } from '$cm/shared/model';
import { atom } from 'atomaric';
import { CmComWid, MigratableComToolName, SokiAuthLogin } from 'shared/api';

export const cmComChordHardLevelAtom = atom<1 | 2 | 3>(2, 'cm:chord-hard-level');
export const cmComIsComMiniAnchorAtom = atom(false, 'cm:is-com-mini-anchor');
export const cmComIsShowCatBindsInCompositionAtom = atom(false);
export const cmComShareComCommentPropsAtom = atom<{ login: SokiAuthLogin; comw: CmComWid } | null>(null);

export const cmComChordVisibleVariantAtom = atom(ChordVisibleVariant.Maximal, 'cm:chordVisibleVariant');

export const cmComFavoriteComsAtom = atom<CmComWid[]>([], 'cm:favoriteComs');
export const cmComTopToolsAtom = atom<MigratableComToolName[]>(
  ['mark-com', 'fullscreen-mode', 'chords-variant'],
  'cm:comTopTools',
);

export const cmComIsShowFavouritesInBroadcastsAtom = atom(false, 'cm:isShowFavouritesInBroadcast');
export const cmComFontSizeAtom = atom(14, 'cm:comFontSize');
export const cmComSpeedRollKfAtom = atom(10, 'cm:speedRollKf');
export const cmComPlayerHideModeAtom = atom<PlayerHideMode>('expand', 'cm:playerHideMode');
export const cmComLaterComwListAtom = atom<CmComWid[]>([], 'cm:laterComwList');
export const cmComSelectedComwsAtom = atom<CmComWid[]>([], 'cm:selectedComws');
export const cmComLastOpenComwAtom = atom<CmComWid | und>(undefined, 'cm:lastOpenComw');
