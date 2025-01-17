import { mylib } from 'front/utils';
import { ReactNode } from 'react';
import {
  IScheduleWidget,
  ScheduleWidgetAttKey,
  ScheduleWidgetAttRef,
  ScheduleWidgetDayEventAttValues,
} from 'shared/api';
import { IconLink01StrokeRounded } from '../../../complect/the-icon/icons/link-01';
import useModal from '../../modal/useModal';
import StrongDiv from '../../strong-control/StrongDiv';
import IconButton from '../../the-icon/IconButton';
import { ScheduleWidgetAppAtt } from '../ScheduleWidget.model';
import ScheduleWidgetAttFace from './AttFace';

export default function ScheduleWidgetBindAttRefKeyButton({
  atts,
  forTitle,
  attKey,
  refs,
  tatt,
  schedule,
}: {
  forTitle: ReactNode;
  atts?: ScheduleWidgetDayEventAttValues;
  attKey: ScheduleWidgetAttKey;
  refs: ScheduleWidgetAttRef[];
  tatt: ScheduleWidgetAppAtt;
  schedule: IScheduleWidget;
}) {
  const [modalNode, screen] = useModal(({ header, body }, closeModal) => {
    return (
      <>
        {header(<>{forTitle} - Сослаться на вложение</>)}
        {body(
          <>
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
                  // scope={attScope}
                  fieldName=""
                  cud="U"
                  className="margin-big-gap-v"
                  mapExecArgs={args => {
                    if (atts?.[attKey]) return;
                    return {
                      ...args,
                      value: attRef,
                    };
                  }}
                  onClick={closeModal}
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
                    />
                    <div className="fade-05">{tatt.description}</div>
                  </div>
                </StrongDiv>
              );
            })}
          </>,
        )}
      </>
    );
  });

  return (
    <>
      {modalNode}
      <IconButton
        Icon={IconLink01StrokeRounded}
        disabled={!!atts?.[attKey]}
        className="absolute pos-top pos-right padding-gap"
        onClick={event => {
          event.stopPropagation();
          screen();
        }}
      />
    </>
  );
}
