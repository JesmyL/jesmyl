import { mylib } from 'front/utils';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { itNNil } from 'shared/utils';
import { CmComWid } from '../../../../../shared/api/complect/apps/cm/complect/enums';
import { atom, useAtom } from '../../../../complect/atoms';
import { useComs } from '../cols/useCols';

const scomwsAtom = atom<CmComWid[]>([], 'cm', 'scomws');

export default function useSelectedComs() {
  const coms = useComs();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedComws, setSelectedComws] = useAtom(scomwsAtom);
  const takeSelectedComs = useCallback(() => {
    return (coms && selectedComws.map(comw => coms.find(com => com.wid === comw)).filter(itNNil)) || [];
  }, [coms, selectedComws]);

  useEffect(() => {
    const scomws = searchParams.get('scomws');
    if (scomws === null) return;

    try {
      const comws = JSON.parse(scomws);
      if (mylib.isArr(comws) && !comws.some(it => !mylib.isNum(it))) {
        setSelectedComws(comws);
      }
    } catch (error) {}

    setSearchParams(prev => {
      const news = { ...prev };

      delete (news as any)['scomws'];

      return news;
    });
  }, [searchParams, setSearchParams, setSelectedComws]);

  const updateSelectedComws = useCallback(
    (selectedComws: number[]) => setSelectedComws(selectedComws),
    [setSelectedComws],
  );

  const selectedComPosition = useCallback((comWid: number) => selectedComws.indexOf(comWid) + 1, [selectedComws]);

  const toggleSelectedCom = useCallback(
    (comWid: number) => {
      updateSelectedComws(
        selectedComPosition(comWid) ? selectedComws.filter(comw => comWid !== comw) : [...selectedComws, comWid],
      );
    },
    [selectedComPosition, selectedComws, updateSelectedComws],
  );

  return {
    selectedComws,
    takeSelectedComs,
    selectedComPosition,
    updateSelectedComws,
    clearSelectedComws: () => updateSelectedComws([]),
    toggleSelectedCom,
    setSelectedComws,
  };
}
