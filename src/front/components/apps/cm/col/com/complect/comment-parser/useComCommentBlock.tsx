import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useComCommentText } from '$cm/com-comments-manager';
import { useAtomValue } from 'atomaric';
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
