import { useEffect, useState } from 'react';
import { CmComWid } from 'shared/api';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
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

        newNumbers[comw] =
          numbers[comw] =
          numbersStore[comw] =
            CmComUtils.takeCorrectComNumber(await cmIDB.db.coms.where('w').belowOrEqual(comw).count());
      }

      if (isThereNews) setNumbersState(newNumbers);
    })();
  }, [comw, numbers]);

  return numbersState;
};
