import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { CmCom } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { useCmComCommentBlockCssStyles } from './useComBlockCommentCssStyles';

export const useCmComCommentBlockCss = (com: CmCom, isSetHashesOnly = false) => {
  const styles = useCmComCommentBlockCssStyles(com, isSetHashesOnly);

  return useAtomValue(cmComIsComMiniAnchorAtom) ? {} : styles;
};
