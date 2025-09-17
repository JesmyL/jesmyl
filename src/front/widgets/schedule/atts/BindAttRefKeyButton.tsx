import { StrongDiv } from '#basis/ui/strong-control/StrongDiv';
import { mylib } from '#shared/lib/my-lib';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { atom } from 'atomaric';
import { ReactNode } from 'react';
import {
  IScheduleWidget,
  ScheduleWidgetAttKey,
  ScheduleWidgetAttRef,
  ScheduleWidgetDayEventAttValues,
} from 'shared/api';
import { ScheduleWidgetAppAtt } from '../ScheduleWidget.model';
import { ScheduleWidgetAttFace } from './AttFace';

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

const isModalOpenAtom = atom(false);

export function ScheduleWidgetBindAttRefKeyButton({
  atts,
  forTitle,
  attKey,
  refs,
  tatt,
  schedule,
  onRemoveAttSend,
  onSend,
}: Props) {
  return (
    <>
      <TheIconButton
        icon="Link01"
        disabled={!!atts?.[attKey]}
        className="absolute top-0 right-0 p-2"
        onClick={event => {
          event.stopPropagation();
          isModalOpenAtom.set(true);
        }}
      />

      <Modal openAtom={isModalOpenAtom}>
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
                className="mx-5"
                onSuccess={isModalOpenAtom.reset}
                onSend={() => onSend(attRef)}
              >
                <div className="text-x7">
                  {dayi + 1} день, {mylib.dayFullTitles[dayDate.getDay()]} - {schedule.types[event.type].title}
                </div>
                <div className={'flex gap-2 bg-x1 p-2 pointer' + (atts?.[attKey] ? ' disabled ' : '')}>
                  <ScheduleWidgetAttFace
                    tatt={tatt}
                    typeTitle={forTitle}
                    attKey={attKey}
                    isLink
                    onRemoveAttSend={onRemoveAttSend}
                  />
                  <div className="opacity-50">{tatt.description}</div>
                </div>
              </StrongDiv>
            );
          })}
        </ModalBody>
      </Modal>
    </>
  );
}
