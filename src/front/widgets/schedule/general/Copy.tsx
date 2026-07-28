import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useAuth, useIndexSchedules } from '$index/shared/state';
import { Atom, atom } from 'atomaric';
import { useState } from 'react';
import {
  CustomAttUseTaleId,
  IScheduleWidget,
  ScheduleWidgetCleans,
  ScheduleWidgetDayEventAttValues,
  ScheduleWidgetWid,
} from 'shared/api';
import { itNNull } from 'shared/utils';
import { checkIsArray } from 'shared/utils/checkIs';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import { ScheduleWidgetTopicTitle } from '../complect/TopicTitle';
import { useScheduleWidgetRightsContext } from '../contexts';
import { schGeneralTsjrpcClient } from '../tsjrpc/tsjrpc.methods';

let isModalOpenAtom: Atom<boolean>;

export function ScheduleWidgetCopy(props: { schw: ScheduleWidgetWid }) {
  isModalOpenAtom ??= atom(false);

  const [schw, setSchw] = useState(0);
  const schedules = useIndexSchedules();
  const rights = useScheduleWidgetRightsContext();
  const schedule = schw === 0 ? undefined : schedules?.find(sch => sch.w === schw);
  const auth = useAuth();

  return (
    <>
      <TheIconButton
        icon="Copy02"
        postfix="Скопировать расписание"
        onClick={isModalOpenAtom.do.toggle}
      />

      {schedule ? (
        <Modal openAtom={isModalOpenAtom}>
          <ModalHeader>Копируем {schedule.title}</ModalHeader>
          <ModalBody>
            <TheIconSendButton
              icon="Copy02"
              postfix={`Скопировать ${schedule.title} в ${rights.schedule.title}`}
              onSuccess={isModalOpenAtom.reset}
              onSend={() => {
                const myUser = schedule.ctrl.users.find(user => user.login === auth.login);
                if (auth == null || myUser == null) return;

                const value: IScheduleWidget = {
                  ...schedule,
                  w: props.schw,
                  ctrl: {
                    ...schedule.ctrl,
                    users: [myUser],
                    roles: schedule.ctrl.roles.map(role => {
                      return { ...role, user: undefined };
                    }),
                  },
                  days: schedule.days.map(day => {
                    return {
                      ...day,
                      list: day.list.map(event => {
                        const atts: ScheduleWidgetDayEventAttValues = {};

                        if (event.atts)
                          forEachObjectEntries(event.atts, (attKey, attValue) => {
                            if (checkIsArray(attValue) || !checkIsArray(attValue.values)) {
                              if (attKey === '[SCH]:chlist' && !checkIsArray(attValue) && checkIsArray(attValue.list))
                                atts[attKey] = {
                                  ...attValue,
                                  list: attValue.list.map(att => {
                                    return checkIsArray(att) && att[0] === 1 ? [0, ...att.slice(1)] : att;
                                  }),
                                };
                              else atts[attKey] = attValue;
                            } else {
                              atts[attKey] = {
                                ...attValue,
                                values: attValue.values
                                  .map(val => {
                                    return checkIsArray(val) &&
                                      typeof val[1] === 'number' &&
                                      ScheduleWidgetCleans.checkIsTaleIdUnit(val[1], CustomAttUseTaleId.Users)
                                      ? null
                                      : checkIsArray(val) && val[0] === true
                                        ? [false, ...val.slice(1)]
                                        : val;
                                  })
                                  .filter(itNNull),
                              };
                            }
                          });

                        return { ...event, rate: undefined, atts };
                      }),
                    };
                  }),
                };

                return schGeneralTsjrpcClient.copySchedule({ props: { schw: props.schw }, schedule: value });
              }}
            />
          </ModalBody>
        </Modal>
      ) : (
        <Modal openAtom={isModalOpenAtom}>
          <ModalHeader>Какое расписание копировать?</ModalHeader>
          <ModalBody>
            {schedules?.map(schedule => {
              if (props.schw === schedule.w) return null;

              return (
                <div
                  key={schedule.w}
                  className="pointer my-2"
                  onClick={() => setSchw(schedule.w)}
                >
                  <ScheduleWidgetTopicTitle
                    titleBox={schedule}
                    topicBox={schedule}
                  />
                </div>
              );
            })}
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
