import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { ReactNode, useState } from 'react';
import { ScheduleWidgetAttKey, scheduleWidgetUserRights } from 'shared/api';
import styled from 'styled-components';
import { IconCancel01StrokeRounded } from '../../../complect/the-icon/icons/cancel-01';
import { IconHelpCircleStrokeRounded } from '../../../complect/the-icon/icons/help-circle';
import { IconLink02StrokeRounded } from '../../../complect/the-icon/icons/link-02';
import { LazyIcon } from '../../the-icon/LazyIcon';
import { ScheduleWidgetAppAtt } from '../ScheduleWidget.model';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import ScheduleWidgetCustomAtt from './custom/CustomAtt';

type Props = {
  isRedact?: boolean;
  tatt?: ScheduleWidgetAppAtt;
  attKey: ScheduleWidgetAttKey;
  typeTitle: ReactNode;
  customAttTopContent?: (attKey: ScheduleWidgetAttKey) => ReactNode;
  isLink?: boolean;
  onRemoveAttSend: (attKey: ScheduleWidgetAttKey) => Promise<unknown>;
};

export default function ScheduleWidgetAttFace({
  tatt,
  typeTitle,
  attKey,
  isRedact,
  isLink,
  customAttTopContent,
  onRemoveAttSend,
}: Props) {
  const rights = useScheduleWidgetRightsContext();
  const myUserR = rights.myUser?.R ?? rights.schedule.ctrl.defu;
  const [isModalOpen, setIsModalOpen] = useState<unknown>(false);

  if (!scheduleWidgetUserRights.checkIsCan(myUserR, tatt?.R)) return null;

  const isCanRedact = scheduleWidgetUserRights.checkIsCan(myUserR, tatt?.U);

  return (
    <>
      <Tatt
        className={'relative flex center column' + (isCanRedact && tatt?.isCustomize ? ' color--7 pointer' : '')}
        onClick={isCanRedact && tatt?.isCustomize ? setIsModalOpen : undefined}
      >
        {isLink && <IconLink02StrokeRounded className="absolute pos-left pos-top color--3 fade-05" />}
        {isRedact && isCanRedact && (
          <EvaSendButton
            Icon={IconCancel01StrokeRounded}
            className="close-button"
            confirm={
              <>
                Убрать {isLink ? 'ссылку вложения' : 'вложение'} <span className="color--7">{tatt?.title || '??'}</span>
                {' из события '}
                {typeTitle}?
              </>
            }
            onSend={() => onRemoveAttSend(attKey)}
          />
        )}
        {tatt ? (
          <>
            <LazyIcon name={tatt.icon} />
            <div className="ellipsis full-max-width">{tatt.title}</div>
          </>
        ) : (
          <>
            <IconHelpCircleStrokeRounded className="color--ko" />
            <div className="color--ko">Не изв.</div>
          </>
        )}
      </Tatt>
      {!tatt || !isModalOpen || (
        <Modal onClose={setIsModalOpen}>
          <ModalHeader>
            Вложение <span className="color--7">{tatt.title}</span>
          </ModalHeader>
          <ModalBody>
            <ScheduleWidgetCustomAtt
              tatt={tatt as never}
              isRedact
              topContent={customAttTopContent?.(attKey)}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}

const Tatt = styled.div`
  --att-size: 90px;

  position: relative;
  border-radius: 3px;
  background-color: var(--color--5);
  width: var(--att-size);
  min-width: var(--att-size);
  max-width: var(--att-size);
  height: var(--att-size);
  min-height: var(--att-size);
  max-height: var(--att-size);

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
