import { TextInput } from '#shared/ui/TextInput';
import { cmComCommentUpdater, useCmComCommentTextBlockTakerWithoutComments } from '$cm/entities/com-comment';
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
  const takeCommentTexts = useCmComCommentTextBlockTakerWithoutComments(comw);
  const texts = takeCommentTexts(ordSelectorId) ?? [];

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
                  cmComCommentUpdater(
                    comw,
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
