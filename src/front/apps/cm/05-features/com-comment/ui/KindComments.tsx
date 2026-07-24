import { currentLangiAtom, translateDynamic } from '#basis/locale';
import { TextInput } from '#shared/ui/TextInput';
import {
  cmComCommentExtractSelector,
  takeCmComCommentKindBlockDict,
  useCmComCommentBlock,
} from '$cm/entities/com-comment';
import { cmIDB } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { CmComCommentBlockSpecialSelector } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { checkIsNil, checkIsNotNil } from 'shared/utils/checkIs';
import { useDeferredCallback } from 'shared/utils/useDeferredCallback';
import { comBlockKindsConfig } from 'shared/values/cm/block-kinds/comBlockKinds.config';
import { twMerge } from 'tailwind-merge';

export const CmComCommentKindComments = ({ commentAlti, com }: { commentAlti: number; com: CmCom }) => {
  const deferredCallback = useDeferredCallback();
  const { localCommentBlock, commentBlock } = useCmComCommentBlock(com.wid);
  const kindCommentTexts = takeCmComCommentKindBlockDict(com.wid, localCommentBlock, commentBlock);
  const langi = useAtomValue(currentLangiAtom);

  const usedKindCountDict =
    com.orders?.reduce(
      (countDict, ord) =>
        ord.kind
          ? {
              ...countDict,
              [cmComCommentExtractSelector(ord.kind)]: (countDict[cmComCommentExtractSelector(ord.kind)] ?? 0) + 1,
            }
          : countDict,
      {} as PRecord<number, number>,
    ) ?? {};

  return (
    <>
      {comBlockKindsConfig.map(kind => {
        const usedKindCount = usedKindCountDict[kind.key];

        return (
          ((kind.key > 0 && !kind.isInherit && (usedKindCount ?? 0) > 1) ||
            checkIsNotNil(kindCommentTexts?.[kind.key])) && (
            <TextInput
              key={kind.key}
              label={
                <span className={twMerge(checkIsNil(usedKindCount) ? 'text-xKO' : usedKindCount < 2 && 'opacity-50')}>
                  {translateDynamic(langi)(it => it.cm.com.kind[kind.key])}
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
