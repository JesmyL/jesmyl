import { cmIDB } from '@cm/_db/cm-idb';
import { memo, useEffect, useState } from 'react';
import { CmComWid } from 'shared/api';

type Props = { comw: CmComWid };

const numbers: PRecord<CmComWid, number> = {};

export const CmComNumber = memo(function CmComNumber(props: Props) {
  return numbers[props.comw] ?? <NumberGetter comw={props.comw} />;
});

const NumberGetter = ({ comw }: Props) => {
  const [comNumber, setComNumber] = useState(1);

  useEffect(() => {
    (async () => {
      const realNumber = await cmIDB.db.coms.where('w').belowOrEqual(comw).count();
      numbers[comw] = realNumber && (realNumber > 403 || realNumber > 665) ? realNumber + 1 : realNumber;
      setComNumber(numbers[comw]);
    })();
  }, [comw]);

  return <>{comNumber}</>;
};
