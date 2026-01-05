import { TextInput } from '#shared/ui/TextInput';
import { useCmComCommentBlock, useCmComCommentKindBlockTaker } from '$cm/entities/com-comment';
import { CmCom, cmIDB } from '$cm/ext';
import { CmComCommentBlockSpecialSelector } from 'shared/api';
import { useDeferredCallback } from 'shared/utils/useDeferredCallback';
import { comBlockKindsConfig } from 'shared/values/cm/block-kinds/comBlockKinds.config';
import { twMerge } from 'tailwind-merge';

export const CmComCommentKindComments = ({ altCommentKey, com }: { altCommentKey: string | null; com: CmCom }) => {
  const deferredCallback = useDeferredCallback();
  const { localCommentBlock, commentBlock } = useCmComCommentBlock(com.wid);
  const kindCommentTexts = useCmComCommentKindBlockTaker(com.wid, localCommentBlock, commentBlock);

  const usedKindCountDict =
    com.orders?.reduce(
      (countDict, ord) =>
        ord.kind ? { ...countDict, [Math.abs(ord.kind)]: (countDict[Math.abs(ord.kind)] ?? 0) + 1 } : countDict,
      {} as PRecord<number, number>,
    ) ?? {};

  return (
    <>
      {comBlockKindsConfig.map(kind => {
        const usedKindCount = usedKindCountDict[kind.key];

        return (
          ((kind.key > 0 && !kind.isInherit && (usedKindCount ?? 0) > 1) || kindCommentTexts?.[kind.key] != null) && (
            <TextInput
              key={kind.key}
              label={
                <span className={twMerge(usedKindCount == null ? 'text-xKO' : usedKindCount < 2 && 'opacity-50')}>
                  {kind.title[0]}
                </span>
              }
              className="mb-3"
              defaultValue={kindCommentTexts?.[kind.key]}
              multiline
              onInput={(value: string) => {
                deferredCallback(
                  () => {
                    const texts = { ...kindCommentTexts, [kind.key]: value };
                    const isAltComment = altCommentKey != null;

                    cmIDB.tb.localComCommentBlocks.put({
                      ...localCommentBlock,
                      comw: com.wid,
                      m: Date.now(),
                      d: isAltComment
                        ? localCommentBlock?.d
                        : {
                            ...localCommentBlock?.d,
                            [CmComCommentBlockSpecialSelector.Kinds]: texts,
                          },
                      alt: isAltComment
                        ? {
                            ...localCommentBlock?.alt,
                            [altCommentKey]: {
                              ...localCommentBlock?.alt?.[altCommentKey],
                              [CmComCommentBlockSpecialSelector.Kinds]: texts,
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
          )
        );
      })}
    </>
  );
};
