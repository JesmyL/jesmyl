import { Button } from '#shared/components/ui/button';
import { propagationStopper } from '#shared/lib/event-funcs';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { BibleTranslateModulesControl, BibleTranslatesContextProvider } from '$bible/ext';
import {
  cmComCommentRedactOrdSelectorIdAtom,
  useCmComCommentCheckIsIncludesBibleAddress,
} from '$cm/entities/com-comment';
import { CmCom, useCmComCommentBlockCss } from '$cm/ext';
import { cmIsShowMyCommentsAtom } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useState } from 'react';
import { itNIt } from 'shared/utils';
import styled, { RuleSet } from 'styled-components';
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

  const { commentCss, isThereUnsettedTranslate, isThereCorrectBibleText } = useCmComCommentBlockCss(
    props.com,
    !isShowMyComments || isCommentRedactorIsOpen != null,
  );
  const [isExpandFirstComment, setIsExpandFirstComment] = useState(true);

  return (
    <>
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

      <StyledContent $commentStyles={commentCss}>
        <div
          className={twMerge('com-orders-with-comments', isExpandFirstComment && 'expand-first-comment-bible-texts')}
        >
          {props.beforeCommentsNode}
          <span className="comment-holder" />
          <span className="comment-holder" />
          <span className="comment-holder" />
          <span className="comment-holder" />
          {props.children}
        </div>
      </StyledContent>
    </>
  );
};

const StyledContent = styled.div<{ $commentStyles?: RuleSet<object> | string }>`
  ${props => props.$commentStyles}
`;
