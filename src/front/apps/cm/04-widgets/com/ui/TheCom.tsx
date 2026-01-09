import { CmComNotFoundPage, useCmComCurrent } from '$cm/entities/com';
import { CmComOrderList } from '$cm/entities/com-order';
import { CmCom } from '$cm/ext';
import { ChordVisibleVariant } from '$cm/shared/model';
import { RefObject } from 'react';

interface Props {
  com?: CmCom;
  showInvisibles?: boolean;
  chordVisibleVariant?: ChordVisibleVariant;
  isMiniAnchor?: boolean;
  fontSize?: number;
  listRef?: RefObject<HTMLDivElement | null>;
  asHeaderComponent?: Parameters<typeof CmComOrderList>[0]['asHeaderComponent'];
  asContentAfterOrder?: Parameters<typeof CmComOrderList>[0]['asContentAfterOrder'];
  asLineComponent?: Parameters<typeof CmComOrderList>[0]['asLineComponent'];
}

export const TheCmCom = ({
  com: topCom,
  showInvisibles,
  chordVisibleVariant,
  isMiniAnchor,
  fontSize,
  listRef,
  asLineComponent,
  asHeaderComponent,
  asContentAfterOrder,
}: Props) => {
  const ccom = useCmComCurrent();
  const com = topCom ?? ccom;

  if (com == null) return <CmComNotFoundPage />;

  return (
    <CmComOrderList
      com={com}
      fontSize={fontSize}
      chordVisibleVariant={chordVisibleVariant ?? ChordVisibleVariant.Minimal}
      isMiniAnchor={isMiniAnchor}
      showInvisibles={showInvisibles}
      listRef={listRef}
      asHeaderComponent={asHeaderComponent}
      asContentAfterOrder={asContentAfterOrder}
      asLineComponent={asLineComponent}
    />
  );
};
