import { cmComCommentAltKeyAtom } from '$cm/entities/com-comment';
import { cmComFavoriteComsAtom, cmComSelectedComwsAtom, cmComTopToolsAtom } from '$cm/entities/index';
import { cmIDB } from '$cm/ext';

export const cmOnUserLogout = () => {
  cmComTopToolsAtom.reset();
  cmComSelectedComwsAtom.reset();
  cmComCommentAltKeyAtom.reset();
  cmComFavoriteComsAtom.reset();

  cmIDB.tb.comCommentBlocks.clear();
  cmIDB.tb.localComCommentBlocks.clear();
  cmIDB.set.lastModifiedAt(0);
};
