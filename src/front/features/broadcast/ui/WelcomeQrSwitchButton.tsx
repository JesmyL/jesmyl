import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { isShowBroadcastInitialSlideAtom } from '../initial-slide-context';

export const BroadcastWelcomeQrSwitchButton = () => {
  const isInitialSlideShow = useAtomValue(isShowBroadcastInitialSlideAtom);

  return (
    <LazyIcon
      icon="QrCode"
      className="pointer mr-2"
      kind={isInitialSlideShow ? 'SolidRounded' : undefined}
      onClick={isShowBroadcastInitialSlideAtom.do.toggle}
    />
  );
};
