import { ChordVisibleVariant } from '$cm/Cm.model';
import { useChordVisibleVariant } from '$cm/base/useChordVisibleVariant';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { Com } from './Com';
import { ComOrders } from './orders/ComOrders';

export const TheCurrentCom = ({ com }: { com: Com }) => {
  const fontSize = cmIDB.useValue.comFontSize();
  const [chordVisibleVariant] = useChordVisibleVariant();
  const isMiniAnchor = cmIDB.useValue.isMiniAnchor();

  return (
    <ComOrders
      com={com}
      fontSize={fontSize}
      chordVisibleVariant={chordVisibleVariant ?? ChordVisibleVariant.Minimal}
      isMiniAnchor={isMiniAnchor}
    />
  );
};
