import { getParentNodeWithClassName } from '#shared/lib/getParentNodeWithClassName';
import { addEventListenerWithDelayPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { cmIsComMiniAnchorAtom } from '$cm/atoms';
import { cmComCommentRedactOrdSelectorIdAtom } from '$cm/basis/lib/store/atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';

export const useComCommentBlockFastReactions = (listRef: React.RefObject<HTMLDivElement | null>, com: Com) => {
  const isMiniAnchor = useAtomValue(cmIsComMiniAnchorAtom);

  useEffect(() => {
    if (isMiniAnchor) return;
    let isFirstClick = true;

    return hookEffectPipe()
      .pipe(
        addEventListenerWithDelayPipe(
          700,
          () => listRef.current,
          'mousedown',
          async event => {
            const comOrders = com.orders;
            if (comOrders === null) return;
            const visibleOrders = comOrders.filter(ComBlockCommentMakerCleans.withHeaderTextOrderFilter);

            if (isFirstClick) {
              isFirstClick = false;
              setTimeout(() => (isFirstClick = true), 500);
              return;
            }

            const { node, foundClassNames } = getParentNodeWithClassName(event, 'styled-block', ['styled-header']);

            if (node === null || !foundClassNames['styled-header']) return;

            const orderNN = +node.getAttribute('visible-ord-nn')!;
            if (mylib.isNaN(orderNN)) return;
            const ord = visibleOrders[orderNN - 1];
            if (ord == null) return;

            cmComCommentRedactOrdSelectorIdAtom.set(ComBlockCommentMakerCleans.makeOrdSelector(ord));
          },
        ),
      )
      .effect();
  }, [com.orders, isMiniAnchor, listRef]);
};
