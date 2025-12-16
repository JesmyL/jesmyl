import { FontSizeContain } from '#shared/ui/font-size-contain/FontSizeContain';
import { useCmCom } from '$cm/entities/com';
import { useCmComCurrentMarkValues } from '$cm/shared/lib/useCmComCurrentMarkValues';
import { cmPlayerBroadcastComwAtom } from '$cm/shared/state/broadcast.atoms';
import { useAtomValue } from 'atomaric';
import styled from 'styled-components';

export const CmPlayerBroadcast = () => {
  const comw = useAtomValue(cmPlayerBroadcastComwAtom);
  const com = useCmCom(comw);
  const { html, isTechnicalText } = useCmComCurrentMarkValues(com);

  return (
    <StyledBroadcast className="flex justify-center">
      <StyledFontSizeContain
        className="flex center"
        html={html}
        style={{
          width: '90vw',
          height: '90vh',
          opacity: isTechnicalText ? '.3' : undefined,
        }}
      />
    </StyledBroadcast>
  );
};

const StyledFontSizeContain = styled(FontSizeContain)`
  color: white;
  font-weight: bold;
  background-color: black;
  text-align: center;
  white-space: pre;
`;

const StyledBroadcast = styled.div`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  justify-content: center;

  &,
  * {
    color: white;
  }
`;
