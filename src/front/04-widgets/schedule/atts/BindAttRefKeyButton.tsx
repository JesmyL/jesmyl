import IconButton from '#shared/ui/the-icon/IconButton';
import Modal from '#widgets/modal/Modal/Modal';
import { ModalBody } from '#widgets/modal/Modal/ModalBody';
import { ModalHeader } from '#widgets/modal/Modal/ModalHeader';
import { mylib } from 'front/utils';
import { ReactNode, useState } from 'react';
import {
  IScheduleWidget,
  ScheduleWidgetAttKey,
  ScheduleWidgetAttRef,
  ScheduleWidgetDayEventAttValues,
} from 'shared/api';
import StrongDiv from '../../schedule-widget/strong-control/StrongDiv';
import { ScheduleWidgetAppAtt } from '../ScheduleWidget.model';
import ScheduleWidgetAttFace from './AttFace';

type Props = {
  forTitle: ReactNode;
  atts?: ScheduleWidgetDayEventAttValues;
  attKey: ScheduleWidgetAttKey;
  refs: ScheduleWidgetAttRef[];
  tatt: ScheduleWidgetAppAtt;
  schedule: IScheduleWidget;
  onRemoveAttSend: (attKey: ScheduleWidgetAttKey) => Promise<unknown>;
  onSend: (attRef: ScheduleWidgetAttRef) => Promise<unknown>;
};

export default function ScheduleWidgetBindAttRefKeyButton({
  atts,
  forTitle,
  attKey,
  refs,
  tatt,
  schedule,
  onRemoveAttSend,
  onSend,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <IconButton
        icon="Link01"
        disabled={!!atts?.[attKey]}
        className="absolute pos-top pos-right padding-gap"
        onClick={event => {
          event.stopPropagation();
          setIsModalOpen(true);
        }}
      />
      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          <ModalHeader>{forTitle} - сослаться на вложение</ModalHeader>

          <ModalBody>
            {refs.map(attRef => {
              if (!schedule.days) return null;
              const [dayi, eventMi] = attRef;
              const day = schedule.days[dayi];

              if (day == null) return null;

              const event = day.list?.find(event => event.mi === eventMi);
              if (!event) return null;
              const dayDate = new Date(schedule.start + dayi * mylib.howMs.inDay);

              return (
                <StrongDiv
                  key={attKey + dayi + eventMi}
                  className="margin-big-gap-v"
                  onSuccess={() => setIsModalOpen(false)}
                  onSend={() => onSend(attRef)}
                >
                  <div className="color--7">
                    {dayi + 1} день, {mylib.dayFullTitles[dayDate.getDay()]} - {schedule.types[event.type].title}
                  </div>
                  <div
                    className={'flex flex-gap bgcolor--1 padding-gap pointer' + (atts?.[attKey] ? ' disabled ' : '')}
                  >
                    <ScheduleWidgetAttFace
                      tatt={tatt}
                      typeTitle={forTitle}
                      attKey={attKey}
                      isLink
                      onRemoveAttSend={onRemoveAttSend}
                    />
                    <div className="fade-05">{tatt.description}</div>
                  </div>
                </StrongDiv>
              );
            })}
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
