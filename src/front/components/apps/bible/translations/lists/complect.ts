import { useEffect, useRef } from 'react';
import { useActualRef } from '../../../../../shared/lib/+hooks/useActualRef';
import { addEventListenerPipe, hookEffectPipe } from '../../../../../shared/lib/hookEffectPipe';
import { getParentNodeWithClassName } from '../../../../../shared/lib/utils';

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
