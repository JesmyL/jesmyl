import { translateBase } from '#basis/locale';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComLastOpenSchwAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { ScheduleWidgetWidDef } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { UsedBaseLocaleKey } from 'shared/model/+locale/base';
import { BroadcastViewApp } from '../Broadcast.model';
import { broadcastCurrentTextAppAtom } from '../atoms';
import { isShowBroadcastInitialSlideAtom } from '../initial-slide-context';
import { switchBroadcastApp } from '../lib/broadcast-live-data';

const sourceAppConfigs: { app: BroadcastViewApp; icon: KnownStameskaIconName; title: UsedBaseLocaleKey }[] = [
  { app: 'bible', icon: 'Book02', title: BaseLocaleKey.Bible },
  { app: 'cm', icon: 'BookOpen02', title: BaseLocaleKey.CmApp },
  { app: 'presentations', icon: 'Presentation01', title: BaseLocaleKey.Presentations },
];

export const BroadcastWelcomeQrSwitchButton = () => {
  const app = useAtomValue(broadcastCurrentTextAppAtom);
  const isInitialSlideShow = useAtomValue(isShowBroadcastInitialSlideAtom);
  const schw = useAtomValue(cmComLastOpenSchwAtom);
  const isShowQr = schw != null && schw !== ScheduleWidgetWidDef;

  return (
    <div className="flex">
      {!isShowQr || (
        <LazyIcon
          icon="QrCode"
          className="pointer mr-2"
          kind={isInitialSlideShow ? 'SolidRounded' : undefined}
          onClick={isShowBroadcastInitialSlideAtom.do.toggle}
        />
      )}
      {sourceAppConfigs.map(({ app: targetApp, icon, title }) =>
        targetApp === 'presentations' && !isElectronApp ? null : (
          <LazyIcon
            key={targetApp}
            icon={icon}
            title={translateBase(title)}
            className="pointer mr-2"
            kind={targetApp === app ? 'SolidRounded' : undefined}
            onClick={() => switchBroadcastApp(targetApp)}
          />
        ),
      )}
    </div>
  );
};
