import { EditableOrder } from './EditableOrder';

export type CmComOrderOnClickBetweenData = {
  buttonTitle: React.ReactNode;
  checkIsShowButton: (ordAbove: EditableOrder | null, ordBelow: EditableOrder | null) => boolean;
  onClick: (ordAbove: EditableOrder | null, ordBelow: EditableOrder | null) => Promise<unknown>;
};
