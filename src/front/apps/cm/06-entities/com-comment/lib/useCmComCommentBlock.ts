import { MyLib } from '#shared/lib/my-lib';
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

  return localCommentBlock?.dl?.[commentAlti ?? 0]?.[selector] ?? commentBlock?.dl?.[commentAlti ?? 0]?.[selector];
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

export const useCmComCommentKindBlockTaker = (
  comw: CmComWid,
  localCommentBlock: ICmComCommentBlock | nil,
  commentBlock: ICmComCommentBlock | nil,
) => {
  const altCommentKeys = useAtomValue(cmComCommentCurrentComw2OpenAltiDictAtom);
  const commentAlti = altCommentKeys[comw] ?? altCommentKeys.lasti;

  return (
    localCommentBlock?.dl?.[commentAlti]?.[CmComCommentBlockSpecialSelector.Kinds] ??
    commentBlock?.dl?.[commentAlti]?.[CmComCommentBlockSpecialSelector.Kinds]
  );
};

export const cmComCommentUpdater = async (
  comw: CmComWid,
  commentAlti: number,
  ordUpdaters: PRecord<CmComCommentBlockSimpleSelector, (prevBlocks: string[]) => string[]>,
) => {
  const localCommentBlock = await cmIDB.tb.localComCommentBlocks.get(comw);
  const commentBlock = await cmIDB.tb.comCommentBlocks.get(comw);
  const ordTextsDict: PRecord<CmComCommentBlockSimpleSelector, string[]> = {};
  let isChanged = false;

  MyLib.entries(ordUpdaters).forEach(([ordSelector, updater]) => {
    if (!updater) return;

    const takeCommentTexts = takeCmComCommentTextBlock(
      comw,
      ordSelector === CmComCommentBlockSpecialSelector.Head
        ? (ordSelector as CmComCommentBlockSpecialSelector.Head)
        : +ordSelector,
      localCommentBlock,
      commentBlock,
      commentAlti,
    );

    const prev = [...(takeCommentTexts ?? [])];
    const texts = updater(prev);

    const isNoChanges = !Array.from({ length: Math.max(prev.length, texts.length) }).some((_, texti) => {
      return (prev[texti] ?? '') !== (texts[texti] ?? '');
    });

    if (isNoChanges) return;
    isChanged = true;

    ordTextsDict[ordSelector] = texts;
  });

  const dictList = localCommentBlock?.dl ?? [];

  dictList[commentAlti] = { ...dictList[commentAlti], ...ordTextsDict };

  if (isChanged) {
    cmIDB.tb.localComCommentBlocks.put({
      ...localCommentBlock,
      comw,
      m: Date.now(),
      dl: dictList,
    });
  }
};
