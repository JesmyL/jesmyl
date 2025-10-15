import { CmCom, CmComNotFoundPage, useCmComCurrent } from '$cm/entities/com';
import { CmComOrderList } from '$cm/entities/com-order';
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
}

export const TheCmCom = ({
  com: topCom,
  showInvisibles,
  chordVisibleVariant,
  isMiniAnchor,
  fontSize,
  listRef,
  asHeaderComponent,
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
    />
  );
};
