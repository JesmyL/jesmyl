import {
  IScheduleWidgetWid,
  packScheduleWidgetInviteLink,
  ScheduleStorage,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
  SokiServiceCallback,
} from 'shared/api';
import { smylib } from 'shared/utils';
import { ExecutionDict } from '../../../shared/api/complect/executer/model';
import { filer } from '../../complect/filer/Filer';
import sokiServer from '../../complect/soki/SokiServer';
import { jesmylTgBot } from '../../sides/telegram-bot/bot';

export const indexService: SokiServiceCallback = (key, value, getCapsule, { client, eventData, requestId }) => {
  return new Promise(async (resolve, reject) => {
    if (key === 'swInvite') {
      const tryInvite = (authTries: number) => {
        const capsule = getCapsule();

        if (!capsule?.auth || eventData.auth == null) {
          if (authTries < 1) reject('Не авторизован');
          else setTimeout(tryInvite, 500, authTries - 1);
          return;
        }

        const schedules: ScheduleStorage = filer.contents.index?.schedules?.data;
        let isRejected = false;

        const isSetted = schedules.list.some(schedule => {
          return schedule.ctrl.users.some(user => {
            if (user.login !== undefined) return false;
            if (packScheduleWidgetInviteLink(schedule.w, user.mi) === value) {
              if (schedule.ctrl.users.some(u => u.login === capsule.auth!.login)) {
                reject(`Вы уже являетесь участником ${schedule.title || 'этого события'}`);
                isRejected = true;
                return true;
              }
              const execs: ExecutionDict[] = [
                {
                  action: 'joinUserByLink',
                  args: {
                    schw: schedule.w,
                    userMi: user.mi,
                  },
                },
              ];
              sokiServer
                .execExecs('index', execs, eventData.auth, capsule.auth, client)
                .then(() => resolve('Успешно добавлен в список участников'));
              return true;
            }
            return false;
          });
        });
        if (!isRejected && !isSetted) reject('Ссылка не действительна');
      };

      tryInvite(10);
      return;
    }

    if (key === 'takeDaySchedule') {
      const sendError = (errorMessage: string) => {
        sokiServer.send(
          {
            appName: 'index',
            service: {
              key,
              errorMessage,
            },
            requestId,
          },
          client,
        );
      };

      const schedules: ScheduleStorage = filer.contents.index['schedules'].data;

      if (schedules.list === undefined) return sendError('Ошибка 39162369496123');

      const chatInstance: string | IScheduleWidgetWid = value;

      const schedule = schedules.list.find(
        smylib.isStr(chatInstance)
          ? sch => sch.tgChatReqs?.endsWith('/' + chatInstance)
          : sch => sch.w === chatInstance,
      );

      if (schedule === undefined) return sendError('Расписание не найдено');

      const tryInvite = async (tries: number) => {
        const capsule = getCapsule();

        if (capsule?.auth == null) {
          if (tries > 0) setTimeout(tryInvite, 500, tries - 1);
          return;
        }

        const auth = capsule.auth;

        if (auth.tgId == null || schedule.ctrl.users.some(user => user.tgId === auth.tgId)) return;

        const tgChatId =
          schedule.tgChatReqs === undefined
            ? null
            : isNaN(parseInt(schedule.tgChatReqs, 10))
              ? null
              : parseInt(schedule.tgChatReqs, 10);

        if (tgChatId === null) return;

        const admins = await jesmylTgBot.bot.getChatAdministrators(tgChatId);

        const execs: ExecutionDict[] = [
          {
            action: 'addUserFromTgSchedule',
            args: {
              schw: schedule.w,
              R: admins.some(({ user }) => user.id === auth.tgId)
                ? scheduleWidgetUserRights.collectRights(ScheduleWidgetUserRoleRight.ReadSpecials)
                : scheduleWidgetUserRights.collectRights(ScheduleWidgetUserRoleRight.ReadTitles),
            },
          },
        ];

        try {
          await sokiServer.execExecs('index', execs, eventData.auth, capsule.auth, client);
        } catch (error) {}
      };

      tryInvite(10);

      sokiServer.send(
        {
          appName: 'index',
          service: {
            key,
            value: schedule,
          },
          requestId,
        },
        client,
      );

      return;
    }

    reject('Ошибка 0937126');
  });
};
