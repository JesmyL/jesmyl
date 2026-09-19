import { currentBroadcastConfigiAtom, isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useBibleBroadcastScreenConfig } from '$bible/entities/broadcast';
import { useBibleBroadcastKeyListener } from '$bible/shared/lib/useBibleBroadcastKeyListener';
import { BibleCurrentTextsContext } from '$bible/shared/state/CurrentTextsContext';
import { useAtomValue } from 'atomaric';
import { BibleBroadcastScreenScreen } from './BibleBroadcastScreen';

export function BibleBroadcastScreenCurrentScreen(props: BroadcastScreenProps) {
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const configi = props.configi ?? currentConfigi;
  const currentConfig = useBibleBroadcastScreenConfig(configi);

  const isActualVisible = useAtomValue(isBroadcastTextVisibleAtom);

  return (
    <BibleCurrentTextsContext isPreview={props.isPreview}>
      <BibleBroadcastScreenScreen
        {...props}
        bibleConfig={currentConfig}
        isVisible={props.isPreview || isActualVisible}
      />
      {props.win !== window && (
        <Listen
          win={props.win}
          configi={configi}
        />
      )}
    </BibleCurrentTextsContext>
  );
}

const Listen = ({ win, configi }: { win: Window; configi: number }) => {
  useBibleBroadcastKeyListener(win, configi);

  return <></>;
};
