import { mylib } from '#shared/lib/my-lib';
import { IconButton } from '#shared/ui/icon';
import styled from 'styled-components';
import { cmIDB } from '../../_db/cm-idb';

export const MoveSelectedComButton = ({ comi }: { comi: number }) => {
  return (
    !comi || (
      <MoveComButton
        icon="ArrowDataTransferVertical"
        onClick={() => {
          cmIDB.set.selectedComws(prev => {
            return mylib.withInsertedBeforei(prev, comi - 1, comi);
          });
        }}
      />
    )
  );
};

const MoveComButton = styled(IconButton)`
  position: relative;
  top: -20px;
`;
