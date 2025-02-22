import { hookEffectPipe, setTimeoutPipe } from '#shared/lib/hookEffectPipe';
import { mylib } from '#shared/lib/my-lib';
import { useEffect } from 'react';
import { cmCurrentComwIdPrefix } from '../lib/consts';
import { ComFaceListProps } from './_ComList';

export const useScrollToCurrentComFace = (listRef: React.RefObject<HTMLDivElement | null>, props: ComFaceListProps) => {
  useEffect(() => {
    if (listRef.current === null || props.ccomw === undefined || props.isPutCcomFaceOff || props.titles) return;

    const node = listRef.current.querySelector(`#${cmCurrentComwIdPrefix}${props.ccomw}`);

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
