import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { renderComponentInNewWindow } from '#shared/lib/renders';
import { memo, useEffect, useRef, useState } from 'react';

interface Props {
  target?: string;
  features?: string;
  children?: React.ReactNode;
  onInit?: (win: Window) => void;
}

let timeout: TimeOut;

export const NewWindow = (props: Props) => {
  const [isRender, setIsRender] = useState(true);

  return (
    isRender && (
      <Inner
        {...props}
        onClose={setIsRender}
      />
    )
  );
};

const Inner = memo((props: Props & { onClose: (isRender: false) => void }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (blockRef.current === null || parentRef.current === null) return;
      clearTimeout(timeout);
      const parentNode = parentRef.current;
      const blockNode = blockRef.current;

      const div = document.createElement('div');
      parentNode.insertBefore(div, blockNode);

      const win = renderComponentInNewWindow({
        reactNode: null,
        target: props.target,
        features: props.features,
        htmlNode: blockNode,
      });

      if (win) {
        props.onInit?.(win);
        const nodes = win.document.body.children;
        if (nodes.length > 1) nodes[0].remove();

        return hookEffectPipe()
          .pipe(
            addEventListenerPipe(win, 'beforeunload' as never, () => {
              parentNode.insertBefore(blockNode, div);
              div.remove();
              props.onClose(false);
            }),
          )
          .effect(() => {
            timeout = setTimeout(() => {
              win.close();
              props.onClose(false);
            }, 100);
          });
      } else props.onClose(false);
    } catch (_error) {
      //
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={parentRef}>
      <div ref={blockRef}>{props.children}</div>
    </div>
  );
});
