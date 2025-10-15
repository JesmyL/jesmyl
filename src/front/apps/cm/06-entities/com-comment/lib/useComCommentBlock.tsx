import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { CmCom } from '../../com/lib/Com';
import { useCmComCommentBlockCssStyles } from './useComBlockCommentCssStyles';

export const useCmComCommentBlockCss = (com: CmCom, isSetHashesOnly = false) => {
  const visibleOrders = useMemo(() => com.visibleOrders(), [com]);

  const styles = useCmComCommentBlockCssStyles(com.wid, visibleOrders, isSetHashesOnly);

  return useAtomValue(cmComIsComMiniAnchorAtom) ? {} : styles;
};
