import { ReactNode, useCallback, useRef } from 'react';
import { emptyFunc } from 'shared/utils';
import { useSetRootAnchoredContent } from '../useSetRootAnchoredContent';
import { StyledModal, StyledModalScreen, StyledModalScreenWrapper } from './styled';

type ModalConfigMood = 'norm' | 'ko' | 'ok';

interface UserModalConfig {
  mood?: ModalConfigMood;
}

export interface ToastModalConfig extends UserModalConfig {
  showTime?: number;
}

const classNames = ['pointers-none'];

export function useToast(topConfig?: ToastModalConfig): (content?: ReactNode, config?: ToastModalConfig) => void {
  const onCloseRef = useRef<() => void>(emptyFunc);
  const timerRef = useRef<TimeOut>(0);
  const setContent = useSetRootAnchoredContent(onCloseRef);

  return useCallback(
    (content, config) => {
      setContent(
        <StyledModal className="type_toast">
          <StyledModalScreenWrapper className="type_toast">
            <StyledModalScreen className={'type_toast mood mood_' + ((topConfig ?? config)?.mood ?? '')}>
              {content}
            </StyledModalScreen>
          </StyledModalScreenWrapper>
        </StyledModal>,
        classNames,
      );

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onCloseRef.current(), config?.showTime ?? 3000);
    },
    [setContent, topConfig],
  );
}
