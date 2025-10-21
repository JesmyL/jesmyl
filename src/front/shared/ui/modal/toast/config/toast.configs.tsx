import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export const makeToastKOMoodConfig = (className?: string | nil): Parameters<typeof toast>[1] => ({
  icon: <LazyIcon icon="Alert01" />,
  className: twMerge('bg-xKO! border-xKO!', className),
});

export const makeToastOKMoodConfig = (className?: string | nil): Parameters<typeof toast>[1] => ({
  icon: <LazyIcon icon="CheckmarkCircle01" />,
  className: twMerge('bg-xOK! border-xOK!', className),
});
