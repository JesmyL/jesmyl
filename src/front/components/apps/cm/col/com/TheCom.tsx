import { ChordVisibleVariant } from '$cm/Cm.model';
import { useCcom } from '$cm/basis/lib/com-selections';
import { RefObject } from 'react';
import { Com } from './Com';
import { ComNotFoundPage } from './ComNotFoundPage';
import { ComOrders } from './orders/ComOrders';

interface Props {
  com?: Com;
  showInvisibles?: boolean;
  chordVisibleVariant?: ChordVisibleVariant;
  isMiniAnchor?: boolean;
  fontSize?: number;
  listRef?: RefObject<HTMLDivElement | null>;
}

export const TheCom = ({
  com: topCom,
  showInvisibles,
  chordVisibleVariant,
  isMiniAnchor,
  fontSize,
  listRef,
}: Props) => {
  const ccom = useCcom();
  const com = topCom ?? ccom;

  if (com == null) return <ComNotFoundPage />;

  return (
    <ComOrders
      com={com}
      fontSize={fontSize}
      chordVisibleVariant={chordVisibleVariant ?? ChordVisibleVariant.Minimal}
      isMiniAnchor={isMiniAnchor}
      showInvisibles={showInvisibles}
      listRef={listRef}
    />
  );
};
