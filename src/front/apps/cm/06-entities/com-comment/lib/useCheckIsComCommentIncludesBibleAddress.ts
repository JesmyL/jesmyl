import { CmComCommentBlockSpecialSelector, CmComWid } from 'shared/api';
import { CmCom } from '../../com/lib/Com';
import { cmComCommentHeadBibleAddressRegExp } from '../utils/commentHeadBibleAddressRegExp';
import { useCmComCommentBlock, useCmComCommentTextBlockTaker } from './useCmComCommentBlock';

let isWasOpenComWithBibleAddressInComment = false;

export const useCmComCommentCheckIsIncludesBibleAddress = (com: CmCom | und) => {
  const comw = com?.wid ?? CmComWid.def;
  const { localCommentBlock, commentBlock } = useCmComCommentBlock(comw);
  const takeCommentTexts = useCmComCommentTextBlockTaker(comw, localCommentBlock, commentBlock);

  if (isWasOpenComWithBibleAddressInComment) return true;
  const comment = takeCommentTexts(CmComCommentBlockSpecialSelector.Head)?.join('\n') || '';

  isWasOpenComWithBibleAddressInComment = !!(com && comment?.match(cmComCommentHeadBibleAddressRegExp.regExp));

  return isWasOpenComWithBibleAddressInComment;
};
