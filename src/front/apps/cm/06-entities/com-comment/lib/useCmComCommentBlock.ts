import { mylib } from '#shared/lib/my-lib';
import { cmConstantsConfigAtom, cmIDB } from '$cm/shared/state';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback } from 'react';
import {
  CmComCommentBlockSimpleSelector,
  CmComCommentBlockSpecialSelector,
  CmComWid,
  ICmComCommentBlock,
} from 'shared/api';
import { cmComCommentCurrentOpenedAltKeyAtom } from '../state/atoms';

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
  altCommentKey?: string | nil,
) => {
  if (altCommentKey == null) {
    const altCommentKeys = cmComCommentCurrentOpenedAltKeyAtom.get();
    altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;
  }

  return altCommentKey != null
    ? (localCommentBlock?.alt?.[altCommentKey]?.[selector] ?? commentBlock?.alt?.[altCommentKey]?.[selector])
    : (localCommentBlock?.d?.[selector] ?? commentBlock?.d?.[selector]);
};

export const useCmComCommentTextBlockTaker = (
  comw: CmComWid,
  localCommentBlock: ICmComCommentBlock | nil,
  commentBlock: ICmComCommentBlock | nil,
) => {
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;

  return useCallback(
    (selector: CmComCommentBlockSimpleSelector) => {
      return takeCmComCommentTextBlock(comw, selector, localCommentBlock, commentBlock, altCommentKey);
    },
    [altCommentKey, commentBlock, comw, localCommentBlock],
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
  const altCommentKeys = useAtomValue(cmComCommentCurrentOpenedAltKeyAtom);
  const altCommentKey = altCommentKeys[comw] ?? altCommentKeys.last;

  return altCommentKey != null
    ? (localCommentBlock?.alt?.[altCommentKey]?.[CmComCommentBlockSpecialSelector.Kinds] ??
        commentBlock?.alt?.[altCommentKey]?.[CmComCommentBlockSpecialSelector.Kinds])
    : (localCommentBlock?.d?.[CmComCommentBlockSpecialSelector.Kinds] ??
        commentBlock?.d?.[CmComCommentBlockSpecialSelector.Kinds]);
};

export const useCmComCommentUpdater = (comw: CmComWid) => {
  const { maxComCommentAlternativesCount } = useAtomValue(cmConstantsConfigAtom);
  const { localCommentBlock, commentBlock } = useCmComCommentBlock(comw);
  const takeCommentTexts = useCmComCommentTextBlockTaker(comw, localCommentBlock, commentBlock);

  return useCallback(
    (
      updater: (prevBlocks: string[]) => string[],
      ordSelectorId: CmComCommentBlockSimpleSelector,
      altCommentKey: string | nil,
    ) => {
      const prev = [...(takeCommentTexts(ordSelectorId) ?? [])];
      const texts = updater(prev);

      const isNoChanges = !Array.from({ length: Math.max(prev.length, texts.length) }).some((_, texti) => {
        return (prev[texti] ?? '') !== (texts[texti] ?? '');
      });

      if (isNoChanges) return;

      const isAltComment =
        altCommentKey != null &&
        (localCommentBlock?.alt?.[altCommentKey] != null ||
          mylib.keys(localCommentBlock?.alt ?? []).length < maxComCommentAlternativesCount);

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
    [comw, localCommentBlock, maxComCommentAlternativesCount, takeCommentTexts],
  );
};
