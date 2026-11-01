import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { withInsertedBeforei } from 'shared/utils';
import { cmComSelectedComwsAtom } from '../state/atoms';

export const CmComMoveSelectedButton = ({ comi }: { comi: number }) => {
  return (
    !comi || (
      <TheIconButton
        icon="ArrowDataTransferVertical"
        className="relative -top-5"
        onClick={() => {
          cmComSelectedComwsAtom.set(prev => {
            return withInsertedBeforei(prev, comi - 1, comi);
          });
        }}
      />
    )
  );
};
