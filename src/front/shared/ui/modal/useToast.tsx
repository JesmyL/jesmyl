import { useCallback, useRef } from 'react';
import { emptyFunc } from 'shared/utils';
import { useSetRootAnchoredContent } from '../useSetRootAnchoredContent';
import { StyledModal, StyledModalScreen, StyledModalScreenWrapper } from './styled';

type ModalConfigMood = 'norm' | 'ko' | 'ok';

interface ToastModalConfig {
  mood?: ModalConfigMood;
  showTime?: number;
}

export function useToast(topConfig?: ToastModalConfig): (content: React.ReactNode, config?: ToastModalConfig) => void {
  const onCloseRef = useRef<() => void>(emptyFunc);
  const timerRef = useRef<TimeOut>(0);
  const setContent = useSetRootAnchoredContent(onCloseRef);

  return useCallback(
    (content, config) => {
      setContent(
        <StyledModal className="type_toast">
          <StyledModalScreenWrapper className="type_toast">
            <StyledModalScreen className={'type_toast mood mood_' + ((config ?? topConfig)?.mood ?? '')}>
              {content}
            </StyledModalScreen>
          </StyledModalScreenWrapper>
        </StyledModal>,
        ['pointers-none'],
      );

      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => onCloseRef.current(), config?.showTime ?? 3000);
    },
    [setContent, topConfig],
  );
}
