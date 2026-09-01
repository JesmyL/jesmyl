import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComLastOpenSchwAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { ScheduleWidgetWidNone } from 'shared/api';
import { broadcastCurrentTextAppAtom } from '../atoms';
import { isShowBroadcastInitialSlideAtom } from '../initial-slide-context';

export const BroadcastWelcomeQrSwitchButton = ({ toggleAppIcon }: { toggleAppIcon: KnownStameskaIconName }) => {
  const isInitialSlideShow = useAtomValue(isShowBroadcastInitialSlideAtom);
  const schw = useAtomValue(cmComLastOpenSchwAtom);

  if (!schw || schw === ScheduleWidgetWidNone) return;

  return (
    <div className="flex">
      <LazyIcon
        icon="QrCode"
        className="pointer mr-2"
        kind={isInitialSlideShow ? 'SolidRounded' : undefined}
        onClick={isShowBroadcastInitialSlideAtom.do.toggle}
      />
      <LazyIcon
        icon={toggleAppIcon}
        className="pointer mr-2"
        onClick={broadcastCurrentTextAppAtom.do.switch}
      />
    </div>
  );
};
