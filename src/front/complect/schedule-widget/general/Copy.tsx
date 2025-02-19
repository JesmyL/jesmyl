import { MyLib, mylib } from '#shared/lib/my-lib';
import { IconButton } from '#shared/ui/icon';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sendable/TheIconSendButton';
import { useState } from 'react';
import {
  CustomAttUseTaleId,
  IScheduleWidget,
  IScheduleWidgetWid,
  ScheduleWidgetCleans,
  ScheduleWidgetDayEventAttValues,
} from 'shared/api';
import { itNNull } from 'shared/utils';
import { useAuth, useIndexSchedules } from '../../../components/index/atoms';
import { ScheduleWidgetTopicTitle } from '../complect/TopicTitle';
import { schGeneralSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';

export function ScheduleWidgetCopy(props: { schw: IScheduleWidgetWid }) {
  const [schw, setSchw] = useState(0);
  const schedules = useIndexSchedules();
  const rights = useScheduleWidgetRightsContext();
  const schedule = schw === 0 ? undefined : schedules?.find(sch => sch.w === schw);
  const auth = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <IconButton
        icon="Copy02"
        postfix="Скопировать расписание"
        onClick={() => setIsModalOpen(true)}
      />

      {isModalOpen &&
        (schedule ? (
          <Modal onClose={setIsModalOpen}>
            <ModalHeader>Копируем {schedule.title}</ModalHeader>
            <ModalBody>
              <TheIconSendButton
                icon="Copy02"
                postfix={`Скопировать ${schedule.title} в ${rights.schedule.title}`}
                onSuccess={() => setIsModalOpen(false)}
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
                        return {
                          ...role,
                          user: undefined,
                        };
                      }),
                    },
                    days: schedule.days.map(day => {
                      return {
                        ...day,
                        list: day.list.map(event => {
                          const atts: ScheduleWidgetDayEventAttValues = {};

                          if (event.atts)
                            MyLib.entries(event.atts).forEach(([attKey, attValue]) => {
                              if (mylib.isArr(attValue) || !mylib.isArr(attValue.values)) {
                                if (attKey === '[leader]:game') atts[attKey] = {};
                                else if (
                                  attKey === '[SCH]:chlist' &&
                                  !mylib.isArr(attValue) &&
                                  mylib.isArr(attValue.list)
                                )
                                  atts[attKey] = {
                                    ...attValue,
                                    list: attValue.list.map(att => {
                                      return att[0] === 1 ? [0, ...att.slice(1)] : att;
                                    }),
                                  };
                                else atts[attKey] = attValue;
                              } else {
                                atts[attKey] = {
                                  ...attValue,
                                  values: attValue.values
                                    .map(val => {
                                      return typeof val[1] === 'number' &&
                                        ScheduleWidgetCleans.checkIsTaleIdUnit(val[1], CustomAttUseTaleId.Users)
                                        ? null
                                        : val[0] === true
                                          ? [false, ...val.slice(1)]
                                          : val;
                                    })
                                    .filter(itNNull),
                                };
                              }
                            });

                          return {
                            ...event,
                            rate: undefined,
                            atts,
                          };
                        }),
                      };
                    }),
                  };

                  return schGeneralSokiInvocatorClient.copySchedule(null, { schw: props.schw }, value);
                }}
              />
            </ModalBody>
          </Modal>
        ) : (
          <Modal onClose={setIsModalOpen}>
            <ModalHeader>Какое расписание копировать?</ModalHeader>
            <ModalBody>
              {schedules?.map(schedule => {
                if (props.schw === schedule.w) return null;

                return (
                  <div
                    key={schedule.w}
                    className="pointer margin-gap-v"
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
        ))}
    </>
  );
}
