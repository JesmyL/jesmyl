import { StrongDiv } from '#basis/ui/strong-control/StrongDiv';
import { propagationStopper } from '#shared/lib/event-funcs';
import { MyLib, mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
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
import { useScheduleWidgetRightsContext } from '../contexts';
import { ScheduleWidgetAppAtt } from '../ScheduleWidget.model';
import { useScheduleWidgetAppAttsContext } from '../useScheduleWidget';
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
                className={'relative flex gap-2 bg-x1 p-2 mx-5 pointer' + (atts?.[attKey] ? ' disabled ' : '')}
                onSuccess={() => isModalOpenAtom.set(true)}
                onSend={() => onAddAttSend(attKey, tatt.initVal)}
              >
                <ScheduleWidgetAttFace
                  tatt={tatt}
                  typeTitle={forTitle}
                  attKey={attKey}
                  onRemoveAttSend={onRemoveAttSend}
                />
                <div className="opacity-50 ">{tatt.description}</div>
                {inAttNodeAdds?.(attKey, tatt, attRefs[attKey] ?? [])}
              </StrongDiv>
            );
          })}
        </ModalBody>

        <ModalFooter>
          <ScheduleWidgetCustomAttachments tatts={schedule.tatts} />
        </ModalFooter>
      </Modal>

      <div className="flex gap-2 my-3">
        <LazyIcon icon="Attachment01" />
        Вложения
        <LazyIcon
          className="pointer"
          icon="PlusSign"
          onClick={isModalOpenAtom.do.toggle}
        />
      </div>
      <StyledBoxes
        className="flex gap-2 no-scrollbar pr-2"
        onTouchStart={propagationStopper}
      >
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
          <span className="text-x7">Вложений нет</span>
        )}
      </StyledBoxes>
    </>
  );
};

const StyledBoxes = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;
