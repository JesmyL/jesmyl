import { useComNumber } from '$cm/shared/lib';
import { memo } from 'react';
import { CmComWid } from 'shared/api';
import { cmComWidNumberDictAtom } from '../state/atoms';

type Props = { comw: CmComWid };

export const CmComNumber = memo(function CmComNumber(props: Props) {
  return cmComWidNumberDictAtom.get()[props.comw] ?? <NumberGetter comw={props.comw} />;
});

const NumberGetter = ({ comw }: Props) => useComNumber(comw);
