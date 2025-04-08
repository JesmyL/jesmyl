import { StrongDiv } from '#basis/ui/strong-control/StrongDiv';
import { atom } from '#shared/lib/atom';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ReactNode } from 'react';
import {
  IScheduleWidget,
  ScheduleWidgetAttKey,
  ScheduleWidgetAttOwnValue,
  ScheduleWidgetAttRef,
  ScheduleWidgetDayEventAttValues,
  scheduleWidgetUserRights,
} from 'shared/api';
import styled from 'styled-components';
import { ScheduleWidgetAppAtt } from '../ScheduleWidget.model';
import { useScheduleWidgetAppAttsContext, useScheduleWidgetRightsContext } from '../useScheduleWidget';
import { ScheduleWidgetAttFace } from './AttFace';
import { ScheduleWidgetCustomAttachments } from './custom/CustomAttachments';

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

const isModalOpenAtom = atom(false);

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

  const attEntries = atts ? MyLib.entries(atts) : [];

  return (
    <>
      <Modal openAtom={isModalOpenAtom}>
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
                onSuccess={() => isModalOpenAtom.set(true)}
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

      <div className="flex flex-gap">
        <LazyIcon icon="Attachment01" />
        Вложения
        <LazyIcon
          className="pointer"
          icon="PlusSign"
          onClick={isModalOpenAtom.toggle}
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
