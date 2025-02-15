import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { mylib, MyLib } from 'front/utils';
import React, { ReactNode, useState } from 'react';
import {
  IScheduleWidget,
  ScheduleWidgetAttKey,
  ScheduleWidgetAttOwnValue,
  ScheduleWidgetAttRef,
  ScheduleWidgetDayEventAttValues,
  scheduleWidgetUserRights,
} from 'shared/api';
import styled from 'styled-components';
import Modal from '../../modal/Modal/Modal';
import { ModalBody } from '../../modal/Modal/ModalBody';
import { ModalFooter } from '../../modal/Modal/ModalFooter';
import StrongDiv from '../../strong-control/StrongDiv';
import { ScheduleWidgetAppAtt } from '../ScheduleWidget.model';
import { useScheduleWidgetAppAttsContext, useScheduleWidgetRightsContext } from '../useScheduleWidget';
import ScheduleWidgetAttFace from './AttFace';
import ScheduleWidgetCustomAttachments from './custom/CustomAttachments';

type Props = {
  forTitle: ReactNode;
  atts?: ScheduleWidgetDayEventAttValues;
  schedule: IScheduleWidget;
  topContent?: ReactNode;
  customAttTopContent?: (attKey: ScheduleWidgetAttKey) => ReactNode;
  onAddAttSend: (attKey: ScheduleWidgetAttKey, value: ScheduleWidgetAttOwnValue) => Promise<unknown>;
  onRemoveAttSend: (attKey: ScheduleWidgetAttKey) => Promise<unknown>;
  inAttNodeAdds?: (
    attKey: ScheduleWidgetAttKey,
    tatt: ScheduleWidgetAppAtt,
    refs: ScheduleWidgetAttRef[],
  ) => React.ReactNode;
};

export const ScheduleWidgetBindAtts = ({
  atts,
  forTitle,
  schedule,
  topContent,
  customAttTopContent,
  onAddAttSend,
  onRemoveAttSend,
  inAttNodeAdds,
}: Props) => {
  const [appAtts, attRefs] = useScheduleWidgetAppAttsContext();
  const appAttList = MyLib.entries(appAtts);
  const rights = useScheduleWidgetRightsContext();
  const myUserR = rights.myUser?.R ?? rights.schedule.ctrl.defu;
  const [isModalOpen, setIsModalOpen] = useState<unknown>(false);

  const attEntries = atts ? MyLib.entries(atts) : [];

  return (
    <>
      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          <ModalFooter>{forTitle}</ModalFooter>

          <ModalBody>
            {topContent}
            {appAttList.map(([attKey, tatt]) => {
              if (
                !tatt.title ||
                !scheduleWidgetUserRights.checkIsCan(myUserR, tatt.R) ||
                !scheduleWidgetUserRights.checkIsCan(myUserR, tatt.U)
              )
                return null;

              return (
                <StrongDiv
                  key={attKey}
                  className={
                    'relative flex flex-gap bgcolor--1 padding-gap margin-big-gap-v pointer' +
                    (atts?.[attKey] ? ' disabled ' : '')
                  }
                  onSuccess={() => setIsModalOpen(true)}
                  onSend={() => onAddAttSend(attKey, tatt.initVal)}
                >
                  <ScheduleWidgetAttFace
                    tatt={tatt}
                    typeTitle={forTitle}
                    attKey={attKey}
                    onRemoveAttSend={onRemoveAttSend}
                  />
                  <div className="fade-05 ">{tatt.description}</div>
                  {inAttNodeAdds?.(attKey, tatt, attRefs[attKey] ?? [])}
                </StrongDiv>
              );
            })}
          </ModalBody>

          <ModalFooter>
            <ScheduleWidgetCustomAttachments tatts={schedule.tatts} />
          </ModalFooter>
        </Modal>
      )}
      <div className="flex flex-gap">
        <LazyIcon icon="Attachment01" />
        Вложения
        <LazyIcon
          className="pointer"
          icon="PlusSign"
          onClick={setIsModalOpen}
        />
      </div>
      <StyledBoxes className="flex flex-gap no-scrollbar">
        {attEntries?.length ? (
          attEntries.map(([attKey]) => {
            return (
              <ScheduleWidgetAttFace
                isRedact
                key={attKey}
                tatt={appAtts[attKey]}
                attKey={attKey}
                typeTitle={forTitle}
                isLink={mylib.isArr(atts?.[attKey])}
                customAttTopContent={customAttTopContent}
                onRemoveAttSend={onRemoveAttSend}
              />
            );
          })
        ) : (
          <span className="color--7">Вложений нет</span>
        )}
      </StyledBoxes>
    </>
  );
};

const StyledBoxes = styled.div`
  padding-right: var(--margin-gap);
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;
