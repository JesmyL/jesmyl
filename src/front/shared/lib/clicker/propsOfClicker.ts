interface ClientPoints {
  clientX: number;
  clientY: number;
}

interface Props<Elem> {
  onCtxMenu?: (event: React.MouseEvent<Elem, MouseEvent> | (React.TouchEvent<Elem> & ClientPoints)) => void;
  onDblClick?: (event: React.MouseEvent<Elem, MouseEvent> | (React.TouchEvent<Elem> & ClientPoints)) => void;
}

export function propsOfClicker<Elem extends HTMLElement>({ onCtxMenu, onDblClick }: Props<Elem>): object {
  const mouseCallback = (event: React.MouseEvent<Elem>) => {
    event.stopPropagation();
  };
  const touchCallback = (event: React.TouchEvent<Elem>) => {
    event.stopPropagation();
  };

  const overridableProps = {
    onTouchStart: (event: React.TouchEvent<Elem>) => {
      touchCallback(event);

      (event as never as { clientX: unknown }).clientX = event.touches[0].clientX;
      (event as never as { clientY: unknown }).clientY = event.touches[0].clientY;
    },
    onTouchMove: touchCallback,
    onTouchEnd: touchCallback,
    onDoubleClick: mouseCallback,
    onContextMenu: mouseCallback,
  } satisfies React.DOMAttributes<Elem>;

  if (onCtxMenu !== undefined) {
    let onContextMenuTimer: TimeOut;
    let isContextMenuClicked = false;
    let touchMoveIterations = 0;

    const onCtxMenuReset = () => {
      isContextMenuClicked = false;
      touchMoveIterations = 0;
    };
    const onCtxMenuAction: typeof onCtxMenu = event => {
      onCtxMenu(event);
      touchMoveIterations = 0;
    };

    const props = { ...overridableProps } as const;

    overridableProps.onContextMenu = event => {
      props.onContextMenu(event);

      if (isContextMenuClicked) return;
      isContextMenuClicked = true;
      onCtxMenuAction(event);
      setTimeout(onCtxMenuReset, 100);
    };

    overridableProps.onTouchMove = event => {
      props.onTouchMove(event);

      if (touchMoveIterations++ > 10) clearTimeout(onContextMenuTimer as never);
    };

    overridableProps.onTouchStart = event => {
      props.onTouchStart(event);

      if (isContextMenuClicked) return;
      isContextMenuClicked = true;
      onContextMenuTimer = setTimeout(onCtxMenuAction, 700, event);
      setTimeout(onCtxMenuReset, 100);
    };

    overridableProps.onTouchEnd = event => {
      props.onTouchEnd(event);

      isContextMenuClicked = true;
      clearTimeout(onContextMenuTimer as never);
      setTimeout(onCtxMenuReset, 100);
    };
  }

  if (onDblClick !== undefined) {
    let isDblClicked = false;
    let prevClick: null | number = null;
    const reset = () =>
      setTimeout(() => {
        isDblClicked = false;
        prevClick = null;
      }, 700);

    const props = { ...overridableProps } as const;

    overridableProps.onDoubleClick = event => {
      props.onDoubleClick(event);

      reset();

      if (isDblClicked) return;
      isDblClicked = true;
      onDblClick(event);
    };

    overridableProps.onTouchStart = event => {
      props.onTouchStart(event);

      reset();
      if (isDblClicked) return;
      const now = Date.now();

      if (prevClick === null) prevClick = now;
      else if (prevClick > now - 500) {
        onDblClick(event as never);
        isDblClicked = true;
      }
    };
  }

  return overridableProps;
}
