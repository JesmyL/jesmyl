import { currentBroadcastConfigiAtom, isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useScreenBroadcastCurrentConfig } from '#features/broadcast/hooks/configs';
import { useBibleBroadcastScreenConfig } from '$bible/entities/broadcast';
import { BibleTranslatesContextProvider } from '$bible/ext';
import { useBibleBroadcastKeyListener } from '$bible/shared/lib/useBibleBroadcastKeyListener';
import { BibleCurrentTextsContext } from '$bible/shared/state/CurrentTextsContext';
import { useAtomValue } from 'atomaric';
import { BibleBroadcastScreenScreen } from './BibleBroadcastScreen';

export function BibleBroadcastScreenCurrentScreen(props: BroadcastScreenProps) {
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const currentConfig = useBibleBroadcastScreenConfig(props.configi ?? currentConfigi);

  const isActualVisible = useAtomValue(isBroadcastTextVisibleAtom);

  const config = useScreenBroadcastCurrentConfig();

  return (
    <BibleTranslatesContextProvider>
      <BibleCurrentTextsContext isPreview={props.isPreview}>
        <BibleBroadcastScreenScreen
          {...props}
          bibleConfig={currentConfig}
          windowResizeUpdatesNum={config?.proportion}
          isVisible={props.isPreview ? true : isActualVisible}
        />
        {props.win !== window && <Listen win={props.win} />}
      </BibleCurrentTextsContext>
    </BibleTranslatesContextProvider>
  );
}

const Listen = ({ win }: { win: Window }) => {
  useBibleBroadcastKeyListener(win);
  return <></>;
};
