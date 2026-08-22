import { cmComCommentCurrentComw2OpenAltiDictAtom } from '$cm/entities/com-comment';
import { cmComFavoriteComwsAtom, cmComSelectedComwsAtom, cmComTopToolsAtom } from '$cm/entities/index';
import { cmIDB } from '$cm/ext';

export const cmOnUserLogout = () => {
  cmComTopToolsAtom.reset();
  cmComSelectedComwsAtom.reset();
  cmComCommentCurrentComw2OpenAltiDictAtom.reset();
  cmComFavoriteComwsAtom.reset();

  cmIDB.tb.comCommentBlocks.clear();
  cmIDB.tb.localComCommentBlocks.clear();
  cmIDB.set.lastModifiedAt(0);
};
