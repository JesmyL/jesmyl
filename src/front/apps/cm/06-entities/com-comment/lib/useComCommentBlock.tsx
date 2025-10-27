import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { CmCom } from '../../com/lib/Com';
import { useCmComCommentBlockCssStyles } from './useComBlockCommentCssStyles';

export const useCmComCommentBlockCss = (com: CmCom, isSetHashesOnly = false) => {
  const styles = useCmComCommentBlockCssStyles(com, isSetHashesOnly);

  return useAtomValue(cmComIsComMiniAnchorAtom) ? {} : styles;
};
