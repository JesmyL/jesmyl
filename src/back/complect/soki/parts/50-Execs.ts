import { LocalSokiAuth, SokiAppName, SokiServerDoAction, SokiServerDoActionProps } from 'shared/api';
import { SMyLib, smylib } from 'shared/utils';
import { WebSocket } from 'ws';
import { ExecuteFeedbacks, ExecutionDict } from '../../../../shared/api/complect/executer/model';
import { jesmylChangesBot } from '../../../sides/telegram-bot/jesmylChangesBot';
import { tglogger } from '../../../sides/telegram-bot/log/log-bot';
import { Executer } from '../../executer/Executer';
import { filer } from '../../filer/Filer';
import { SokiAuther, sokiAuther } from '../SokiAuther';
import { SokiServerFiles } from './40-Files';

const retTrue = () => true;

export class SokiServerExecs extends SokiServerFiles implements SokiServerDoAction<'Execs'> {
  async execExecs(
    appName: SokiAppName,
    execs: ExecutionDict[],
    eventAuth: (LocalSokiAuth & { isSystem?: 1 }) | nil,
    auth: (LocalSokiAuth & { isSystem?: 1 }) | nil,
    client?: WebSocket,
    requestId?: string,
  ): Promise<ExecuteFeedbacks> {
    const appConfig = filer.appConfigs[appName];

    const exec = async (accessedExecs: ExecutionDict[]) => {
      if (!appConfig) return { errorMessage: 'Неизвестное приложение', fixes: [], replacedExecs: [], rules: [] };

      const contents = filer.contents[appName];
      const realParents: Record<string, unknown> = {};
      SMyLib.entries(contents).forEach(([key, val]) => (realParents[key] = val.data));
      const authLogin = eventAuth?.login ?? '';
      const bag: Record<string, unknown> = {};

      return await Executer.execute(appConfig, realParents, accessedExecs, auth).then(async props => {
        const lastUpdate = await filer.saveChanges(props.fixes, appName!);
        const level = appConfig.requirements[props.fixes[0]]?.level;

        this.send(
          {
            requestId,
            execs: {
              appName,
              list: props.replacedExecs,
              lastUpdate,
            },
            errorMessage: props.errorMessage,
            appName,
          },
          props.fixes[0] === 'schedules'
            ? (capsule, _, whenRejButTs) => {
                const res =
                  capsule.auth?.login === authLogin ||
                  appConfig.requirements['schedules']?.onCantRead?.(
                    true,
                    props.replacedExecs[0],
                    props.rules[0],
                    capsule.auth,
                    bag,
                    realParents.schedules,
                    whenRejButTs,
                  );

                return res === whenRejButTs ? whenRejButTs : res === true || res == null;
              }
            : appName === 'index'
              ? retTrue
              : smylib.isNum(level) && level > 0
                ? capsule => {
                    return capsule.appName === appName && !!capsule.auth && capsule.auth.level >= level;
                  }
                : capsule => capsule.appName === appName,
          client,
          {
            requestId,
            execs: {
              appName,
              list: [],
              lastUpdate,
            },
            errorMessage: props.errorMessage,
            appName,
          },
        );

        return props;
      });
    };

    if (
      auth &&
      auth.login === eventAuth?.login &&
      (eventAuth?.tgId
        ? eventAuth.passw === SokiAuther.makePassw(eventAuth.tgId, eventAuth.nick)
        : await sokiAuther.isCorrectData(eventAuth))
    ) {
      return exec(execs);
    } else {
      try {
        const accessedExecs = execs.filter(exec => {
          const rule = appConfig.actions.rules.find(rule => rule.action === exec.action);

          return rule!.canBeUnauthorized;
        });

        if (accessedExecs?.length) return exec(accessedExecs);
      } catch (error) {}

      if (client)
        this.send(
          {
            requestId,
            execs: {
              appName,
              list: [],
              lastUpdate: null,
            },
            errorMessage: 'Не авторизован 91239',
            appName,
          },
          null,
          client,
        );

      throw Error('Не авторизован 3146');
    }
  }

  async doOnExecs({ appName, client, eventBody, eventData, requestId }: SokiServerDoActionProps) {
    if (eventBody.execs === undefined) return false;
    const capsule = this.capsules.get(client);

    this.execExecs(appName, eventBody.execs, eventData.auth, capsule?.auth, client, requestId).then(result => {
      if (result.errorMessage !== undefined) {
        jesmylChangesBot.postMessage(result.errorMessage);
        tglogger.error(result.errorMessage);
      } else {
        const fix = result.replacedExecs?.[0]?.track?.[0];
        const info = (execsAlt: string, indent = ' ') =>
          `<b>${eventData.auth?.fio ?? 'Нет имени'}` +
          (eventData.auth?.nick ? ` t.me/${eventData.auth.nick}` : '') +
          `</b>:\n\n${appName}${fix ? `.${smylib.isStr(fix) ? fix : JSON.stringify(fix)}` : ''}:\n${result.replacedExecs
            .map(this.extractTitle)
            .join('\n\n')}` +
          `\n\n\nJSON изменений:\n<blockquote expandable>` +
          (execsAlt ||
            JSON.stringify(
              result?.replacedExecs.map(ex => {
                const exec = { ...ex };
                delete exec.value;

                return exec;
              }),
              null,
              indent,
            )) +
          `</blockquote>\n\nАвтор:\n<blockquote expandable>` +
          (eventData.auth ? JSON.stringify(eventData.auth, null, ' ') : 'Не авторизоан') +
          `</blockquote>`;

        (async () => {
          try {
            await jesmylChangesBot.postMessage(info(''));
          } catch (error) {
            try {
              await jesmylChangesBot.postMessage(info('', ''));
            } catch (error) {
              await jesmylChangesBot.postMessage(info('<b><s>JSON слишком большой</s></b>'));
            }
          }
        })();
      }
    });

    return false;
  }

  private extractTitle = (exec: {
    title?: string | ((exec: Record<string, unknown>) => string);
    shortTitle?: string;
    args?: Record<string, unknown>;
  }) => (smylib.execIfFunc(exec.title, exec.args) || exec.shortTitle) ?? '';
}
