import { cmIDB } from '#basis/lib/idb/cm';
import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { mylib } from 'front/utils';
import styled from 'styled-components';

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
