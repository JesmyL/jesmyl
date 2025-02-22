import { mylib } from '#shared/lib/my-lib';
import { CopyTextButton } from '#shared/ui/CopyTextButton';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import { CustomAttUseTaleId, ScheduleWidgetAppAttCustomizableValueItem, ScheduleWidgetCleans } from 'shared/api';
import { itNNil } from 'shared/utils';

const mapSetItemNumber = (l: string | nil, li: number) => li + 1 + '. ' + l!;

export function ScheduleKeyValueListAttStatistic(props: { list: ScheduleWidgetAppAttCustomizableValueItem[] | und }) {
  let len = 0;
  let checked = 0;
  let checks = 0;
  let lists = 0;
  let subLists = 0;
  let users = 0;
  const rights = useScheduleWidgetRightsContext();

  if (props.list == null) return null;

  props.list.forEach(([key, value]) => {
    len++;

    if (key === true) {
      checks++;
      checked++;
    } else if (key === false) {
      checks++;
    } else if (mylib.isNum(key) && ScheduleWidgetCleans.checkIsTaleIdUnit(key, CustomAttUseTaleId.Users)) {
      users++;
    }

    if (mylib.isArr(value)) {
      lists++;

      value.forEach(val => {
        subLists++;

        if (mylib.isNum(val) && ScheduleWidgetCleans.checkIsTaleIdUnit(val, CustomAttUseTaleId.Users)) {
          users++;
        }
      });
    } else if (mylib.isNum(value) && ScheduleWidgetCleans.checkIsTaleIdUnit(value, CustomAttUseTaleId.Users)) {
      users++;
    }
  });

  return (
    <>
      <CopyTextButton
        description="Скопировать"
        text={() => {
          return props.list
            ?.map(([key, value]) => {
              let text = '';

              const takeTextById = (key: number) => {
                const id = Math.trunc(key);

                if (ScheduleWidgetCleans.checkIsTaleIdUnit(key, CustomAttUseTaleId.Users)) {
                  const user = rights.schedule.ctrl.users.find(user => user.mi === id);
                  return user?.fio || user?.nick || key;
                }

                if (ScheduleWidgetCleans.checkIsTaleIdUnit(key, CustomAttUseTaleId.Roles)) {
                  return rights.schedule.ctrl.roles.find(role => role.mi === id)?.title ?? '';
                }

                if (ScheduleWidgetCleans.checkIsTaleIdUnit(key, CustomAttUseTaleId.Lists)) {
                  return rights.schedule.lists.units.find(unit => unit.mi === id)?.title ?? '';
                }

                if (ScheduleWidgetCleans.checkIsTaleIdUnit(key, CustomAttUseTaleId.Games)) {
                  return rights.schedule.games?.list.find(unit => unit.mi === id)?.title ?? '';
                }
              };

              if (key === true) text += '[+] ';
              else if (key === false) text += '[ ] ';
              else if (mylib.isStr(key)) text += key;
              else if (mylib.isNum(key)) text += takeTextById(key);
              else text += key;

              if (mylib.isStr(value)) text += (mylib.isStr(key) ? ':\n' : '') + value;
              else if (mylib.isNum(value)) text += takeTextById(value);
              else if (mylib.isArr(value))
                text +=
                  '\n' +
                  value
                    .map(val => {
                      if (mylib.isStr(val)) return val;
                      const id = Math.trunc(val);

                      if (ScheduleWidgetCleans.checkIsTaleIdUnit(val, CustomAttUseTaleId.Users)) {
                        const user = rights.schedule.ctrl.users.find(user => user.mi === id);
                        return user?.fio || user?.nick;
                      }

                      if (ScheduleWidgetCleans.checkIsTaleIdUnit(val, CustomAttUseTaleId.Roles)) {
                        return rights.schedule.ctrl.roles.find(role => role.mi === id)?.title;
                      }

                      if (ScheduleWidgetCleans.checkIsTaleIdUnit(val, CustomAttUseTaleId.Lists)) {
                        return rights.schedule.lists.units.find(unit => unit.mi === id)?.title;
                      }

                      return null;
                    })
                    .filter(itNNil)
                    .map(mapSetItemNumber)
                    .join('\n') +
                  '\n';

              return text;
            })
            .join('\n');
        }}
      />
      {!len || (
        <div className="margin-big-gap-v">
          {len === lists || len === users || <div className="">Пунктов: {len}</div>}
          {!users || <div className="">Людей: {users}</div>}
          {!checks || len === checks || <div className="">Выбираемых: {checks}</div>}
          {!checked || <div className="">Отмеченных: {checked}</div>}
          {!lists || <div className="">Списков: {lists}</div>}
          {!subLists || <div className="">Под списками: {subLists}</div>}
        </div>
      )}
    </>
  );
}
