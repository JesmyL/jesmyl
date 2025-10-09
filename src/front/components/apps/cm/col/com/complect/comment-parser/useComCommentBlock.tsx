import { cmIsComMiniAnchorAtom } from '$cm/atoms';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { Com } from '../../Com';
import { useComBlockCommentCssStyles } from './useComBlockCommentCssStyles';

export const useComCommentBlockCss = (com: Com) => {
  const visibleOrders = useMemo(() => com.visibleOrders(), [com]);

  const styles = useComBlockCommentCssStyles(com.wid, visibleOrders);

  return useAtomValue(cmIsComMiniAnchorAtom) ? {} : styles;
};
