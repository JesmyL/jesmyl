import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { useState } from 'react';
import { IconCopy02StrokeRounded } from '../../../complect/the-icon/icons/copy-02';
import { useAuth, useIndexSchedules } from '../../../components/index/molecules';
import useModal from '../../modal/useModal';
import IconButton from '../../the-icon/IconButton';
import ScheduleWidgetTopicTitle from '../complect/TopicTitle';
import { takeScheduleStrongScopeMaker } from '../useScheduleWidget';

export function ScheduleWidgetCopy(props: { schw: number }) {
  const [schw, setSchw] = useState(0);
  const schedules = useIndexSchedules();
  const schedule = schw === 0 ? undefined : schedules?.find(sch => sch.w === schw);
  const auth = useAuth();

  const [modalNode, openModal] = useModal(({ header, body }, closeModal) => {
    if (schedule === undefined)
      return (
        <>
          {header(<>Какое расписание копировать?</>)}
          {body(
            <>
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
            </>,
          )}
        </>
      );
    else {
      const scope = takeScheduleStrongScopeMaker(props.schw);

      return (
        <>
          {header(<>Копируем {schedule.title}</>)}
          {body(
            <>
              <EvaSendButton
                // scope={scope}
                // fieldName="copy"
                Icon={IconCopy02StrokeRounded}
                postfix="Скопировать"
                onSuccess={closeModal}
                onSend={async () => {}}
                // mapExecArgs={args => {
                //   const myUser = schedule.ctrl.users.find(user => user.login === auth.login);
                //   if (auth == null || myUser == null) return;

                //   const value: IScheduleWidget = {
                //     ...schedule,
                //     w: props.schw,
                //     ctrl: {
                //       ...schedule.ctrl,
                //       users: [myUser],
                //       roles: schedule.ctrl.roles.map(role => {
                //         return {
                //           ...role,
                //           user: undefined,
                //         };
                //       }),
                //     },
                //     days: schedule.days.map(day => {
                //       return {
                //         ...day,
                //         list: day.list.map(event => {
                //           const atts: ScheduleWidgetDayEventAttValues = {};

                //           if (event.atts)
                //             MyLib.entries(event.atts).forEach(([attKey, attValue]) => {
                //               if (mylib.isArr(attValue) || !mylib.isArr(attValue.values)) {
                //                 if (attKey === '[leader]:game') atts[attKey] = {};
                //                 else if (
                //                   attKey === '[SCH]:chlist' &&
                //                   !mylib.isArr(attValue) &&
                //                   mylib.isArr(attValue.list)
                //                 )
                //                   atts[attKey] = {
                //                     ...attValue,
                //                     list: attValue.list.map(att => {
                //                       return att[0] === 1 ? [0, ...att.slice(1)] : att;
                //                     }),
                //                   };
                //                 else atts[attKey] = attValue;
                //               } else {
                //                 atts[attKey] = {
                //                   ...attValue,
                //                   values: attValue.values
                //                     .map(val => {
                //                       return typeof val[1] === 'number' &&
                //                         ScheduleWidgetCleans.checkIsTaleIdUnit(val[1], CustomAttUseTaleId.Users)
                //                         ? null
                //                         : val[0] === true
                //                           ? [false, ...val.slice(1)]
                //                           : val;
                //                     })
                //                     .filter(itNNull),
                //                 };
                //               }
                //             });

                //           return {
                //             ...event,
                //             rate: undefined,
                //             atts,
                //           };
                //         }),
                //       };
                //     }),
                //   };

                //   return {
                //     ...args,
                //     value,
                //   };
                // }}
              />
            </>,
          )}
        </>
      );
    }
  });

  return (
    <>
      {modalNode}
      <IconButton
        Icon={IconCopy02StrokeRounded}
        postfix="Скопировать расписание"
        onClick={openModal}
      />
    </>
  );
}
