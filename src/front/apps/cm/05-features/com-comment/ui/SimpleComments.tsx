import { TextInput } from '#shared/ui/TextInput';
import {
  cmComCommentLocalCommentsUpdater,
  useCmComCommentTextBlockTakerWithoutComments,
} from '$cm/entities/com-comment';
import { CmComCommentBlockSimpleSelector, CmComWid } from 'shared/api';
import { useDeferredCallback } from 'shared/utils/useDeferredCallback';

export const CmComCommentSimpleComments = ({
  commentAlti,
  ordSelector,
  comw,
}: {
  commentAlti: number;
  ordSelector: CmComCommentBlockSimpleSelector;
  comw: CmComWid;
}) => {
  const deferredCallback = useDeferredCallback();
  const takeCommentTexts = useCmComCommentTextBlockTakerWithoutComments(comw);
  const texts = takeCommentTexts(ordSelector) ?? [];

  return (
    <>
      {texts.concat(texts.length < 3 ? '' : [])?.map((line, linei) => {
        return (
          <TextInput
            key={`${commentAlti}${linei}`}
            defaultValue={line}
            multiline
            className="mb-3"
            onInput={value => {
              deferredCallback(
                async () =>
                  cmComCommentLocalCommentsUpdater(comw, commentAlti, {
                    [`s${ordSelector}`]: (texts: string[]) => {
                      texts = [...texts];
                      texts[linei] = value;
                      return texts;
                    },
                  }),
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
