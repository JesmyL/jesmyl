import { mylib } from '#shared/lib/my-lib';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { cmSelectedComwsAtom } from '$cm/basis/lib/store/atoms';
import styled from 'styled-components';

export const MoveSelectedComButton = ({ comi }: { comi: number }) => {
  return (
    !comi || (
      <MoveComButton
        icon="ArrowDataTransferVertical"
        onClick={() => {
          cmSelectedComwsAtom.set(prev => {
            return mylib.withInsertedBeforei(prev, comi - 1, comi);
          });
        }}
      />
    )
  );
};

const MoveComButton = styled(TheIconButton)`
  position: relative;
  top: -20px;
`;
