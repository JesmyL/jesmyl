import { Button } from '#shared/components/ui/button';
import { propagationStopper } from '#shared/lib/event-funcs';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { BibleTranslateModulesControl, BibleTranslatesContextProvider } from '$bible/ext';
import {
  cmComCommentRedactOrdSelectorIdAtom,
  useCmComCommentBlockCss,
  useCmComCommentCheckIsIncludesBibleAddress,
} from '$cm/entities/com-comment';
import { cmIsShowMyCommentsAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { CmCom } from 'shared/const/cm/Com';
import { commentHolderNodes } from 'shared/const/cm/commentHolderNodes';
import { itNIt } from 'shared/utils';
import { twMerge } from 'tailwind-merge';

type Props = {
  com: CmCom;
  children: React.ReactNode;
  beforeCommentsNode?: React.ReactNode;
};

export const TheCmComWithComments = (props: Props) => {
  const isComCommentIncludesBibleAddress = useCmComCommentCheckIsIncludesBibleAddress(props.com);

  if (isComCommentIncludesBibleAddress)
    return (
      <BibleTranslatesContextProvider isSetAllTranslates>
        <Content {...props} />
      </BibleTranslatesContextProvider>
    );

  return <Content {...props} />;
};

const Content = (props: Props) => {
  const isShowMyComments = useAtomValue(cmIsShowMyCommentsAtom);
  const isCommentRedactorIsOpen = useDebounceValue(useAtomValue(cmComCommentRedactOrdSelectorIdAtom));

  const { commentCssNode, isThereUnsettedTranslate, isThereCorrectBibleText } = useCmComCommentBlockCss(
    props.com,
    !isShowMyComments || isCommentRedactorIsOpen != null,
  );
  const [isExpandFirstComment, setIsExpandFirstComment] = useState(true);

  return (
    <>
      {commentCssNode}

      <div
        className="flex gap-3"
        onClick={propagationStopper}
      >
        {isThereUnsettedTranslate && <BibleTranslateModulesControl />}
        {isThereCorrectBibleText && (
          <Button
            icon={isExpandFirstComment ? 'ViewOffSlash' : 'View'}
            onClick={() => setIsExpandFirstComment(itNIt)}
          />
        )}
      </div>

      <div
        className={twMerge(
          'com-orders-with-comments weight-add',
          isExpandFirstComment && 'expand-first-comment-bible-texts',
        )}
      >
        {props.beforeCommentsNode}
        {commentHolderNodes}
        {props.children}
      </div>
    </>
  );
};
