import { BottomPopupItem } from 'front/complect/absolute-popup/bottom-popup/BottomPopupItem';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { BottomPopup } from '../../../../../complect/absolute-popup/bottom-popup/BottomPopup';
import { useExerExec } from '../../../../../complect/exer/hooks/useExer';
import { FullContent } from '../../../../../complect/fullscreen-content/FullContent';
import KeyboardInput from '../../../../../complect/keyboard/KeyboardInput';
import IconButton from '../../../../../complect/the-icon/IconButton';
import { IconArrowDataTransferVerticalStrokeRounded } from '../../../../../complect/the-icon/icons/arrow-data-transfer-vertical';
import { IconArrowUp02StrokeRounded } from '../../../../../complect/the-icon/icons/arrow-up-02';
import { IconArrowUpDoubleStrokeRounded } from '../../../../../complect/the-icon/icons/arrow-up-double';
import { IconDelete01StrokeRounded } from '../../../../../complect/the-icon/icons/delete-01';
import { IconLeftToRightListBulletStrokeRounded } from '../../../../../complect/the-icon/icons/left-to-right-list-bullet';
import { IconPlusSignStrokeRounded } from '../../../../../complect/the-icon/icons/plus-sign';
import { IconPlusSignCircleStrokeRounded } from '../../../../../complect/the-icon/icons/plus-sign-circle';
import { IconViewStrokeRounded } from '../../../../../complect/the-icon/icons/view';
import { IconViewOffSlashStrokeRounded } from '../../../../../complect/the-icon/icons/view-off-slash';
import CmTranslationComListContextInZeroCat from '../../base/translations/InZeroCat';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { CmComListSearchFilterInput } from '../../complect/ComListSearchFilterInput';
import { cmCompositionRoute } from '../../routing/cmRoutingApp';
import { EditableCom } from '../col/compositions/com/EditableCom';
import EditContainerCorrectsInformer from '../edit-container-corrects-informer/EditContainerCorrectsInformer';
import PhaseCmEditorContainer from '../phase-editor-container/PhaseCmEditorContainer';
import { EditableMeetingsEvent } from './EditableMeetingsEvent';
import MeetingsEventHistory from './MeetingsEventHistory';
import { useEditableMeetings } from './useEditableMeetings';

export default function EditMeetingsEvent() {
  const currentEvent: EditableMeetingsEvent | und = useEditableMeetings().currentEvent;
  const exec = useExerExec();
  const [isClosedComList, setIsClosedComList] = useState(true);
  const [isOpenHistory, setIsOpenHistory] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [coms, setComs] = useState<EditableCom[]>([]);

  if (!currentEvent) return null;

  const usedComwList = (currentEvent.coms?.map(com => com.wid) || []).concat(currentEvent.prevComws || []);
  const comsLength = currentEvent.coms?.length || 0;
  const prevComsLength = currentEvent.prevComws?.length || 0;

  return (
    <Routes>
      <Route
        index
        element={
          <PhaseCmEditorContainer
            className="edit-meeitngs"
            headTitle={`Событие - ${currentEvent.name}`}
            contentClass="no-padding-top padding-gap"
            onMoreClick={setIsMoreOpen}
            content={
              <>
                <EditContainerCorrectsInformer>
                  Название
                  <KeyboardInput
                    value={currentEvent.name}
                    onFocus={() => setIsClosedComList(true)}
                    onChange={value => {
                      setIsClosedComList(true);
                      exec(currentEvent.rename(value));
                    }}
                  />
                </EditContainerCorrectsInformer>

                <div className="list-title sticky">{prevComsLength ? 'Новый список' : 'Прикреплённые песни'}</div>
                {comsLength ? (
                  <ComFaceList
                    list={currentEvent.coms}
                    selectable={false}
                    importantOnClick={(_, __, event) => event.preventDefault()}
                    comDescription={(com, comi) => (
                      <div
                        className="flex"
                        onClick={event => event.stopPropagation()}
                      >
                        {comsLength === 1 || comi === 0 || (
                          <StyledMoveButton
                            Icon={IconArrowDataTransferVerticalStrokeRounded}
                            className="margin-big-gap-h"
                            onClick={event => {
                              event.preventDefault();
                              exec(currentEvent.moveCom(comi));
                            }}
                          />
                        )}
                        <IconDelete01StrokeRounded
                          className="color--ko"
                          onClick={event => {
                            event.preventDefault();
                            exec(currentEvent.removeCom(com.wid));
                          }}
                        />
                      </div>
                    )}
                  />
                ) : (
                  <div className="flex center margin-gap">Песен нет</div>
                )}
                {prevComsLength ? (
                  <>
                    <div className="list-title sticky">
                      <span>Предыдущие (не войдут)</span>

                      {prevComsLength < 2 ? null : (
                        <IconButton
                          Icon={comsLength ? IconArrowUpDoubleStrokeRounded : IconPlusSignStrokeRounded}
                          className="pointer color--ok"
                          onClick={event => {
                            event.stopPropagation();
                            exec(currentEvent.mergePrevComs(currentEvent.prevComws));
                          }}
                        />
                      )}
                    </div>
                    <ComFaceList
                      list={currentEvent.prevComws}
                      selectable={false}
                      importantOnClick={(_, __, event) => event.preventDefault()}
                      comDescription={com => (
                        <IconButton
                          Icon={comsLength ? IconArrowUp02StrokeRounded : IconPlusSignCircleStrokeRounded}
                          onClick={event => {
                            event.stopPropagation();
                            exec(currentEvent.mergePrevComs([com.wid]));
                          }}
                        />
                      )}
                    />
                  </>
                ) : null}
                <div className="list-title sticky">
                  <span>Все песни</span>
                  <IconButton
                    className="pointer"
                    Icon={isClosedComList ? IconViewStrokeRounded : IconViewOffSlashStrokeRounded}
                    onClick={() => setIsClosedComList(!isClosedComList)}
                  />
                </div>
                {isClosedComList ? null : (
                  <>
                    <CmComListSearchFilterInput
                      Constructor={EditableCom}
                      onSearch={setComs}
                    />

                    <ComFaceList
                      list={coms}
                      selectable={false}
                      comDescription={com =>
                        usedComwList.indexOf(com.wid) < 0 ? (
                          <IconPlusSignCircleStrokeRounded
                            onClick={event => {
                              event.preventDefault();
                              exec(currentEvent.mergeStack([com.wid]));
                            }}
                          />
                        ) : null
                      }
                    />
                  </>
                )}

                {isOpenHistory && (
                  <FullContent
                    onClose={setIsOpenHistory}
                    closable
                  >
                    <MeetingsEventHistory />
                  </FullContent>
                )}

                {isMoreOpen && (
                  <BottomPopup onClose={setIsMoreOpen}>
                    <BottomPopupItem
                      Icon={IconLeftToRightListBulletStrokeRounded}
                      title="История"
                      onClick={() => {
                        setIsOpenHistory(true);
                        setIsMoreOpen(false);
                      }}
                    />
                  </BottomPopup>
                )}
              </>
            }
          />
        }
      />

      {cmCompositionRoute(children => (
        <CmTranslationComListContextInZeroCat>{children}</CmTranslationComListContextInZeroCat>
      ))}
    </Routes>
  );
}

const StyledMoveButton = styled(IconButton)`
  margin-bottom: 50px;
`;
