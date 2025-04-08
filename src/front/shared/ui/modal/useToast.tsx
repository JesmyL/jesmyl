import { atom } from '#shared/lib/atom';
import { useCallback, useRef } from 'react';
import { useSetRootAnchoredContent } from '../useSetRootAnchoredContent';
import { StyledModal, StyledModalScreen, StyledModalScreenWrapper } from './styled';

type ModalConfigMood = 'norm' | 'ko' | 'ok';

interface ToastModalConfig {
  mood?: ModalConfigMood;
  showTime?: number;
}

const isOpenToastAtom = atom(false);

export const useToast = (
  topConfig?: ToastModalConfig,
): ((content: React.ReactNode, config?: ToastModalConfig) => void) => {
  const timerRef = useRef<TimeOut>(0);
  const setContent = useSetRootAnchoredContent(isOpenToastAtom);

  return useCallback(
    (content, config) => {
      setContent(
        <StyledModal className="type_toast pointers-none">
          <StyledModalScreenWrapper className="type_toast">
            <StyledModalScreen className={'type_toast mood mood_' + ((config ?? topConfig)?.mood ?? '')}>
              {content}
            </StyledModalScreen>
          </StyledModalScreenWrapper>
        </StyledModal>,
      );

      isOpenToastAtom.set(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(isOpenToastAtom.set, config?.showTime ?? 3000, false);
    },
    [setContent, topConfig],
  );
};
