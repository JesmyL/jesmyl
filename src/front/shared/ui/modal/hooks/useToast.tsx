import { ReactNode, useCallback, useRef, useState } from 'react';
import Portal from '../../../../complect/popups/[complect]/Portal';
import { StyledModal, StyledModalScreen, StyledModalScreenWrapper } from '../lib/styled';

type ModalConfigMood = 'norm' | 'ko' | 'ok';

interface UserModalConfig {
  mood?: ModalConfigMood;
}

interface ToastModalConfig extends UserModalConfig {
  showTime?: number;
}

interface UseModalConfig extends UserModalConfig {
  isOpen: boolean;
  content?: ReactNode;
}

const defaultUseModalConfig: UseModalConfig = {
  isOpen: false,
};

const classNames = ['pointers-none'];

export const useToast = (
  topConfig?: ToastModalConfig,
): [ReactNode, (content?: ReactNode, config?: ToastModalConfig) => void] => {
  const [config, setConfig] = useState(defaultUseModalConfig);
  const timerRef = useRef<TimeOut>();

  return [
    config.isOpen && (
      <Portal classNames={classNames}>
        <StyledModal className="type_toast">
          <StyledModalScreenWrapper className="type_toast">
            <StyledModalScreen className={'type_toast mood mood_' + (topConfig ?? config).mood}>
              {config.content}
            </StyledModalScreen>
          </StyledModalScreenWrapper>
        </StyledModal>
      </Portal>
    ),
    useCallback((content, config) => {
      setConfig({
        ...config,
        isOpen: true,
        content,
      });
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setConfig(prev => ({ ...prev, isOpen: false })), config?.showTime ?? 3000);
    }, []),
  ];
};
