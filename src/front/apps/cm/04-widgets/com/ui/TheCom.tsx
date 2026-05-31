import { cmComChordHardLevelAtom, CmComNotFoundPage, useCmComCurrent } from '$cm/entities/com';
import { CmComOrderList } from '$cm/entities/com-order';
import { CmCom } from '$cm/ext';
import { ChordVisibleVariant } from '$cm/shared/model';
import { useAtomValue } from 'atomaric';
import { RefObject } from 'react';

interface Props {
  com?: CmCom;
  showInvisibles?: boolean;
  chordVisibleVariant?: ChordVisibleVariant;
  isMiniAnchor?: boolean;
  fontSize?: number;
  listRef?: RefObject<HTMLDivElement | null>;
  asHeaderNode?: Parameters<typeof CmComOrderList>[0]['asHeaderNode'];
  asAfterOrdNode?: Parameters<typeof CmComOrderList>[0]['asAfterOrdNode'];
  asLineNode?: Parameters<typeof CmComOrderList>[0]['asLineNode'];
}

export const TheCmCom = ({ com: topCom, chordVisibleVariant, ...props }: Props) => {
  const ccom = useCmComCurrent();
  const com = topCom ?? ccom;
  const chordHardLevel = useAtomValue(cmComChordHardLevelAtom);

  if (com == null) return <CmComNotFoundPage />;

  return (
    <CmComOrderList
      {...props}
      com={com}
      chordVisibleVariant={chordVisibleVariant ?? ChordVisibleVariant.Minimal}
      chordHardLevel={chordHardLevel}
    />
  );
};
