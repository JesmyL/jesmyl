import { Drawer } from '#shared/components/ui/drawer';
import { ThrowEvent } from '#shared/lib/eventer/ThrowEvent';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
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

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(popupContainerNode, 'scroll', () => {
          if (popupContainerNode.scrollTop === 0) onClose(false);
        }),
      )
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
        className="max-h-[85dvh] w-full min-h-0"
        id={id}
      >
        <Drawer.Header className="shrink-0">
          <div className="flex items-center gap-3 ml-7 min-w-0">
            <Drawer.Title className="min-w-0 flex-1 text-wrap">{title}</Drawer.Title>
            <Drawer.Close className="shrink-0">
              <LazyIcon
                icon="Cancel01"
                className="shrink-0"
              />
            </Drawer.Close>
          </div>
          <Drawer.Description></Drawer.Description>
        </Drawer.Header>

        <div
          className="w-full flex-1 min-h-0 overflow-scroll"
          st-no-scrollbar=""
        >
          <BottomPopupOnCloseContext value={isPreventCloseOnClick ? emptyFunc : () => setTimeout(onClose, 100, false)}>
            <div className="bg-x1 py-5 text-x4">{children}</div>
          </BottomPopupOnCloseContext>
        </div>
      </Drawer.Content>
    </Drawer.Above>
  );
};
