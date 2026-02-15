import { getParentNodeWithClassName } from '#shared/lib/getParentNodeWithClassName';
import { addEventListenerWithDelayPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { isCmComAudioPlayerOpenMoversAtom } from '$cm/entities/com-audio-player';
import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { CmCom } from '$cm/ext';
import { updateCmComCommentConstructorRulePropsDict } from '$cm/shared/lib/updateComCommentConstructorRulePropsDict';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { wait } from 'shared/utils';
import { cmComCommentRedactOrdSelectorIdAtom } from '../state/atoms';

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
        const ordSelector = ord.makeSelector();

        await updateCmComCommentConstructorRulePropsDict(com.wid, ordSelector);
        await wait(100);

        cmComCommentRedactOrdSelectorIdAtom.set(ordSelector);
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
