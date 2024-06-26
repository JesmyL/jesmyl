import { useBottomPopup } from '../../../../../complect/absolute-popup/bottom-popup/useBottomPopup';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import PhaseCmContainer from '../../complect/phase-container/PhaseCmContainer';
import { LocalListToolsPopup } from '../popups/LocalListToolsPopup';
import { useMarks } from './useMarks';

export default function Marks() {
  const { markedComs } = useMarks();
  const [popupNode, openPopup] = useBottomPopup(LocalListToolsPopup, markedComs);

  return (
    <PhaseCmContainer
      className="favorites-container"
      headTitle="Избранное"
      onMoreClick={openPopup}
      content={
        <>
          {popupNode}
          <ComFaceList list={markedComs} />
        </>
      }
    />
  );
}
