import { cmComWidNumberDictAtom } from '$cm/entities/index';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { CmComWid } from 'shared/api';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';
import { cmIDB } from '../state/cmIDB';

export const useComNumbers = (comw: CmComWid | CmComWid[]) => {
  useEffect(() => {
    (async () => {
      const comws = [comw].flat();

      const newWidNumberDict = { ...cmComWidNumberDictAtom.get() };

      let isThereNews = false;

      for (let comwi = 0; comwi < comws.length; comwi++) {
        const comw = comws[comwi];

        if (newWidNumberDict[comw] !== undefined) continue;
        isThereNews = true;

        newWidNumberDict[comw] = takeCorrectComNumber(await cmIDB.db.coms.where('w').belowOrEqual(comw).count());
      }

      if (isThereNews) cmComWidNumberDictAtom.do.setPartial(newWidNumberDict);
    })();
  }, [comw]);

  return useAtomValue(cmComWidNumberDictAtom);
};
