import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
import { ReactNode } from 'react';
import { ScheduleWidgetAttKey, scheduleWidgetUserRights } from 'shared/api';
import styled from 'styled-components';
import { useScheduleWidgetRightsContext } from '../contexts';
import { ScheduleWidgetAppAtt } from '../ScheduleWidget.model';
import { ScheduleWidgetCustomAtt } from './custom/CustomAtt';

type Props = {
  isRedact?: boolean;
  tatt?: ScheduleWidgetAppAtt;
  attKey: ScheduleWidgetAttKey;
  typeTitle: ReactNode;
  customAttTopContent?: (attKey: ScheduleWidgetAttKey) => ReactNode;
  isLink?: boolean;
  onRemoveAttSend: (attKey: ScheduleWidgetAttKey) => Promise<unknown>;
};

const tattOnRedactAtom = atom<ScheduleWidgetAttKey | null>(null);

export function ScheduleWidgetAttFace({
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

  if (!scheduleWidgetUserRights.checkIsCan(myUserR, tatt?.R)) return null;

  const isCanRedact = scheduleWidgetUserRights.checkIsCan(myUserR, tatt?.U);

  return (
    <>
      <Tatt
        className={'relative flex center column' + (isCanRedact && tatt?.isCustomize ? ' text-x7 pointer' : '')}
        onClick={isCanRedact && tatt?.isCustomize ? () => tattOnRedactAtom.set(attKey) : undefined}
      >
        {isLink && (
          <LazyIcon
            icon="Link02"
            className="absolute left-0 top-0 text-x3 opacity-50"
          />
        )}
        {isRedact && isCanRedact && (
          <TheIconSendButton
            icon="Cancel01"
            className="close-button"
            confirm={
              <>
                Убрать {isLink ? 'ссылку вложения' : 'вложение'} <span className="text-x7">{tatt?.title || '??'}</span>
                {' из события '}
                {typeTitle}?
              </>
            }
            onSend={() => onRemoveAttSend(attKey)}
          />
        )}
        {tatt ? (
          <>
            <LazyIcon icon={tatt.icon} />
            <div className="ellipsis max-w-full">{tatt.title}</div>
          </>
        ) : (
          <>
            <LazyIcon
              icon="HelpCircle"
              className="text-xKO"
            />
            <div className="text-xKO">Не изв.</div>
          </>
        )}
      </Tatt>
      {!tatt || (
        <Modal
          openAtom={tattOnRedactAtom}
          checkIsOpen={tatt => tatt === attKey}
        >
          <ModalHeader>
            Вложение <span className="text-x7">{tatt.title}</span>
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
