import { useCallback } from 'react';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';
import { LazyIcon } from '../the-icon/LazyIcon';

type ModalConfigMood = 'norm' | 'ko' | 'ok';

interface ToastModalConfig {
  mood?: ModalConfigMood;
  showTime?: number;
}

export const useToast = () => {
  return useCallback(
    (
      content: React.ReactNode,
      { showTime, duration, ...config }: ToastModalConfig & Parameters<typeof toast>[1] = {},
    ) => {
      toast(content, {
        duration: showTime ?? duration,
        icon: config.mood === 'ko' && <LazyIcon icon="Alert01" />,
        ...config,
        className: twMerge(
          config.mood === 'ko' && 'bg-xKO! border-xKO!',
          config.mood === 'ok' && 'bg-xOK! border-xOK!',
          config.className,
        ),
      });
    },
    [],
  );
};
