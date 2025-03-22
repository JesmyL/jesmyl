import { EditableComOrder } from '$cm+editor/basis/lib/EditableComOrder';
import { CmComOrderWid } from 'shared/api';

export type CmComOrderOnClickBetweenData = {
  buttonTitle: React.ReactNode;
  checkIsShowButton: (ordAbove: EditableComOrder | null, ordBelow: EditableComOrder | null) => boolean;
  onClick: (props: {
    ordAbove: EditableComOrder | null;
    ordBelow: EditableComOrder | null;
    aboveLeadOrdw: CmComOrderWid | nil;
  }) => Promise<unknown>;
};

export const enum CmNewOrderMakeEtap {
  Off = 'off',
  Text = 'text',
  Chord = 'chords',
  Type = 'type',
}
