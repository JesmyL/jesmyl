import { addEventListenerPipe, hookEffectPipe } from 'front/08-shared/lib/hookEffectPipe';
import { useActualRef } from 'front/08-shared/lib/hooks/useActualRef';
import { getParentNodeWithClassName } from 'front/08-shared/lib/utils';
import { useEffect, useRef } from 'react';

export const useBibleListFaceClickListener = (
  idPrefix: `${string}-`,
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
          const idStr = chapterFace.node?.id.slice(idPrefix.length);

          if (idStr == null) return;

          onClickRef.current(+idStr, event);
        }),
      )
      .effect();
  }, [faceClassName, idPrefix.length, onClickRef]);

  return listRef;
};
