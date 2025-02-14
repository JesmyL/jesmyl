import { cmIDB } from 'front/components/apps/cm/_db/cm-idb';
import { useEffect, useMemo } from 'react';
import { useAtom } from '../../../../../../../complect/atoms';
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
