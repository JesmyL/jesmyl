import { cmComCommentCurrentComw2OpenAltiDictAtom } from '$cm/entities/com-comment';
import { cmComFavoriteComwsAtom, cmComSelectedComwsAtom, cmComTopToolsAtom } from '$cm/entities/index';
import { cmIDB } from '$cm/ext';
import { purgeCmEditorCache } from '$cm/shared/lib/cmEditorCache';
import { emptyFunc } from 'shared/utils';

export const cmOnUserLogout = async () => {
  cmComTopToolsAtom.reset();
  cmComSelectedComwsAtom.reset();
  cmComCommentCurrentComw2OpenAltiDictAtom.reset();
  cmComFavoriteComwsAtom.reset();

  cmIDB.tb.comCommentBlocks.clear();
  cmIDB.tb.localComCommentBlocks.clear();
  cmIDB.set.lastModifiedAt(0);

  await purgeCmEditorCache().catch(emptyFunc);
};
