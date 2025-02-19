import { ReactNode, TouchEventHandler, useCallback, useEffect, useState } from 'react';
import { useActualRef } from '../../../lib/+hooks/useActualRef';
import { ThrowEvent } from '../../../lib/eventer/ThrowEvent';
import { Portal } from '../../Portal';
import {
  StyledModal,
  StyledModalBody,
  StyledModalFooter,
  StyledModalHeader,
  StyledModalScreen,
  StyledModalScreenWrapper,
} from '../lib/styled';

type ModalConfigMood = 'norm' | 'ko' | 'ok';

interface UserModalConfig {
  mood?: ModalConfigMood;
  onOpenSwitch?: () => void;
}

const stoppedEvent: TouchEventHandler<HTMLDivElement> = event => event.stopPropagation();

interface UseModalConfig extends UserModalConfig {
  isOpen: boolean;
  content?: Contenter;
}

const defaultUseModalConfig: UseModalConfig = {
  isOpen: false,
};

const modalElements = {
  actionButton: (content: ReactNode) => <div className="color--7">{content}</div>,
  header: (content: ReactNode) => <StyledModalHeader>{content}</StyledModalHeader>,
  body: (content: ReactNode) => <StyledModalBody className="margin-big-gap-v">{content}</StyledModalBody>,
  footer: (content: ReactNode) => <StyledModalFooter>{content}</StyledModalFooter>,
};

type Contenter = (elements: typeof modalElements, close: () => void) => JSX.Element;

export const useModal = (
  topContent?: Contenter,
  onOpenSwitch?: (is: boolean) => void,
  isForceOpen?: boolean,
): [ReactNode, (_event?: any, content?: Contenter, config?: UseModalConfig) => void, () => void] => {
  const [config, setConfig] = useState(defaultUseModalConfig);
  const onOpenSwitchRef = useActualRef(onOpenSwitch);

  const close = useCallback(() => {
    config.onOpenSwitch?.();
    onOpenSwitchRef.current?.(false);
    setConfig(prev => ({ ...prev, isOpen: false }));
  }, [config, onOpenSwitchRef]);

  useEffect(() => {
    if (isForceOpen || config.isOpen) {
      return ThrowEvent.listenKeyDown('Escape', event => {
        event.stopPropagation();
        close();
      });
    }
  }, [close, isForceOpen, config.isOpen]);

  return [
    (isForceOpen || config.isOpen) && (
      <Portal>
        <StyledModal
          onTouchStart={stoppedEvent}
          className={'type_screen' + (isForceOpen === false ? ' force-hidden' : '')}
          onClick={event => {
            event.stopPropagation();
            close();
          }}
        >
          <StyledModalScreenWrapper className="type_screen">
            <StyledModalScreen
              className={'type_screen mood mood_' + config.mood}
              onClick={event => event.stopPropagation()}
            >
              {config.content === undefined ? topContent?.(modalElements, close) : config.content(modalElements, close)}
            </StyledModalScreen>
          </StyledModalScreenWrapper>
        </StyledModal>
      </Portal>
    ),
    (_event, content, config) => {
      onOpenSwitch?.(true);
      setConfig({
        ...config,
        isOpen: true,
        content,
      });
    },
    close,
  ];
};
