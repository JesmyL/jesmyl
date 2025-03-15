import { useAtomValue } from '#shared/lib/atoms';
import { cmIDB } from '$cm/_db/cm-idb';
import { useComCommentText } from '$cm/com-comments-manager';
import { useMemo } from 'react';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';
import { isComCommentRedactAtom } from './complect';
import { useComBlockCommentCssStyles } from './useComBlockCommentCssStyles';
import { useComBlockCommentUpdateBlockNames } from './useComBlockCommentUpdateBlockNames';

export const useComCommentBlockCss = (com: Com) => {
  const isRedact = useAtomValue(isComCommentRedactAtom);
  const comment = useComCommentText(com.wid);

  const visibleOrders = useMemo(() => {
    return com.orders?.filter(ComBlockCommentMakerCleans.withHeaderTextOrderFilter);
  }, [com.orders]);

  const styles = useComBlockCommentCssStyles(com.wid, visibleOrders, comment);

  useComBlockCommentUpdateBlockNames(com, visibleOrders, isRedact, comment);

  return cmIDB.useValue.isShowComHashComments() ? styles : '';
};
