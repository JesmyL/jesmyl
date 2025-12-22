import { useEffect, useState } from 'react';
import { CmComWid } from 'shared/api';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';
import { cmIDB } from '../state/cmIDB';

const numbersStore: PRecord<CmComWid, number> = {};

export const useComNumbers = (comw: CmComWid | CmComWid[], numbers = numbersStore) => {
  const [numbersState, setNumbersState] = useState(numbers);

  useEffect(() => {
    (async () => {
      const comws = [comw].flat();

      const newNumbers = { ...numbers };
      let isThereNews = false;

      for (let comwi = 0; comwi < comws.length; comwi++) {
        const comw = comws[comwi];

        if (newNumbers[comw] !== undefined) return;
        isThereNews = true;

        newNumbers[comw] =
          numbers[comw] =
          numbersStore[comw] =
            takeCorrectComNumber(await cmIDB.db.coms.where('w').belowOrEqual(comw).count());
      }

      if (isThereNews) setNumbersState(newNumbers);
    })();
  }, [comw, numbers]);

  return numbersState;
};
