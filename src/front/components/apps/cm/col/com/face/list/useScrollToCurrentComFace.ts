import { useEffect } from 'react';
import { hookEffectPipe, setTimeoutPipe } from '../../../../../../../complect/hookEffectPipe';
import { MyLib, mylib } from 'front/utils';
import { ComFaceListProps, currentComwIdPrefix } from './_ComList';

export const useScrollToCurrentComFace = (listRef: React.RefObject<HTMLDivElement>, props: ComFaceListProps) => {
  useEffect(() => {
    if (listRef.current === null || props.ccomw === undefined || props.isPutCcomFaceOff || props.titles) return;

    const node = listRef.current.querySelector(`#${currentComwIdPrefix}${props.ccomw}`);

    if (node === null) return;

    return hookEffectPipe()
      .pipe(
        setTimeoutPipe(() => {
          const parent = (function get(node: HTMLElement | null): HTMLElement | null {
            return node && (node.scrollHeight > node.clientHeight ? node : get(node.parentElement));
          })(node as never);

          if (parent == null) {
            node.scrollIntoView({ block: 'center' });
            return;
          }

          mylib.scrollToView(node, 'top', {
            parent,
            top: 36,
          });
        }),
      )
      .effect();
  }, [listRef, props.ccomw, props.isPutCcomFaceOff, props.titles]);
};
