import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { useCmComLastOpenComw } from '$cm/entities/com';
import { useEffect } from 'react';
import { cmComFaceCurrentComwIdPrefix } from '../const/ids';
import { CmComFaceListProps } from '../ui/_ComList';

export const useCmComFaceScrollToCurrentComFace = (
  listRef: React.RefObject<HTMLDivElement | null>,
  props: CmComFaceListProps,
  deps: unknown[],
) => {
  const lastOpenComw = useCmComLastOpenComw();

  useEffect(() => {
    if (listRef.current === null || lastOpenComw === undefined || props.isPutCcomFaceOff || props.titles) return;

    const listNode = listRef.current;
    let isFound = false;

    const scrollToCom = () => {
      if (isFound) return;
      const node = listNode.querySelector(`#${cmComFaceCurrentComwIdPrefix}${lastOpenComw}`);

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
