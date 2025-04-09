import { useComNumbers } from '$cm/basis/lib/useComNumbers';
import { memo } from 'react';
import { CmComWid } from 'shared/api';

type Props = { comw: CmComWid };

const numbers: PRecord<CmComWid, number> = {};

export const CmComNumber = memo(function CmComNumber(props: Props) {
  return numbers[props.comw] ?? <NumberGetter comw={props.comw} />;
});

const NumberGetter = ({ comw }: Props) => <>{useComNumbers(comw, numbers)[comw]}</>;
