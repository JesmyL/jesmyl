import { getParentNodeWithClassName } from '#shared/lib/getParentNodeWithClassName';
import { addEventListenerWithDelayPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { isCmComAudioPlayerOpenMoversAtom } from '$cm/entities/com-audio-player';
import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { CmCom } from '$cm/ext';
import {
  CmComCommentConstructorPropKey,
  CmComCommentConstructorPropsDictWordRulePropsKey,
  CmComCommentConstructorRulePropsDict,
} from '$cm/shared/model/com-comment';
import { cmLineCommentConstructorRulePropsDictAtom } from '$cm/shared/state/com-comment.atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { wait } from 'shared/utils';
import { cmComCommentRedactOrdSelectorIdAtom } from '../state/atoms';
import { cmComCommentTextRulesDetector } from '../utils/cmComCommentTextRulesDetector';
import { takeCmComCommentTextBlock } from './useCmComCommentBlock';

export const useCmComCommentBlockFastReactions = (listRef: React.RefObject<HTMLDivElement | null>, com: CmCom) => {
  const isMiniAnchor = useAtomValue(cmComIsComMiniAnchorAtom);
  const isOpenMoversButtons = useAtomValue(isCmComAudioPlayerOpenMoversAtom);

  useEffect(() => {
    if (isOpenMoversButtons || isMiniAnchor) return;
    let isFirstClick = true;
    let firstEvent = '';

    const onDown = async (event: MouseEvent & TouchEvent) => {
      if (!firstEvent) firstEvent = event.type;
      if (firstEvent !== event.type) return;

      if (isFirstClick) {
        isFirstClick = false;
        setTimeout(() => {
          isFirstClick = true;
          firstEvent = '';
        }, 500);
        return;
      }

      const { node, foundClassNames } = getParentNodeWithClassName(event, 'styled-block', ['styled-header']);

      if (node === null || !foundClassNames['styled-header']) return;

      const selector = +node.getAttribute('ord-selector')!;
      if (mylib.isNaN(selector)) return;
      const { ord } = com.getOrderBySelector(selector);
      if (ord == null) return;

      (async () => {
        const propsDict: CmComCommentConstructorRulePropsDict = {};
        const wordChordiMaxDict: PRecord<CmComCommentConstructorPropsDictWordRulePropsKey, number> = {};
        const commentTexts = await takeCmComCommentTextBlock(ord.makeSelector(), ord.com.wid);

        if (commentTexts)
          cmComCommentTextRulesDetector(commentTexts, props => {
            let key: CmComCommentConstructorPropKey;

            if ('blocki' in props) key = `b${props.blocki}`;
            else if ('chordi' in props) {
              const wordKey = `l${props.linei}w${props.wordi}` as const;

              wordChordiMaxDict[wordKey] ??= 0;
              wordChordiMaxDict[wordKey]++;

              key = `${wordKey}c${props.chordi}${props.place}`;
            } else if ('wordi' in props) key = `l${props.linei}w${props.wordi}${props.place}`;
            else key = `l${props.linei}`;

            if (!(key in propsDict)) propsDict[key] = props as never;
          });

        cmLineCommentConstructorRulePropsDictAtom.set({ dict: propsDict, wordChordiMaxDict });

        await wait(100);

        cmComCommentRedactOrdSelectorIdAtom.set(ord.makeSelector());
      })();
    };

    return hookEffectPipe()
      .pipe(
        addEventListenerWithDelayPipe(1000, () => listRef.current, 'mousedown', onDown),
        addEventListenerWithDelayPipe(1000, () => listRef.current, 'touchstart', onDown),
      )
      .effect();
  }, [com, isMiniAnchor, isOpenMoversButtons, listRef]);
};
