import { translateBase } from '#basis/locale';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { PresentationsBroadcastControlled } from '$presentations/widgets/broadcast';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const PresentationsApp = () => {
  if (!isElectronApp) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-x5 px-6 text-center">
        <span className="text-[clamp(1.4rem,4vw,2.4rem)] font-black tracking-tight text-x3">
          {translateBase(BaseLocaleKey.Presentations)}
        </span>
        <span className="max-w-md text-sm leading-relaxed text-x4">
          {translateBase(BaseLocaleKey.PresentationsDesktopOnly)}
        </span>
      </div>
    );
  }

  return <PresentationsBroadcastControlled />;
};
