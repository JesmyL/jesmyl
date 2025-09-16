import { Drawer } from '#shared/components/ui/drawer';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ReactNode, useEffect, useRef } from 'react';
import { emptyFunc } from 'shared/utils';
import { BottomPopupOnCloseContext } from './context';

interface Props {
  open?: boolean;
  title?: ReactNode;
  children?: ReactNode;
  onClose: (is: false) => void;
  isPreventCloseOnClick?: boolean;
  id?: string;
}

export const BottomPopup = ({ children, onClose, isPreventCloseOnClick, id, title, open }: Props) => {
  const popupContainer = useRef<HTMLDivElement>(null);
  const overContentContainer = useRef<HTMLDivElement>(null);

  useEffect(() => ThrowEvent.listenKeyDown('Escape', () => onClose(false)), [onClose]);

  useEffect(() => {
    if (popupContainer.current === null) return;

    const popupContainerNode = popupContainer.current;

    return hookEffectLine()
      .addEventListener(popupContainerNode, 'scroll', () => {
        if (popupContainerNode.scrollTop === 0) onClose(false);
      })
      .effect();
  }, [onClose]);

  useEffect(() => {
    if (overContentContainer.current === null || popupContainer.current === null) return;
    popupContainer.current.scrollTop = overContentContainer.current.clientHeight;
  }, []);

  return (
    <Drawer.Above
      open={open ?? true}
      onClose={() => onClose(false)}
    >
      <Drawer.Content
        className="h-[100vh] w-full"
        id={id}
      >
        <Drawer.Close>
          <Drawer.Header>
            <Drawer.Title className="flex gap-3">
              {title}
              <LazyIcon icon="Cancel01" />
            </Drawer.Title>
            <Drawer.Description></Drawer.Description>
          </Drawer.Header>
        </Drawer.Close>

        <div
          className="w-full overflow-scroll"
          st-no-scrollbar=""
        >
          <BottomPopupOnCloseContext.Provider
            value={isPreventCloseOnClick ? emptyFunc : () => setTimeout(onClose, 100, false)}
          >
            <div className="bg-x1 py-5 text-x4">{children}</div>
          </BottomPopupOnCloseContext.Provider>
        </div>
      </Drawer.Content>
    </Drawer.Above>
  );
};
