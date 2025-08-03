import { cmIsComMiniAnchorAtom } from '$cm/atoms';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';
import { useComBlockCommentCssStyles } from './useComBlockCommentCssStyles';

export const useComCommentBlockCss = (com: Com) => {
  const visibleOrders = useMemo(() => {
    return com.orders?.filter(ComBlockCommentMakerCleans.withHeaderTextOrderFilter);
  }, [com.orders]);

  const styles = useComBlockCommentCssStyles(com.wid, visibleOrders);

  return useAtomValue(cmIsComMiniAnchorAtom) ? '' : styles;
};
