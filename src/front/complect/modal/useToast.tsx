import { ReactNode, useCallback, useState } from 'react';
import Portal from '../popups/[complect]/Portal';
import { StyledModal, StyledModalScreen, StyledModalScreenWrapper } from './styled';

type ModalConfigMood = 'norm' | 'ko' | 'ok';

interface UserModalConfig {
  mood?: ModalConfigMood;
}

export interface ToastModalConfig extends UserModalConfig {
  showTime?: number;
}

interface UseModalConfig extends UserModalConfig {
  isOpen: boolean;
  content?: ReactNode;
}

const defaultUseModalConfig: UseModalConfig = {
  isOpen: false,
};

export default function useToast(
  topConfig?: ToastModalConfig,
): [ReactNode, (content?: ReactNode, config?: ToastModalConfig) => void] {
  const [config, setConfig] = useState(defaultUseModalConfig);
  const [timer, setTimer] = useState<TimeOut>();

  return [
    config.isOpen && (
      <Portal>
        <StyledModal className="type_toast">
          <StyledModalScreenWrapper className="type_toast">
            <StyledModalScreen className={'type_toast mood mood_' + (topConfig ?? config).mood}>
              {config.content}
            </StyledModalScreen>
          </StyledModalScreenWrapper>
        </StyledModal>
      </Portal>
    ),
    useCallback(
      (content, config) => {
        setConfig({
          ...config,
          isOpen: true,
          content,
        });
        clearTimeout(timer);
        setTimer(
          setTimeout(
            () => {
              setConfig(prev => ({ ...prev, isOpen: false }));
            },
            config?.showTime ?? 3000,
          ),
        );
      },
      [timer],
    ),
  ];
}
