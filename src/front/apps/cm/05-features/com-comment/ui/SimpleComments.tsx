import { mylib } from '#shared/lib/my-lib';
import { TextInput } from '#shared/ui/TextInput';
import { useCmComCommentBlock, useCmComCommentTextBlockTaker } from '$cm/entities/com-comment';
import { cmConstantsConfigAtom, cmIDB } from '$cm/ext';
import { useAtomValue } from 'atomaric';
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
  const { maxComCommentAlternativesCount } = useAtomValue(cmConstantsConfigAtom);
  const { localCommentBlock, commentBlock } = useCmComCommentBlock(comw);
  const takeCommentTexts = useCmComCommentTextBlockTaker(comw, localCommentBlock, commentBlock);
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
                async () => {
                  const texts = [...(takeCommentTexts(ordSelectorId) ?? [])];
                  const isAltComment =
                    altCommentKey != null &&
                    (localCommentBlock?.alt?.[altCommentKey] != null ||
                      mylib.keys(localCommentBlock?.alt ?? []).length < maxComCommentAlternativesCount);

                  texts[linei] = value;

                  cmIDB.tb.localComCommentBlocks.put({
                    ...localCommentBlock,
                    comw,
                    m: Date.now(),
                    d: isAltComment
                      ? localCommentBlock?.d
                      : {
                          ...localCommentBlock?.d,
                          [ordSelectorId]: texts,
                        },
                    alt: isAltComment
                      ? {
                          ...localCommentBlock?.alt,
                          [altCommentKey]: {
                            ...localCommentBlock?.alt?.[altCommentKey],
                            [ordSelectorId]: texts,
                          },
                        }
                      : localCommentBlock?.alt,
                  });
                },
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
