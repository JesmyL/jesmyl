import { mylib } from '#shared/lib/my-lib';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useComs } from '../cols/useCols';
import { cmIDB } from '../shared/lib/cmIdb';

export const useSelectedComs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedComws, setSelectedComws] = cmIDB.use.selectedComws();
  const selectedComs = useComs(selectedComws);

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
      const news = new URLSearchParams(prev);
      news.delete('scomws');
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
    selectedComs,
    selectedComPosition,
    updateSelectedComws,
    clearSelectedComws: () => updateSelectedComws([]),
    toggleSelectedCom,
    setSelectedComws,
  };
};
