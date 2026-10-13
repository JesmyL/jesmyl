import { currentBroadcastConfigiAtom, isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useGetScreenBroadcastConfig } from '#features/broadcast/hooks/configs';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { useCmComCurrentParts } from '$cm/entities/com';
import { cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { useCmBroadcastSlidesContext } from '$cm/features/broadcast';
import { useCmBroadcastScreenConfig } from '$cm/shared/lib/broadcast';
import { useAtomValue } from 'atomaric';
import { useMemo } from 'react';
import { MyFileBoxId } from 'x/my-files';
import { useCmBroadcastScreenKeyDownListen } from '../lib/useCmBroadcastScreenKeyDownListen';
import { useCmBroadcastScreenWinResizeListen } from '../lib/win-resize-lesten';
import { CmBroadcastScreen } from './Screen';

export const CmBroadcastCurrentScreen = (props: BroadcastScreenProps & Partial<FontSizeContainProps>) => {
  const getCurrentConfig = useGetScreenBroadcastConfig();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const currentConfig = useCmBroadcastScreenConfig(props.configi ?? currentConfigi);
  const forceUpdates = useCmBroadcastScreenWinResizeListen(props.win);
  const isVisible = useAtomValue(isBroadcastTextVisibleAtom);

  const { fix } = useCmComCurrentParts();
  const fixBgFileId = fix?.bgFileId;

  const cmConfig = useMemo(() => {
    if (!currentConfig || !fixBgFileId) return currentConfig;

    return { ...currentConfig, bgFileId: fixBgFileId as MyFileBoxId, withBg: true };
  }, [currentConfig, fixBgFileId]);

  const { html, nextHtml, slides, slidei, nextSlidei, hash } = useCmBroadcastSlidesContext();

  const switchDirection = useAtomValue(cmBroadcastSwitchBlockDirectionAtom);

  return (
    <>
      <CmBroadcastScreen
        {...props}
        cmConfig={cmConfig}
        html={html}
        nextText={nextHtml}
        isChorded={!!slides[slidei]?.ord.isChBlock()}
        isNextChorded={!!slides[nextSlidei]?.ord.isChBlock()}
        isVisible={isVisible}
        subUpdates={`${currentConfigi}${forceUpdates}${getCurrentConfig(currentConfigi)?.proportion}`}
        freshSlideKey={slides[slidei]?.minText || hash || html}
        slideSwitchDir={switchDirection}
      />
      {props.win !== window && (
        <Listen
          win={props.win}
          configi={props.configi ?? 0}
        />
      )}
    </>
  );
};

const Listen = ({ win, configi }: { win: Window; configi: number }) => {
  useCmBroadcastScreenKeyDownListen(win, configi);

  return <></>;
};
