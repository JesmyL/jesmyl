import { mylib, MyLib } from '#shared/lib/my-lib';
import { cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import {
  CmComCommentBlockSimpleSelector,
  CmComCommentBlockSpecialSelector,
  CmComWid,
  ICmComCommentBlock,
} from 'shared/api';
import { CmComCommentConstructorPropsDictSelectorRulePropsKey } from 'shared/model/cm/com-comment';
import { checkIsStartsWith } from 'shared/utils/checkIs';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';
import { cmComCommentCurrentComw2OpenAltiDictAtom } from '../state/atoms';

export const useCmComCommentBlock = (comw: CmComWid) => {
  const localCommentBlock = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.get(comw), [comw]);
  const commentBlock = useLiveQuery(() => cmIDB.tb.comCommentBlocks.get(comw), [comw]);

  return { localCommentBlock, commentBlock };
};

export const takeCmComCommentTextBlock = (
  comw: CmComWid,
  selector: CmComCommentBlockSimpleSelector,
  localCommentBlock: ICmComCommentBlock | nil,
  commentBlock: ICmComCommentBlock | nil,
  commentAlti?: number | nil,
) => {
  if (commentAlti == null) {
    const altCommentKeys = cmComCommentCurrentComw2OpenAltiDictAtom.get();
    commentAlti = altCommentKeys[comw] ?? altCommentKeys.lasti;
  }

  return localCommentBlock?.dl?.[commentAlti]?.[selector] ?? commentBlock?.dl?.[commentAlti]?.[selector];
};

export const useCmComCommentTextBlockTaker = (
  comw: CmComWid,
  localCommentBlock: ICmComCommentBlock | nil,
  commentBlock: ICmComCommentBlock | nil,
) => {
  const altCommentKeys = useAtomValue(cmComCommentCurrentComw2OpenAltiDictAtom);
  const commentAlti = altCommentKeys[comw] ?? altCommentKeys.lasti;

  return useCallback(
    (selector: CmComCommentBlockSimpleSelector) =>
      takeCmComCommentTextBlock(comw, selector, localCommentBlock, commentBlock, commentAlti),
    [commentAlti, commentBlock, comw, localCommentBlock],
  );
};
export const useCmComCommentTextBlockTakerWithoutComments = (comw: CmComWid) => {
  const { commentBlock, localCommentBlock } = useCmComCommentBlock(comw);

  return useCmComCommentTextBlockTaker(comw, localCommentBlock, commentBlock);
};

export const takeCmComCommentKindBlockDict = (
  comw: CmComWid,
  localCommentBlock: ICmComCommentBlock | nil,
  commentBlock: ICmComCommentBlock | nil,
  commentAlti?: number | nil,
) => {
  if (commentAlti == null) {
    const altCommentKeys = cmComCommentCurrentComw2OpenAltiDictAtom.get();
    commentAlti = altCommentKeys[comw] ?? altCommentKeys.lasti;
  }

  return (
    localCommentBlock?.dl?.[commentAlti]?.[CmComCommentBlockSpecialSelector.Kinds] ??
    commentBlock?.dl?.[commentAlti]?.[CmComCommentBlockSpecialSelector.Kinds]
  );
};

export const cmComCommentLocalCommentsUpdater = async (
  comw: CmComWid,
  commentAlti: number,
  ordUpdaters: PRecord<
    CmComCommentConstructorPropsDictSelectorRulePropsKey,
    ((prevBlocks: string[]) => string[]) | string[]
  >,
) => {
  const localCommentBlock = await cmIDB.tb.localComCommentBlocks.get(comw);
  const commentBlock = await cmIDB.tb.comCommentBlocks.get(comw);
  const ordTextsDict: PRecord<CmComCommentBlockSimpleSelector, string[]> = {};
  const ordKindTextsDict: PRecord<CmComBlockKindKey, string> = {};
  const kindDict = takeCmComCommentKindBlockDict(comw, localCommentBlock, commentBlock, commentAlti);

  let isChanged = false;

  MyLib.entries(ordUpdaters).forEach(([ordSelector, updater]) => {
    if (!updater) return;

    if (checkIsStartsWith(ordSelector, 'k')) {
      const kind = Math.abs(+ordSelector.slice(1)) as CmComBlockKindKey.Bridge;
      const commentText = kindDict?.[kind];
      const texts = mylib.isFunc(updater) ? updater([commentText ?? '']) : updater;

      if (commentText === texts[0]) return;
      isChanged = true;

      ordKindTextsDict[kind] = texts[0] || '';

      return;
    }

    const takeCommentTexts = takeCmComCommentTextBlock(
      comw,
      ordSelector === `s${CmComCommentBlockSpecialSelector.Head}`
        ? (ordSelector as CmComCommentBlockSpecialSelector.Head)
        : +ordSelector.slice(1),
      localCommentBlock,
      commentBlock,
      commentAlti,
    );

    const prev = [...(takeCommentTexts ?? [])];
    const texts = mylib.isFunc(updater) ? updater(prev) : updater;

    const isNoChanges = !Array.from({ length: Math.max(prev.length, texts.length) }).some(
      (_, texti) => (prev[texti] ?? '') !== (texts[texti] ?? ''),
    );

    if (isNoChanges) return;
    isChanged = true;

    const selector = ordSelector.slice(1) as CmComCommentBlockSimpleSelector;

    if (selector === CmComCommentBlockSpecialSelector.Head) ordTextsDict[selector] = texts;
    else ordTextsDict[selector] = texts;
  });

  const dictList = localCommentBlock?.dl ?? [];

  dictList[commentAlti] = {
    ...dictList[commentAlti],
    ...ordTextsDict,
    [CmComCommentBlockSpecialSelector.Kinds]: {
      ...dictList[commentAlti]?.[CmComCommentBlockSpecialSelector.Kinds],
      ...ordKindTextsDict,
    },
  };

  if (isChanged) {
    cmIDB.tb.localComCommentBlocks.put({
      ...localCommentBlock,
      comw,
      m: Date.now(),
      dl: dictList,
    });
  }
};
