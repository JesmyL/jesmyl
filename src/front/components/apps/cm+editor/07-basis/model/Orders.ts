import { EditableComOrder } from '$cm+editor/basis/lib/EditableComOrder';

export type CmComOrderOnClickBetweenData = {
  buttonTitle: React.ReactNode;
  checkIsShowButton: (ordAbove: EditableComOrder | null, ordBelow: EditableComOrder | null) => boolean;
  onClick: (ordAbove: EditableComOrder | null, ordBelow: EditableComOrder | null) => Promise<unknown>;
};

export const enum CmNewOrderMakeEtap {
  Off = 'off',
  Text = 'text',
  Chord = 'chords',
  Type = 'type',
}
