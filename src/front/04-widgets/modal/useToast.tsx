import { ReactNode, useCallback, useRef, useState } from 'react';
import Portal from '../../07-shared/ui/Portal';
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

const classNames = ['pointers-none'];

export default function useToast(
  topConfig?: ToastModalConfig,
): [ReactNode, (content?: ReactNode, config?: ToastModalConfig) => void] {
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
}
