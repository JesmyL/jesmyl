import { mylib } from '#shared/lib/my-lib';
import { ChordVisibleVariant, PlayerHideMode } from '$cm/Cm.model';
import { atom } from 'atomaric';
import { CmComCommentBlockSelector, CmComWid, MigratableComToolName } from 'shared/api';
import { cmConstantsDefaultConfig } from 'shared/values/cm/cmConstantsDefaultConfig';
import { cmIDB } from './cmIDB';

export const cmFavoriteComsAtom = atom<CmComWid[]>([], 'cm:favoriteComs');
export const cmComTopToolsAtom = atom<MigratableComToolName[]>(
  ['mark-com', 'fullscreen-mode', 'chords-variant'],
  'cm:comTopTools',
);
export const cmChordVisibleVariantAtom = atom(ChordVisibleVariant.Maximal, 'cm:chordVisibleVariant');
export const cmConstantsConfigAtom = atom(cmConstantsDefaultConfig, 'cm:constantsConfig');
export const cmIsShowFavouritesInTranslationsAtom = atom(false, 'cm:isShowFavouritesInTranslations');
export const cmComFontSizeAtom = atom(14, 'cm:comFontSize');
export const cmSpeedRollKfAtom = atom(10, 'cm:speedRollKf');
export const cmPlayerHideModeAtom = atom<PlayerHideMode>('expand', 'cm:playerHideMode');
export const cmLaterComwListAtom = atom<CmComWid[]>([], 'cm:laterComwList');
export const cmSelectedComwsAtom = atom<CmComWid[]>([], 'cm:selectedComws');
export const cmLastOpenComwAtom = atom<CmComWid | und>(undefined, 'cm:lastOpenComw');

export const cmComCommentRedactOrdSelectorIdAtom = atom<CmComCommentBlockSelector | null>(null);
export const cmComCommentAltKeyAtom = atom<string | null>(null, 'cm:comCurrentCommentAltKey');
export const cmComCommentRegisteredAltKeysAtom = atom(new Set<string>(), {
  do: (set, get, self) => ({
    init: async () => {
      if (!self.isInitialValue()) return;

      const max = cmConstantsConfigAtom.get().maxComCommentAlternativesCount;
      if (!max || get().size >= max) return;

      const newKeySet = new Set<string>();

      [...(await cmIDB.tb.localComCommentBlocks.toArray()), ...(await cmIDB.tb.comCommentBlocks.toArray())].some(
        comment => {
          return (
            comment.alt != null &&
            mylib.keys(comment.alt).some(key => {
              newKeySet.add(key);
              return newKeySet.size >= max;
            })
          );
        },
      );

      set(newKeySet);
    },
  }),
});
