import { mylib } from '#shared/lib/my-lib';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import styled from 'styled-components';
import { cmComSelectedComwsAtom } from '../state/atoms';

export const CmComMoveSelectedButton = ({ comi }: { comi: number }) => {
  return (
    !comi || (
      <MoveComButton
        icon="ArrowDataTransferVertical"
        onClick={() => {
          cmComSelectedComwsAtom.set(prev => {
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
