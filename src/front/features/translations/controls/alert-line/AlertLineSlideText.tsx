import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import styled, { css, keyframes } from 'styled-components';
import { complectIDB } from '../../../../components/index/state/complectIDB';
import { translationShowAlertLineConfigIdAtom } from '../../initial-slide-context';

export const AlertLineSlideText = () => {
  const alertLineText = complectIDB.useValue.translationAlertLine();
  const showAlertConfigId = useAtomValue(translationShowAlertLineConfigIdAtom);
  const config = useLiveQuery(() => complectIDB.tb.alertLineConfigs.get(showAlertConfigId ?? -1), [showAlertConfigId]);

  if (config == null) return null;

  const { icon, id, title, isWithBackground, backgroundInteractive, top, background, backgroundColor, ...styles } =
    config;

  const text = alertLineText || config.text;

  return (
    <StyledAlertLineContainer style={styles}>
      <StyledAlertLine
        style={{ top: `${top}%`, ...(isWithBackground ? { background, backgroundColor } : {}) }}
        $speed={config.speed}
      >
        <StyledItem>{text}</StyledItem>
        <StyledItem>{text}</StyledItem>
        <StyledItem>{text}</StyledItem>
      </StyledAlertLine>
    </StyledAlertLineContainer>
  );
};

const anim = keyframes`${css`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`}
  `;

const StyledAlertLine = styled.div<{ $speed: number }>`
  --animation-time: ${props => props.$speed}s;

  position: absolute;

  display: flex;
  width: fit-content;
  -webkit-transform-style: preserve-3d; /* Фикс возможного глюка с морганием в Сафари */
`;

const StyledItem = styled.div`
  min-width: 100vw;
  padding: 0.05em 0.75em;
  white-space: nowrap;
  animation: ${anim} var(--animation-time) linear infinite;
  -webkit-backface-visibility: hidden; /* Фикс возможного глюка с морганием в Сафари */
`;

const StyledAlertLineContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;
