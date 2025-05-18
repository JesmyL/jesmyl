import { ChordVisibleVariant } from '$cm/Cm.model';
import { cmIsComMiniAnchorAtom } from '$cm/atoms';
import { useChordVisibleVariant } from '$cm/base/useChordVisibleVariant';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useAtomValue } from 'atomaric';
import { Com } from './Com';
import { ComOrders } from './orders/ComOrders';

export const TheCurrentCom = ({ com }: { com: Com }) => {
  const fontSize = cmIDB.useValue.comFontSize();
  const [chordVisibleVariant] = useChordVisibleVariant();
  const isMiniAnchor = useAtomValue(cmIsComMiniAnchorAtom);

  return (
    <ComOrders
      com={com}
      fontSize={fontSize}
      chordVisibleVariant={chordVisibleVariant ?? ChordVisibleVariant.Minimal}
      isMiniAnchor={isMiniAnchor}
    />
  );
};
