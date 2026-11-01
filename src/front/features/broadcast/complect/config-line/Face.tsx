import { translateBase } from '#basis/locale';
import { ScreenBroadcastConfig } from '#features/broadcast/model';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { twMerge } from 'tailwind-merge';

interface ScreenBroadcastFaceProps {
  configi: number;
  config: ScreenBroadcastConfig;
  putOnClick: (configi: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  putOnClose?: (configi: number) => PropagationStopper;
  className: string;
}

export const ScreenBroadcastFace = ({
  configi,
  config,
  putOnClick,
  putOnClose,
  className,
}: ScreenBroadcastFaceProps) => {
  return (
    <div
      className={twMerge('inline-flex gap-2 between pointer ml-2 px-[10px] py-[3px] rounded-[5px] text-x1 min-w-[70px]', className)}
      onClick={putOnClick(configi)}
    >
      <span>{config.title}</span>
      {putOnClose && (
        <TheIconButton
          icon="Cancel01"
          confirm={translateBase(BaseLocaleKey.CloseConfirm)}
          onClick={putOnClose(configi)}
        />
      )}
    </div>
  );
};
