import { mylib } from '#shared/lib/my-lib';
import { cmConstantsConfigAtom, cmIDB } from '$cm/shared/state';
import { atom } from 'atomaric';
import { CmComCommentBlockSelector, CmComWid } from 'shared/api';

export const cmComCommentRedactOrdSelectorIdAtom = atom<CmComCommentBlockSelector | null>(null);
export const cmComCommentCurrentOpenedAltKeyAtom = atom(
  {} as PRecord<CmComWid, string> & { last: string | null },
  'cm:cmComCommentCurrentOpenedAltKey',
);

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
