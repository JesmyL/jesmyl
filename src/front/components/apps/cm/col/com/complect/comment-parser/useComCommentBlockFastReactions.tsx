import { getParentNodeWithClassName } from '#shared/lib/getParentNodeWithClassName';
import { addEventListenerWithDelayPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { cmIsComMiniAnchorAtom } from '$cm/atoms';
import { cmComCommentRedactOrdSelectorIdAtom } from '$cm/basis/lib/store/atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { wait } from 'shared/utils';
import { Com } from '../../Com';

export const useComCommentBlockFastReactions = (listRef: React.RefObject<HTMLDivElement | null>, com: Com) => {
  const isMiniAnchor = useAtomValue(cmIsComMiniAnchorAtom);

  useEffect(() => {
    if (isMiniAnchor) return;
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
  }, [com, isMiniAnchor, listRef]);
};
