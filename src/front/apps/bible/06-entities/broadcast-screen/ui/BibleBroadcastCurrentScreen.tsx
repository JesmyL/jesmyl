import { currentBroadcastConfigiAtom, isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useScreenBroadcastFaceLineListeners } from '#features/broadcast/complect/config-line/hooks/listeners';
import { useScreenBroadcastCurrentConfig } from '#features/broadcast/hooks/configs';
import { useBibleBroadcastScreenConfig } from '$bible/entities/broadcast';
import { useAtomValue } from 'atomaric';
import { BibleBroadcastScreenScreen } from './BibleBroadcastScreen';

export function BibleBroadcastScreenCurrentScreen(props: BroadcastScreenProps) {
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const currentConfig = useBibleBroadcastScreenConfig(props.configi ?? currentConfigi);

  const isActualVisible = useAtomValue(isBroadcastTextVisibleAtom);

  const config = useScreenBroadcastCurrentConfig();
  useScreenBroadcastFaceLineListeners();

  return (
    <BibleBroadcastScreenScreen
      {...props}
      bibleConfig={currentConfig}
      windowResizeUpdatesNum={config?.proportion}
      isVisible={props.isPreview ? true : isActualVisible}
    />
  );
}
