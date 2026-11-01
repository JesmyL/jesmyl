import { makeBroadcastTextStroke } from '#features/broadcast/complect/defaults';
import { broadcastShowAlertLineConfigIdAtom } from '#features/broadcast/initial-slide-context';
import { complectIDB } from '$index/shared/state';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';

export const AlertLineSlideText = () => {
  const alertLineText = complectIDB.useValue.broadcastAlertLine();
  const showAlertConfigId = useAtomValue(broadcastShowAlertLineConfigIdAtom);
  const config = useLiveQuery(() => complectIDB.tb.alertLineConfigs.get(showAlertConfigId ?? -1), [showAlertConfigId]);

  if (!config) return;

  const { icon, id, title, withBg, bgFileId, top, bg, bgColor, ...styles } = config;

  const text = alertLineText || config.text;

  return (
    <div
      className="absolute overflow-hidden h-full w-full top-0 left-0"
      style={{ ...styles, backgroundColor: '' }}
    >
      <StyledAlertLine
        $speed={config.speed}
        className="absolute flex w-fit"
        style={{
          top: `${top}%`,
          ...(withBg ? { background: bg, backgroundColor: bgColor } : {}),
          ...makeBroadcastTextStroke(styles),
        }}
      >
        <StyledItem className={itemClass}>{text}</StyledItem>
        <StyledItem className={itemClass}>{text}</StyledItem>
        <StyledItem className={itemClass}>{text}</StyledItem>
      </StyledAlertLine>
    </div>
  );
};

const itemClass = 'min-w-[100vw] px-[0.75em] py-[0.05em] whitespace-nowrap';

const anim = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const StyledAlertLine = styled.div<{ $speed: number }>`
  --animation-time: ${props => props.$speed}s;

  -webkit-transform-style: preserve-3d; /* Фикс возможного глюка с морганием в Сафари */
`;

const StyledItem = styled.div`
  animation: ${anim} var(--animation-time) linear infinite;
  -webkit-backface-visibility: hidden; /* Фикс возможного глюка с морганием в Сафари */
`;
