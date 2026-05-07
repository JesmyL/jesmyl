import { TextInput } from '#shared/ui/TextInput';
import { takeCmComCommentKindBlockDict, useCmComCommentBlock } from '$cm/entities/com-comment';
import { CmCom, cmIDB } from '$cm/ext';
import { CmComCommentBlockSpecialSelector } from 'shared/api';
import { useDeferredCallback } from 'shared/utils/useDeferredCallback';
import { comBlockKindsConfig } from 'shared/values/cm/block-kinds/comBlockKinds.config';
import { twMerge } from 'tailwind-merge';

export const CmComCommentKindComments = ({ commentAlti, com }: { commentAlti: number; com: CmCom }) => {
  const deferredCallback = useDeferredCallback();
  const { localCommentBlock, commentBlock } = useCmComCommentBlock(com.wid);
  const kindCommentTexts = takeCmComCommentKindBlockDict(com.wid, localCommentBlock, commentBlock);

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
                    const dictList = localCommentBlock?.dl ?? [];

                    dictList[commentAlti] ??= {};
                    dictList[commentAlti][CmComCommentBlockSpecialSelector.Kinds] = {
                      ...kindCommentTexts,
                      [kind.key]: value,
                    };

                    cmIDB.tb.localComCommentBlocks.put({
                      ...localCommentBlock,
                      comw: com.wid,
                      m: Date.now(),
                      dl: dictList,
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
