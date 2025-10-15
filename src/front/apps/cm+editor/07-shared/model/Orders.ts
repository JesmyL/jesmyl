import { CmComOrderWid } from 'shared/api';
import { EditableComOrder } from '../classes/EditableComOrder';

type CmComOrderOnClickBetweenDataProps = {
  ordAbove: EditableComOrder | null;
  ordBelow: EditableComOrder | null;
  aboveLeadOrdw: CmComOrderWid | nil;
};

export type CmComOrderOnClickBetweenData = {
  buttonTitle: React.ReactNode;
  checkIsShowButton: (props: CmComOrderOnClickBetweenDataProps) => boolean;
  onClick: (props: CmComOrderOnClickBetweenDataProps) => Promise<unknown>;
};

export const enum CmNewOrderMakeEtap {
  Off = 'off',
  Text = 'text',
  Chord = 'chords',
  Type = 'type',
}
