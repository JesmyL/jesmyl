import { TextInput } from '#shared/ui/TextInput';
import { useCmComCommentBlock, useCmComCommentTextBlockTaker, useCmComCommentUpdater } from '$cm/entities/com-comment';
import { CmComCommentBlockSimpleSelector, CmComWid } from 'shared/api';
import { useDeferredCallback } from 'shared/utils/useDeferredCallback';

export const CmComCommentSimpleComments = ({
  altCommentKey,
  ordSelectorId,
  comw,
}: {
  altCommentKey: string | null;
  ordSelectorId: CmComCommentBlockSimpleSelector;
  comw: CmComWid;
}) => {
  const deferredCallback = useDeferredCallback();
  const { localCommentBlock, commentBlock } = useCmComCommentBlock(comw);
  const takeCommentTexts = useCmComCommentTextBlockTaker(comw, localCommentBlock, commentBlock);
  const texts = takeCommentTexts(ordSelectorId) ?? [];
  const updateComment = useCmComCommentUpdater(comw);

  return (
    <>
      {texts.concat(texts.length < 3 ? '' : [])?.map((line, linei) => {
        return (
          <TextInput
            key={`${altCommentKey}${linei}`}
            defaultValue={line}
            multiline
            className="mb-3"
            onInput={value => {
              deferredCallback(
                async () =>
                  updateComment(
                    texts => {
                      texts = [...texts];
                      texts[linei] = value;
                      return texts;
                    },
                    ordSelectorId,
                    altCommentKey,
                  ),
                1000,
                false,
              );
            }}
          />
        );
      })}
    </>
  );
};
