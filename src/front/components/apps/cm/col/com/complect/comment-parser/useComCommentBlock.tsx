import { cmIDB } from '#basis/lib/idb/cm';
import { useAtom } from 'front/08-shared/lib/atoms';
import { useEffect, useMemo } from 'react';
import { useComCommentText } from '../../../../com-comments-manager';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';
import { isComCommentRedactAtom } from './complect';
import { useComBlockCommentCssStyles } from './useComBlockCommentCssStyles';
import { useComBlockCommentUpdateBlockNames } from './useComBlockCommentUpdateBlockNames';

export const useComCommentBlockCss = (com: Com) => {
  const [isRedact, setIsRedact] = useAtom(isComCommentRedactAtom);
  const comment = useComCommentText(com.wid);

  const visibleOrders = useMemo(() => {
    return com.orders?.filter(ComBlockCommentMakerCleans.withHeaderTextOrderFilter);
  }, [com.orders]);

  const styles = useComBlockCommentCssStyles(com.wid, visibleOrders, comment);

  useComBlockCommentUpdateBlockNames(com, visibleOrders, isRedact, comment);

  useEffect(() => setIsRedact(false), [com.wid, setIsRedact]);

  return cmIDB.useValue.isShowComHashComments() ? styles : '';
};
