import IconButton from 'front/complect/the-icon/IconButton';
import { IconArrowDataTransferVerticalStrokeRounded } from 'front/complect/the-icon/icons/arrow-data-transfer-vertical';
import { mylib } from 'front/utils';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { BottomPopup } from '../../../../../complect/absolute-popup/bottom-popup/BottomPopup';
import PhaseContainerConfigurer from '../../../../../complect/phase-container/PhaseContainerConfigurer';
import CmTranslationComListContextInSelected from '../../base/translations/InSelected';
import useSelectedComs from '../../base/useSelectedComs';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
import { LocalListToolsPopup } from '../popups/LocalListToolsPopup';

export default function SelectedComs() {
  const { selectedComs, selectedComws, setSelectedComws } = useSelectedComs();
  const [isToolsOpen, setIsToolsOpen] = useState(false);

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseContainerConfigurer
            className="favorites-container"
            headTitle="Выбранное"
            onMoreClick={setIsToolsOpen}
            content={
              <>
                {isToolsOpen && (
                  <BottomPopup onClose={setIsToolsOpen}>
                    <LocalListToolsPopup coms={selectedComs} />
                  </BottomPopup>
                )}
                <ComFaceList
                  list={selectedComws}
                  comDescription={(_comw, comi) => {
                    return (
                      !comi || (
                        <MoveComButton
                          Icon={IconArrowDataTransferVerticalStrokeRounded}
                          onClick={() => {
                            setSelectedComws(prev => {
                              return mylib.withInsertedBeforei(prev, comi - 1, comi);
                            });
                          }}
                        />
                      )
                    );
                  }}
                />
              </>
            }
          />
        }
      />

      {cmCompositionRoute(children => (
        <CmTranslationComListContextInSelected>{children}</CmTranslationComListContextInSelected>
      ))}
    </Routes>
  );
}

const MoveComButton = styled(IconButton)`
  position: relative;
  top: -20px;
`;
