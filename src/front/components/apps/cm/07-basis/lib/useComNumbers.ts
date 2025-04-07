import { useEffect, useState } from 'react';
import { CmComWid } from 'shared/api';
import { cmIDB } from './cmIDB';

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

        const realNumber = await cmIDB.db.coms.where('w').belowOrEqual(comw).count();
        newNumbers[comw] =
          numbers[comw] =
          numbersStore[comw] =
            realNumber && (realNumber > 403 || realNumber > 665) ? realNumber + 1 : realNumber;
      }

      if (isThereNews) setNumbersState(newNumbers);
    })();
  }, [comw, numbers]);

  return numbersState;
};
