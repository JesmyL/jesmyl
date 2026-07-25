import { cmShareServerTsjrpcMethods } from 'back/apps/cm/tsjrpc.shares';
import { makeTwiceKnownName } from 'back/complect/makeTwiceKnownName';
import { userDB, userRoleDB } from 'back/drizzle.schema';
import { db, dbUpdate } from 'back/drizzle/drizzle.db';
import { hostRootDir } from 'back/envJson';
import { jsonParseSecure } from 'back/json-secure';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { PostJRPCMessageScope } from 'back/sides/telegram-bot/postJRPCMessage';
import { supportTelegramAuthorizations } from 'back/sides/telegram-bot/prod/authorize';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { exec } from 'child_process';
import { eq } from 'drizzle-orm';
import { escapeRegExpSymbols, makeRegExp } from 'regexpert';
import { UserInfoUnsecure, UserLogin } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { constantsConfigurator } from 'shared/const/cm/constants.def';
import { emojiList } from 'shared/const/emojiList';
import { UserAccessRole, UserAccessRoleInfo } from 'shared/model/index/access-rights';
import { randomItem } from 'shared/randoms';
import { iife } from 'shared/utils';
import { switchCRUDAccesRightValue } from 'shared/utils/index/utils';
import { forEachObjectEntries, objectKeys, objectLength } from 'shared/utils/object.utils';
import { textToUpperCase } from 'shared/utils/string.utils';
import {
  accessRightTitlesFileStore,
  appVersionFileStore,
  indexStameskaIconsFileStore,
  nounsFileStore,
  pronounsFileStore,
  valuesFileStore,
} from '../file-stores';
import { schGeneralTsjrpcBaseServer } from '../schedules/base-tsjrpc/general.tsjrpc.base';
import { constantsConfigFileStore } from '../schedules/file-stores';
import { resetUserRoleTiny, takeUserRoleTiny } from '../tinies/userRoleTiny';
import { resetUserTiny, takeUserTiny } from '../tinies/userTiny';
import { indexServerTsjrpcShareMethods } from '../tsjrpc.methods';
import { indexTSJRPCBaseGetIconExistsPacks } from './lib/getIconExistsPacks';
import { indexAuthByTgUser } from './lib/makeAuthFromUser';
import { makeUserAccessRights } from './lib/makeUserAccessRights';
import { otpTSJRPCMethods } from './lib/otp.methods';
import { indexTSJRPCBaseRequestFreshes } from './lib/requestFreshes';
import { indexTSJRPCBaseUpdateUserAccessRight } from './lib/updateUserAccessRight';

const deviceIdPostfixSymbols = '!@#$%^&*;.,?/|\\+=-'.split('');

appVersionFileStore.watchFile(value => {
  tglogger.log(`Version upgrade: ${value.num}`);

  const command = `chmod +x ${hostRootDir}/assets/`;

  setTimeout(() => {
    tglogger.log(command);

    exec(command, (error, stdout, stderr) => {
      tglogger[error ? 'error' : 'log'](`${command}\n\n${JSON.stringify({ error, stdout, stderr }, null, ' ')}`);
    });
  }, 2000);
});

export const indexServerTsjrpcBase = new (class Index extends TsjrpcBaseServer<IndexTsjrpcModel> {
  constructor() {
    super({
      scope: 'Index',
      beforeEachTools: {
        getIndexValues: { minVersion: 0 },
        getFreshAppVersion: { minVersion: 0 },
        getDeviceId: { minVersion: 0 },
      },
      methods: {
        ...otpTSJRPCMethods,
        ...indexTSJRPCBaseUpdateUserAccessRight,
        ...indexTSJRPCBaseRequestFreshes,
        ...indexTSJRPCBaseGetIconExistsPacks,

        updateUserAccessRole: async ({ login, role }, { auth: userAuth }) => {
          const auth = takeLogginedAuthOrThrow(userAuth);

          if (auth.login === login) throw 'Нельзя поменять роль себе же';

          const yourUser = await takeUserTiny({ l: auth.login });

          if (yourUser?.r !== 'TOP') throw 'Нет прав на это действие 55412304234670';

          const mod = Date.now();
          const where = eq(userDB.l, login);

          if (role) {
            const roleInfo = await takeUserRoleTiny({ n: role });
            if (!roleInfo) throw 'Неизвестная роль';
            await dbUpdate(userDB, { r: role, m: mod }, where);
          } else await dbUpdate(userDB, { r: null, m: mod }, where);

          resetUserTiny({ l: login });

          indexServerTsjrpcShareMethods.refreshAccessRights(
            { rights: await makeUserAccessRights(login), mod },
            { login },
          );

          return { value: { [login]: await takeUserTiny({ l: login }) } };
        },

        addNewAccessRole: async ({ role }) => {
          const roleInfo = await takeUserRoleTiny({ n: role });
          if (roleInfo) throw 'Такая роль уже существует';

          await db.insert(userRoleDB).values({ n: role });

          return { value: { [role]: await takeUserRoleTiny({ n: role }) } };
        },

        updateRoleAccessRight: async ({ operation, rule, scope, role }, { auth: userAuth }) => {
          const auth = takeLogginedAuthOrThrow(userAuth);
          const yourUser = await takeUserTiny({ l: auth.login });

          if (yourUser?.r !== 'TOP') throw 'Нет прав на это действие 068234765';

          const roleRights = await takeUserRoleTiny({ n: role });

          if (!roleRights) throw 'Нет такой роли';

          roleRights.r ??= {};
          roleRights.r[scope] ??= {};
          const mod = Date.now();

          roleRights.r[scope][rule] = switchCRUDAccesRightValue(roleRights.r[scope][rule] ?? 0, operation);

          if (!roleRights.r[scope][rule]) delete roleRights.r[scope][rule];
          if (!objectLength(roleRights.r[scope])) delete roleRights.r[scope];

          const usersWithRoleSet = new Set(
            (await db.select({ l: userDB.l }).from(userDB).where(eq(userDB.r, role))).map(it => it.l),
          );

          indexServerTsjrpcShareMethods.refreshAccessRights({ rights: {}, mod: 0 }, (_, auth, client) => {
            if (auth?.login && usersWithRoleSet.has(auth.login)) {
              iife(async () => {
                indexServerTsjrpcShareMethods.refreshAccessRights(
                  { rights: await makeUserAccessRights(auth.login), mod },
                  client,
                );
              });
            }

            return false;
          });

          await dbUpdate(userRoleDB, { r: roleRights.r ?? null }, eq(userRoleDB.n, role));
          resetUserRoleTiny({ n: role });

          return { value: { [role]: await takeUserRoleTiny({ n: role }) } };
        },

        getDeviceId: async () => {
          const deviceId =
            makeTwiceKnownName().replace(makeRegExp('/ /g'), '_') +
            '_' +
            Array(5)
              .fill(0)
              .map(() => randomItem(deviceIdPostfixSymbols))
              .join('');

          return {
            value: deviceId as never,
            description: `Запрос DeviceId - ${deviceId}`,
            logScope: PostJRPCMessageScope.Support,
          };
        },

        getDeviceEmoji: async () => {
          const value = randomItem(emojiList);

          return {
            value,
            description: `Запрос DeviceEmoji - ${value}`,
            logScope: PostJRPCMessageScope.Support,
          };
        },

        authMeByTelegramNativeButton: indexAuthByTgUser('через TG-auth-native кнопку'),
        authMeByTelegramMiniButton: indexAuthByTgUser('через TG-mini-icon кнопку'),
        authMeByTelegramInScheduleDay: indexAuthByTgUser('в расписании дня'),

        authMeByTelegramBotNumber: async ({ secretNumber }, tool) => {
          const user = supportTelegramAuthorizations[secretNumber]?.().from;

          if (user == null) throw 'Не верный код авторизации';

          return await indexAuthByTgUser('через TG-код')({ user }, tool);
        },

        getFreshAppVersion: async () => ({ value: appVersionFileStore.getValue().num }),
        getIndexValues: async () => ({ value: valuesFileStore.getValue() }),

        getAccessRightTitles: async () => ({ value: accessRightTitlesFileStore.getValue() }),
        getUserInfoDict: async () => {
          const userInfoDict: PRecord<UserLogin, UserInfoUnsecure> = {};

          (await db.select().from(userDB)).forEach(
            it => (userInfoDict[it.l] = { ...it, uauth: jsonParseSecure(it.auth) }),
          );

          return { value: userInfoDict };
        },
        getRoleUnfoDict: async () => {
          const roleInfoDict: PRecord<UserAccessRole, UserAccessRoleInfo> = {};

          (await db.select().from(userRoleDB)).forEach(it => (roleInfoDict[it.n] = it));

          return { value: roleInfoDict };
        },
        getIconPack: async ({ icon }) => ({ value: { pack: indexStameskaIconsFileStore.getValue()[icon] } }),

        getNounPron: args => {
          const allNouns = objectKeys(nounsFileStore.getValue().words);
          const allProns = objectKeys(pronounsFileStore.getValue().words);
          const e$e: Record<string, string> = { е: '[её]', ё: '[её]', Е: '[её]', Ё: '[её]' };
          let nouns: string[] | und = undefined;
          let prons: string[] | und = undefined;

          if (args.noun && args.noun.length > 2) {
            const reg = makeRegExp(
              `/${args.noun
                .split('')
                .map(letter => e$e[letter] ?? escapeRegExpSymbols(letter))
                .join('.*?')}/i`,
            );
            nouns = allNouns
              .filter(key => key.match(reg))
              .sort((a, b) => a.length - b.length || a.localeCompare(b))
              .slice(0, 10)
              .map(textToUpperCase);
          }

          if (args.pron && args.pron.length > 2) {
            const reg = makeRegExp(
              `/${args.pron
                .split('')
                .map(letter => e$e[letter] ?? escapeRegExpSymbols(letter))
                .join('.*?')}/i`,
            );
            prons = allProns
              .filter(key => key.match(reg))
              .sort((a, b) => a.length - b.length || a.localeCompare(b))
              .slice(0, 10)
              .map(textToUpperCase);
          }

          return { value: { nouns, prons, result: makeTwiceKnownName(' ', args.pron, args.noun, false) } };
        },

        writeNounPron: ({ noun, pron, level }) => {
          if (noun) {
            const { words } = nounsFileStore.getValue();
            delete words[''];
            words[noun] = level || 1;
            words[''] = 0;

            nounsFileStore.saveValue();
          }
          if (pron) {
            if (!pron.endsWith('й') && !pron.endsWith('йся'))
              throw 'Прилагательное должно заканчиваться на `й` или `йся`';

            const { words } = pronounsFileStore.getValue();
            delete words[''];
            words[pron] = level || 1;
            words[''] = 0;

            pronounsFileStore.saveValue();
          }
        },

        updateConstConfig: async ({ config }) => {
          const prevConfig = constantsConfigFileStore.getValue();
          const newConfig = { ...config };
          const updates: string[] = [];

          forEachObjectEntries(newConfig, (key, value) => {
            const configuration = constantsConfigurator[key];
            const jsonValue = JSON.stringify(value);
            let updateTitle;

            if (configuration == null) {
              delete newConfig[key];
              updateTitle = `Неизвестный ключ (уже удалено) ${key} = ${jsonValue}`;
            } else {
              const checkedValue = (newConfig[key] = configuration.checked(value) as never);

              updateTitle = `${configuration.title} = ${checkedValue}`;
            }

            updates.push(`${updateTitle} (было ${prevConfig[key]})`);
          });

          constantsConfigFileStore.setValue({ ...prevConfig, ...newConfig });

          try {
            await cmShareServerTsjrpcMethods.refreshConstConfig(
              { config: newConfig, mod: constantsConfigFileStore.fileModifiedAt() },
              null,
            );
          } catch {
            //
          }

          await indexServerTsjrpcShareMethods.constConfig(
            { config: newConfig, mod: constantsConfigFileStore.fileModifiedAt() },
            null,
          );

          return { description: `Константы\n\n${updates.join('\n')}` };
        },
      },
    });
  }
})();

schGeneralTsjrpcBaseServer.$$register();
