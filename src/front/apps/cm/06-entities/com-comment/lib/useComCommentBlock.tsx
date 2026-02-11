import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { CmCom } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { CmComOrderWid } from 'shared/api';
import { useCmComCommentBlockCssStyles } from './useComBlockCommentCssStyles';

export const useCmComCommentBlockCss = (com: CmCom, isSetHashesOnly = false, forOrdSelectorOnly?: CmComOrderWid) => {
  const styles = useCmComCommentBlockCssStyles(com, isSetHashesOnly, forOrdSelectorOnly);

  return useAtomValue(cmComIsComMiniAnchorAtom) ? {} : styles;
};
