import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import styled from '@emotion/styled';
import { withInsertedBeforei } from 'shared/utils';
import { cmComSelectedComwsAtom } from '../state/atoms';

export const CmComMoveSelectedButton = ({ comi }: { comi: number }) => {
  return (
    !comi || (
      <MoveComButton
        icon="ArrowDataTransferVertical"
        onClick={() => {
          cmComSelectedComwsAtom.set(prev => {
            return withInsertedBeforei(prev, comi - 1, comi);
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
