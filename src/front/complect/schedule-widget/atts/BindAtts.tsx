import { mylib, MyLib } from 'front/utils';
import { ReactNode, useState } from 'react';
import {
  IScheduleWidget,
  ScheduleWidgetAttKey,
  ScheduleWidgetDayEventAttValues,
  scheduleWidgetUserRights,
} from 'shared/api';
import styled from 'styled-components';
import { IconAttachment01StrokeRounded } from '../../../complect/the-icon/icons/attachment-01';
import { IconPlusSignStrokeRounded } from '../../../complect/the-icon/icons/plus-sign';
import Modal from '../../modal/Modal/Modal';
import { ModalBody } from '../../modal/Modal/ModalBody';
import { ModalFooter } from '../../modal/Modal/ModalFooter';
import StrongDiv from '../../strong-control/StrongDiv';
import IconButton from '../../the-icon/IconButton';
import { useScheduleWidgetAppAttsContext, useScheduleWidgetRightsContext } from '../useScheduleWidget';
import ScheduleWidgetAttFace from './AttFace';
import ScheduleWidgetBindAttRefKeyButton from './BindAttRefKeyButton';
import ScheduleWidgetCustomAttachments from './custom/CustomAttachments';

export default function ScheduleWidgetBindAtts({
  atts,
  forTitle,
  schedule,
  cantBindLinks,
  topContent,
  customAttTopContent,
}: {
  forTitle: ReactNode;
  atts?: ScheduleWidgetDayEventAttValues;
  schedule: IScheduleWidget;
  cantBindLinks?: boolean;
  topContent?: ReactNode;
  customAttTopContent?: (attKey: ScheduleWidgetAttKey) => ReactNode;
}) {
  const [appAtts, attRefs] = useScheduleWidgetAppAttsContext();
  const appAttList = MyLib.entries(appAtts);
  const rights = useScheduleWidgetRightsContext();
  const myUserR = rights.myUser?.R ?? rights.schedule.ctrl.defu;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const attEntries = atts ? MyLib.entries(atts) : [];

  return (
    <>
      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          <ModalFooter>{forTitle} - Вставить вложение</ModalFooter>

          <ModalBody>
            {topContent}
            {appAttList.map(([attKey, tatt]) => {
              if (
                !tatt.title ||
                !scheduleWidgetUserRights.checkIsCan(myUserR, tatt.R) ||
                !scheduleWidgetUserRights.checkIsCan(myUserR, tatt.U)
              )
                return null;
              // const attScope = takeStrongScopeMaker(scope, ' attKey/', attKey);

              return (
                <StrongDiv
                  key={attKey}
                  fieldName=""
                  cud="U"
                  className={
                    'relative flex flex-gap bgcolor--1 padding-gap margin-big-gap-v pointer' +
                    (atts?.[attKey] ? ' disabled ' : '')
                  }
                  mapExecArgs={args => {
                    if (atts?.[attKey]) return;
                    return {
                      ...args,
                      value: tatt.initVal,
                    };
                  }}
                  onClick={() => setIsModalOpen(true)}
                >
                  <ScheduleWidgetAttFace
                    tatt={tatt}
                    typeTitle={forTitle}
                    attKey={attKey}
                  />
                  <div className="fade-05 ">{tatt.description}</div>
                  {!cantBindLinks && !!attRefs[attKey]?.length && (
                    <ScheduleWidgetBindAttRefKeyButton
                      refs={attRefs[attKey]}
                      forTitle={forTitle}
                      // attScope={attScope}
                      tatt={tatt}
                      attKey={attKey}
                      atts={atts}
                      schedule={schedule}
                    />
                  )}
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
        <IconAttachment01StrokeRounded />
        Вложения
        <IconButton
          Icon={IconPlusSignStrokeRounded}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <Secs className="flex flex-gap no-scrollbar">
        {attEntries?.length ? (
          attEntries.map(([attKey]) => {
            // const attScope = takeStrongScopeMaker(scope, ' attKey/', attKey);

            return (
              <ScheduleWidgetAttFace
                isRedact
                key={attKey}
                // scope={attScope}
                // scheduleScope={scheduleScope}
                tatt={appAtts[attKey]}
                attKey={attKey}
                typeTitle={forTitle}
                isLink={mylib.isArr(atts?.[attKey])}
                customAttTopContent={customAttTopContent}
              />
            );
          })
        ) : (
          <span className="color--7">Вложений нет</span>
        )}
      </Secs>
    </>
  );
}

const Secs = styled.div`
  padding-right: var(--margin-gap);
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;
