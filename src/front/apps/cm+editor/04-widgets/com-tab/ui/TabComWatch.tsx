import { ChordVisibleVariant } from '#shared/model/cm/Cm.model';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { TheCmCom, useCmComPinchFontSize } from '$cm/ext';

export const CmEditorComTabWatch = ({ ccom }: { ccom: EditableCom }) => {
  const { fontSize, ref } = useCmComPinchFontSize();

  return (
    <TheCmCom
      comw={ccom.wid}
      chordVisibleVariant={ChordVisibleVariant.Maximal}
      isMiniAnchor={false}
      listRef={ref}
      fontSize={fontSize}
    />
  );
};
