import { getParentNodeWithClassName } from '#shared/lib/getParentNodeWithClassName';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { useEffect, useRef } from 'react';
import { checkIsNaN } from 'shared/utils/checkIs';

export const useBibleBroadcastListFaceClickListener = (
  attrName: `${string}-${string}`,
  faceClassName: string,
  onClick: (itemi: number, event: MouseEvent) => void,
) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const onClickRef = useActualRef(onClick);

  useEffect(() => {
    if (listRef.current === null) return;
    const listNode = listRef.current;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(listNode, 'mousedown', event => {
          const chapterFace = getParentNodeWithClassName(event, faceClassName);
          const index = +(chapterFace.node?.getAttribute(attrName) as string)!;

          if (checkIsNaN(index)) return;

          onClickRef.current(index, event);
        }),
      )
      .effect();
  }, [faceClassName, attrName, onClickRef]);

  return listRef;
};
