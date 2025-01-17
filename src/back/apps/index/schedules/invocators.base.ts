import { FileStore } from 'back/complect/FileStorage';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { mylib } from 'front/utils';
import {
  IScheduleWidget,
  IScheduleWidgetUser,
  IScheduleWidgetUserMi,
  IScheduleWidgetWid,
  makeTwiceKnownName,
  NounPronsType,
  ScheduleScopeProps,
  ScheduleUserScopeProps,
  ScheduleWidgetPhotoKey,
  scheduleWidgetUserRights,
} from 'shared/api';
import { SchSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { SMyLib, smylib } from 'shared/utils';
import { newSchedule } from './action-box/action-box';
import { schServerInvocatorShareMethods } from './invocators.shares';

export const schedulesFileStore = new FileStore<IScheduleWidget[]>('/apps/index/schs.json', []);
export const nounPronsWordsFileStore = new FileStore<NounPronsType>('/apps/index/nounPronsWords.json', {
  nouns: {},
  pronouns: {},
});

const sharedPhotoDict = {} as Record<ScheduleWidgetPhotoKey, string>;

class SchSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchSokiInvocatorMethods> {
  constructor() {
    super(
      'SchSokiInvocatorBaseServer',
      {
        oooooooooooooooooooooooooooooooooooooo: () => async () => {},

        /////////////////////////////////////////
        /////////////////////////////////////////
        /////////////////////////////////////////
        /////////////////////////////////////////
        /////////////////////////////////////////
        /////////////////////////////////////////
        /////////////////////////////////////////

        // general
        create:
          ({ auth }) =>
          async title => {
            if (auth == null) throw new Error('no auth');

            const sch = smylib.clone(newSchedule);

            const date = new Date();
            sch.m = sch.w = date.getTime();
            sch.title = title;

            date.setMonth(date.getMonth() + 1);
            date.setHours(0, 0, 0, 0);
            sch.start = date.getTime();

            sch.ctrl.users = [
              {
                mi: IScheduleWidgetUserMi.def,
                fio: auth.fio,
                login: auth.login,
                nick: auth.nick,
                tgId: auth.tgId,
                R: scheduleWidgetUserRights.getAllRights(),
              },
            ];

            schedulesFileStore.getValue().push(sch);
            schedulesFileStore.saveValue();
            schServerInvocatorShareMethods.editedSchedule(null, sch);

            return sch;
          },

        rename: () => this.updateScheduleValue('title'),
        setTopic: () => this.updateScheduleValue('topic'),
        setDescription: () => this.updateScheduleValue('dsc'),
        setStartTime: () => this.updateScheduleValue('start'),
        setFirstDayAsTech: () => this.updateScheduleValue('withTech'),
        setTgChatRequisites: () => this.updateScheduleValue('tgChatReqs'),
        setTgInformTime: () => this.updateScheduleValue('tgInformTime'),

        toggleIsTgInform: () => props =>
          modifySchedule(props, sch => (sch.tgInform = sch.tgInform === 0 ? undefined : 0)),

        addDay: () => props =>
          modifySchedule(props, sch =>
            sch.days.push({
              list: [],
              mi: smylib.takeNextMi(sch.days),
              wup: 7,
            }),
          ),

        remove: () => props => modifySchedule(props, sch => (sch.isRemoved = 1)),

        //users
        addUsersByExcel: () => (props, users) =>
          modifySchedule(props, sch => {
            let lastUserMi = smylib.takeNextMi(sch.ctrl.users);

            users.forEach(user => {
              sch.ctrl.users.push({ ...user, mi: ++lastUserMi });
            });
          }),

        setUserFio: () => (props, value) => this.modifyUser(props, user => (user.fio = value)),
        setUserRights: () => (props, value) => this.modifyUser(props, user => (user.R = value)),
        addUserListUnitMembership: () => (props, value) =>
          this.modifyUser(props, user => {
            user.li ??= {};
            user.li[props.cati] = value;
          }),
        removeUserListUnitMembership: () => props =>
          this.modifyUser(props, user => {
            if (user.li == null) return;
            delete user.li[props.cati];
            if (!mylib.keys(user.li).length) delete user.li;
          }),

        // photos
        putSharedPhotos: () => async (_, photoDict) => {
          const loadedCount = smylib.keys(photoDict).length;
          const prevCachedCount = smylib.keys(sharedPhotoDict).length;
          Object.assign(sharedPhotoDict, photoDict);
          const newCachedCount = smylib.keys(sharedPhotoDict).length;

          return { addedCount: newCachedCount - prevCachedCount, loadedCount };
        },

        getSharedPhotos: () => async schw => {
          const keyPrefix = '' + schw;
          const photos: { key: ScheduleWidgetPhotoKey; src: string }[] = [];
          SMyLib.keys(sharedPhotoDict).forEach(key => {
            if (key.startsWith(keyPrefix)) photos.push({ key, src: sharedPhotoDict[key] });
          });

          return photos;
        },

        // roles
        createRole: () => props =>
          modifySchedule(props, sch =>
            sch.ctrl.roles.push({ mi: smylib.takeNextMi(sch.ctrl.roles), title: 'Помощьник' }),
          ),

        setRoleIcon: () => (props, value) =>
          modifySchedule(props, sch => {
            const role = sch.ctrl.roles.find(role => role.mi === props.roleMi);
            if (role == null) throw new Error('role not found');
            role.icon = value;
          }),

        setRoleTitle: () => (props, value) =>
          modifySchedule(props, sch => {
            const role = sch.ctrl.roles.find(role => role.mi === props.roleMi);
            if (role == null) throw new Error('role not found');
            role.title = value;
          }),

        addRoleCategory: () => props => modifySchedule(props, sch => sch.ctrl.cats.push('')),
        setRoleCategoryTitle: () => (props, cati, value) => modifySchedule(props, sch => (sch.ctrl.cats[cati] = value)),

        setRoleUser: () => (props, value) =>
          modifySchedule(props, sch => {
            const role = sch.ctrl.roles.find(role => role.mi === props.roleMi);
            if (role == null) throw new Error('role not found');
            role.userMi = value;
          }),

        setCategoryForRole: () => (props, value) =>
          modifySchedule(props, sch => {
            const role = sch.ctrl.roles.find(role => role.mi === props.roleMi);
            if (role == null) throw new Error('role not found');
            role.cati = value;
          }),

        makeFreeRole: () => props =>
          modifySchedule(props, sch => {
            const role = sch.ctrl.roles.find(role => role.mi === props.roleMi);
            if (role == null) throw new Error('role not found');
            delete role.userMi;
          }),

        // lists
        createListCategory: () => props =>
          modifySchedule(props, sch =>
            sch.lists.cats.push({
              title: '',
              icon: 'CheckList',
              titles: ['Руководители', 'Участники'],
            }),
          ),
        createListCategoryUnit: () => (props, cati) =>
          modifySchedule(props, sch => {
            const mi = smylib.takeNextMi(sch.lists.units);

            sch.lists.units.push({
              cati,
              dsc: '',
              mi,
              title: `${sch.lists.cats[cati].title} ${mi}`,
            });
          }),
        setListCategoryTitle: () => (props, value) =>
          modifySchedule(props, sch => (sch.lists.cats[props.cati].title = value)),
        setCategoryMembersTitle: () => (props, value) =>
          modifySchedule(props, sch => (sch.lists.cats[props.cati].titles[1] = value)),
        setCategoryMentorsTitle: () => (props, value) =>
          modifySchedule(props, sch => (sch.lists.cats[props.cati].titles[0] = value)),
        setListCategoryIcon: () => (props, value) =>
          modifySchedule(props, sch => (sch.lists.cats[props.cati].icon = value)),

        setListUnitTitle: () => (props, _, value) =>
          modifySchedule(props, sch => {
            const unit = sch.lists.units.find(unit => unit.mi === props.unitMi);
            if (unit == null) throw new Error('The list unit not found');
            unit.title = value;
          }),

        setListUnitDescription: () => (props, _, value) =>
          modifySchedule(props, sch => {
            const unit = sch.lists.units.find(unit => unit.mi === props.unitMi);
            if (unit == null) throw new Error('The list unit not found');
            unit.dsc = value;
          }),

        // game criterias
        addGame: () => props =>
          modifySchedule(props, sch => {
            sch.games ??= { criterias: [], list: [] };
            sch.games.list.push({
              title: `Игра ${sch.games.list.length + 1}`,
              mi: mylib.takeNextMi(sch.games.list),
              teams: [],
            });
          }),
        setGameTeams: () => (props, teams) =>
          modifySchedule(props, sch => {
            const game = sch.games?.list.find(game => game.mi === props.gameMi);
            if (game == null) throw new Error('game not found');
            let mi = 0;

            game.teams = teams.map(({ users }) => {
              return {
                mi: mi++,
                users,
                title: makeTwiceKnownName(
                  smylib.randomItem(smylib.keys(nounPronsWordsFileStore.getValue().pronouns)),
                  smylib.randomItem(smylib.keys(nounPronsWordsFileStore.getValue().nouns)),
                ).join(' '),
              };
            });
          }),
        setGameTitle: () => (props, value) =>
          modifySchedule(props, sch => {
            const game = sch.games?.list.find(game => game.mi === props.gameMi);
            if (game == null) throw new Error('game not found');

            game.title = value;
          }),
        addGameCriteria: () => props =>
          modifySchedule(props, sch => {
            sch.games ??= { criterias: [], list: [] };
            sch.games.criterias.push({ title: `Критерий ${sch.games.criterias.length + 1}`, sorts: {} as never });
          }),
        setGameCriteriaTitle: () => (props, value) =>
          modifySchedule(props, sch => {
            const criteria = sch.games?.criterias[props.criteriai];
            if (criteria == null) throw new Error('criteria not found');
            criteria.title = value;
          }),
        setGameSortedDict: () => (props, value) =>
          modifySchedule(props, sch => {
            const criteria = sch.games?.criterias[props.criteriai];
            if (criteria == null) throw new Error('criteria not found');
            criteria.sorts = { ...criteria.sorts, ...value };
          }),

        toggleGameStrikedUser: () => (props, userMi) =>
          modifySchedule(props, sch => {
            sch.games ??= { criterias: [], list: [] };
            const userSet = new Set((sch.games.strikedUsers ??= []));

            if (userSet.has(userMi)) userSet.delete(userMi);
            else userSet.add(userMi);

            sch.games.strikedUsers = Array.from(userSet);
          }),
      },
      {
        oooooooooooooooooooooooooooooooooooooo: () => `***************************************************`,

        create: sch => `Создано новое расписание ${this.titleInBrackets(sch)}`,
        rename: sch => `Расписание ${this.titleInBrackets(sch)} переименовано`,
        setTopic: sch => `В расписании ${this.titleInBrackets(sch)} изменена тема: ${sch.topic}`,
        setDescription: sch => `В расписании ${this.titleInBrackets(sch)} изменено описание: ${sch.dsc}`,
        remove: sch => `Расписание ${this.titleInBrackets(sch)} удалено`,
        addDay: sch => `В расписании ${this.titleInBrackets(sch)} добавлен день`,
        setStartTime: sch =>
          `В расписании ${this.titleInBrackets(sch)} установлена дата начала - ` +
          `${new Date(sch.start).toLocaleDateString('ru')}`,

        setFirstDayAsTech: sch =>
          `В расписании ${this.titleInBrackets(sch)} первый день сделан ${sch.withTech ? 'техническим' : 'обычным'}`,

        setTgChatRequisites: sch =>
          `В расписании ${this.titleInBrackets(sch)} изменены реквизиты TG-чата: ${sch.tgChatReqs}`,

        toggleIsTgInform: sch =>
          `В расписании ${this.titleInBrackets(sch)} TG-напоминания ${sch.tgInform === 0 ? 'отключены' : 'включены'}`,

        setTgInformTime: sch =>
          `В расписании ${this.titleInBrackets(sch)} TG-напоминания будут ` +
          `${sch.tgInformTime ? `за ${sch.tgInformTime} минут` : 'только в начале события'} `,

        addUsersByExcel: (sch, _, users) =>
          `В расписании ${this.titleInBrackets(sch)} добавлены участники списком из Excel: ` +
          `${users.map(u => u.fio).join(', ')}`,

        setUserFio: (sch, _, value) => `В расписании ${this.titleInBrackets(sch)} переименован участник ${value}`,
        setUserRights: (sch, _, value) =>
          `В расписании ${this.titleInBrackets(sch)} участнику выданы права ` +
          (scheduleWidgetUserRights.texts[scheduleWidgetUserRights.rightsBalance(value)].role?.[1] ?? 'Неизвестного'),

        addUserListUnitMembership: (sch, props, value) =>
          `В расписании ${this.titleInBrackets(sch)} ` +
          sch.ctrl.users.find(user => user.mi === props.userMi)?.fio +
          ` теперь ` +
          (value < 0 ? sch.lists.cats[props.cati].titles[0] : sch.lists.cats[props.cati].titles[1]) +
          ` в списке ${sch.lists.cats[props.cati]?.title}`,

        removeUserListUnitMembership: (sch, props) =>
          `В расписании ${this.titleInBrackets(sch)} ` +
          sch.ctrl.users.find(user => user.mi === props.userMi)?.fio +
          ` удалён из списка ${sch.lists.cats[props.cati]?.title}`,

        putSharedPhotos: (counts, schw) =>
          `Были отправлены фото для расписания ${this.titleInBrackets(schw)}\n` +
          `Загружено: ${counts.loadedCount}\nНовых: ${counts.addedCount}`,

        getSharedPhotos: (photos, schw) =>
          `Запрос списка фото для расписания ${this.titleInBrackets(schw)}. Отправлено ${photos.length} шт`,

        createRole: sch => `В расписании ${this.titleInBrackets(sch)} добавлена новая категория ролей`,
        setRoleIcon: (sch, _, icon, roleTitle) =>
          `В расписании ${this.titleInBrackets(sch)} для роли ${roleTitle} задана иконка ${icon}`,
        setRoleTitle: (sch, _, value, prevTitle) =>
          `В расписании ${this.titleInBrackets(sch)} роль "${prevTitle}" переименована на "${value}"`,
        addRoleCategory: sch => `В расписании ${this.titleInBrackets(sch)} добавлена новая категория ролей`,
        setRoleCategoryTitle: (sch, _, __, title, prevTitle) =>
          `В расписании ${this.titleInBrackets(sch)} категория ролей "${prevTitle}" переименована на "${title}"`,
        setCategoryForRole: (sch, _, title, roleTitle, catTitle) =>
          `В расписании ${this.titleInBrackets(sch)} роль ${roleTitle} теперь относится к категории "${catTitle}"`,
        setRoleUser: (sch, _, __, roleTitle, userName) =>
          `В расписании ${this.titleInBrackets(sch)} за ролью ${roleTitle} закреплён участник ${userName}`,
        makeFreeRole: (sch, _, roleTitle) =>
          `В расписании ${this.titleInBrackets(sch)} роль ${roleTitle} освобождена (стала вакантной)`,

        createListCategory: sch => `В расписании ${this.titleInBrackets(sch)} добавлена новая категория списков`,
        createListCategoryUnit: (sch, _, cati) =>
          `В расписании ${this.titleInBrackets(sch)} добавлен новый список для категории ${sch.lists.cats[cati].title}`,

        setListCategoryTitle: (sch, props, value) =>
          `В расписании ${this.titleInBrackets(sch)} для ${props.cati + 1} ` +
          `категории списков задано название "${value}"`,

        setListCategoryIcon: (sch, props, value) =>
          `В расписании ${this.titleInBrackets(sch)} для ${props.cati + 1} ` +
          `категории списков задана иконка "${value}"`,

        setCategoryMembersTitle: (sch, props, value) =>
          `В расписании ${this.titleInBrackets(sch)} для ${
            props.cati + 1
          } категории списков задано название для участников: "${value}"`,

        setCategoryMentorsTitle: (sch, props, value) =>
          `В расписании ${this.titleInBrackets(sch)} для ${props.cati + 1} ` +
          `категории списков задано название для наставников: "${value}"`,

        setListUnitTitle: (sch, _, cati, value) =>
          `В расписании ${this.titleInBrackets(sch)} для ` +
          `задано название для списка ${sch.lists.cats[cati]}: "${value}"`,

        setListUnitDescription: (sch, _, cati, value) =>
          `В расписании ${this.titleInBrackets(sch)} для ` +
          `задано описание для списка ${sch.lists.cats[cati]}: "${value}"`,

        addGameCriteria: sch => `В расписании ${this.titleInBrackets(sch)} добавлен новый критерий сортировки для игр`,
        addGame: sch => `В расписании ${this.titleInBrackets(sch)} добавлена новая игра`,
        setGameTeams: sch => `В расписании ${this.titleInBrackets(sch)} сформированы команды`,
        setGameTitle: (sch, _, value, prevTitle) =>
          `В расписании ${this.titleInBrackets(sch)} игра "${prevTitle}" переименована на "${value}"`,
        setGameCriteriaTitle: (sch, _, value, prevTitle) =>
          `В расписании ${this.titleInBrackets(sch)} критерий сортировки для игр ` +
          `"${prevTitle}" переименован на "${value}"`,
        setGameSortedDict: (sch, _, __, criteriaTitle) =>
          `В расписании ${this.titleInBrackets(sch)} для критерия сортировки игр ` +
          `"${criteriaTitle}" отсортированы участники`,
        toggleGameStrikedUser: (sch, _, userMi, userName) =>
          `В расписании ${this.titleInBrackets(sch)} участник ${userName} ` +
          `${sch.games?.strikedUsers?.includes(userMi) ? 'исключён из списка' : 'включён в список'} игроков`,
      },
    );
  }

  private titleInBrackets = (schScalar: IScheduleWidget | IScheduleWidgetWid) => {
    if (smylib.isNum(schScalar)) {
      const sch = schedulesFileStore.getValue().find(sch => sch.w === schScalar);
      if (sch === undefined) throw new Error('schedule not found');
      return `"${sch.title}"`;
    }
    return `"${schScalar.title}"`;
  };

  private updateScheduleValue =
    <Key extends keyof IScheduleWidget>(key: Key) =>
    (props: ScheduleScopeProps, value: IScheduleWidget[Key]) =>
      modifySchedule(props, sch => (sch[key] = value));

  private modifyUser = (props: ScheduleUserScopeProps, modifier: (user: IScheduleWidgetUser) => void) =>
    modifySchedule(props, sch => {
      const user = sch.ctrl.users.find(user => user.mi === props.userMi);
      if (user === undefined) throw new Error('User not found');
      modifier(user);
    });
}

export const modifySchedule = async ({ schw }: ScheduleScopeProps, modifier: (sch: IScheduleWidget) => void) => {
  const sch = schedulesFileStore.getValue().find(sch => sch.w === schw);
  if (sch === undefined) throw new Error('schedule not found');

  modifier(sch);
  sch.m = Date.now() + Math.random();
  schedulesFileStore.saveValue();
  schServerInvocatorShareMethods.editedSchedule(null, sch);

  return sch;
};

export const schSokiInvocatorBaseServer = new SchSokiInvocatorBaseServer();
