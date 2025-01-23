import { RefObject } from 'react';
import { ChordVisibleVariant } from '../../Cm.model';
import { Com } from './Com';
import './Com.scss';
import { ComNotFoundPage } from './ComNotFoundPage';
import './block-styles/BlockStyles.scss';
import ComOrders from './orders/ComOrders';
import { useCcom } from './useCcom';

interface Props {
  com?: Com;
  showInvisibles?: boolean;
  chordVisibleVariant?: ChordVisibleVariant;
  isMiniAnchor?: boolean;
  fontSize?: number;
  listRef?: RefObject<HTMLDivElement>;
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
