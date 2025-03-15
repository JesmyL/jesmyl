import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useLastOpenComw } from '$cm/basis/lib/com-selections';
import { useEffect } from 'react';
import { cmCurrentComwIdPrefix } from '../lib/consts';
import { ComFaceListProps } from './_ComList';

export const useScrollToCurrentComFace = (
  listRef: React.RefObject<HTMLDivElement | null>,
  props: ComFaceListProps,
  deps: unknown[],
) => {
  const lastOpenComw = useLastOpenComw();

  useEffect(() => {
    if (listRef.current === null || lastOpenComw === undefined || props.isPutCcomFaceOff || props.titles) return;

    const listNode = listRef.current;
    let isFound = false;

    const scrollToCom = () => {
      if (isFound) return;
      const node = listNode.querySelector(`#${cmCurrentComwIdPrefix}${lastOpenComw}`);

      if (node !== null) {
        isFound = true;
        node.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    };

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(scrollToCom, 0),
        setTimeoutPipe(scrollToCom, 10),
        setTimeoutPipe(scrollToCom, 50),
        setTimeoutPipe(scrollToCom, 100),
        setTimeoutPipe(scrollToCom, 200),
        setTimeoutPipe(scrollToCom, 500),
      )
      .effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listRef, lastOpenComw, props.isPutCcomFaceOff, props.titles, ...deps]);
};
