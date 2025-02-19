export function propsOfClicker({
  onCtxMenu,
}: {
  onCtxMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) {
  if (!onCtxMenu) return {};

  let onContextMenuTimer: unknown;
  let isContextMenuClicked = false;
  let touchMoveIterations = 0;

  const reset = () => {
    isContextMenuClicked = false;
  };
  const action: typeof onCtxMenu = event => {
    onCtxMenu(event);
    touchMoveIterations = 0;
  };

  return {
    onContextMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();
      if (isContextMenuClicked) return;
      isContextMenuClicked = true;
      action(event);
      setTimeout(reset, 100);
    },
    onTouchStart: (event: React.TouchEvent<HTMLDivElement> & { clientX?: unknown; clientY?: unknown }) => {
      if (isContextMenuClicked) return;
      isContextMenuClicked = true;
      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;
      onContextMenuTimer = setTimeout(action, 700, event);
      setTimeout(reset, 100);
    },
    onTouchMove: () => {
      if (touchMoveIterations++ > 10) clearTimeout(onContextMenuTimer as never);
    },
    onTouchEnd: () => {
      isContextMenuClicked = true;
      clearTimeout(onContextMenuTimer as never);
      setTimeout(reset, 100);
    },
  };
}
