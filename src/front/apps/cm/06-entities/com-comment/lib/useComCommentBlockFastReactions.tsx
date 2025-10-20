import { getParentNodeWithClassName } from '#shared/lib/getParentNodeWithClassName';
import { addEventListenerWithDelayPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { isCmComAudioPlayerOpenMoversAtom } from '$cm/entities/com-audio-player';
import { cmComIsComMiniAnchorAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { wait } from 'shared/utils';
import { CmCom } from '../../com/lib/Com';
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

      const visibleOrders = com.visibleOrders();
      if (visibleOrders == null) return;

      const { node, foundClassNames } = getParentNodeWithClassName(event, 'styled-block', ['styled-header']);

      if (node === null || !foundClassNames['styled-header']) return;

      const orderNN = +node.getAttribute('visible-ord-nn')!;
      if (mylib.isNaN(orderNN)) return;
      const ord = visibleOrders[orderNN - 1];
      if (ord == null) return;

      await wait(500);

      cmComCommentRedactOrdSelectorIdAtom.set(ord.makeSelector());
    };

    return hookEffectPipe()
      .pipe(
        addEventListenerWithDelayPipe(1000, () => listRef.current, 'mousedown', onDown),
        addEventListenerWithDelayPipe(1000, () => listRef.current, 'touchstart', onDown),
      )
      .effect();
  }, [com, isMiniAnchor, isOpenMoversButtons, listRef]);
};
