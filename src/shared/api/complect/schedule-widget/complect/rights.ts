import md5 from 'md5';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { translateBase } from 'shared/utils/locale/base';
import { ScheduleWidgetUserMi, ScheduleWidgetWid } from './main';
import { ScheduleWidgetRightsCtrl, ScheduleWidgetRightTexts } from './rights-constructor';

export enum ScheduleWidgetUserRoleRight {
  Free = 0,
  TotalRedact = 1,
  Read,
  Redact,
  ReadTitles,
  ReadSpecials,
  RedactUsers,
  AddDays,
  AddEvents,
  RedactEventContent,
  RedactComsList,
}

export enum CustomAttUseTaleId {
  Roles = 0,
  Lists = 0.1,
  Users = 0.2,
  Games = 0.3,
}

export enum CustomAttUseRights {
  Titles = 1,
  Checkboxes = 2,
  Roles = 3,
  Lists = 4,
  CheckTitles = 5,
  Users = 6,
  CheckUsers = 7,
  Games = 8,
  CheckGames = 9,
}

export enum ScheduleWidgetRegType {
  Private = 0,
  Public = 1,
  BeforeRegistration,
  HideContent,
}

const rightsOrder = [
  ScheduleWidgetUserRoleRight.Read,
  ScheduleWidgetUserRoleRight.ReadTitles,
  ScheduleWidgetUserRoleRight.ReadSpecials,
  ScheduleWidgetUserRoleRight.Redact,
  ScheduleWidgetUserRoleRight.RedactUsers,
  ScheduleWidgetUserRoleRight.TotalRedact,
  ScheduleWidgetUserRoleRight.AddDays,
  ScheduleWidgetUserRoleRight.AddEvents,
  ScheduleWidgetUserRoleRight.RedactEventContent,
  ScheduleWidgetUserRoleRight.RedactComsList,
];

const rightTextFallbacks: Record<
  number,
  { title: string; role: [string, string]; description: string }
> = {
  [ScheduleWidgetUserRoleRight.AddDays]: {
    title: 'Добавление дней',
    role: ['Организатор дней', 'Организатора дней'],
    description: 'Создание дней в расписании',
  },
  [ScheduleWidgetUserRoleRight.AddEvents]: {
    title: 'Добавление событий',
    role: ['Составитель событий', 'Составителя событий'],
    description: 'Добавление событий в дни расписания',
  },
  [ScheduleWidgetUserRoleRight.RedactEventContent]: {
    title: 'Редактирование событий',
    role: ['Редактор событий', 'Редактора событий'],
    description: 'Изменение темы, времени и описания событий',
  },
  [ScheduleWidgetUserRoleRight.RedactComsList]: {
    title: 'Редактирование композиций',
    role: ['Редактор композиций', 'Редактора композиций'],
    description: 'Изменение списка композиций в событиях',
  },
};

const makeRightText = (
  id: ScheduleWidgetUserRoleRight,
  titleKey: BaseLocaleKey,
  roleKeys: [BaseLocaleKey, BaseLocaleKey],
  descriptionKey: BaseLocaleKey,
): ScheduleWidgetRightTexts<ScheduleWidgetUserRoleRight> => {
  const fallback = rightTextFallbacks[id];

  return {
    id,
    individual: true,
    get title() {
      return translateBase(titleKey) || fallback.title;
    },
    get role() {
      return [
        translateBase(roleKeys[0]) || fallback.role[0],
        translateBase(roleKeys[1]) || fallback.role[1],
      ];
    },
    get description(): [string] {
      return [translateBase(descriptionKey) || fallback.description];
    },
  };
};

const textList: ScheduleWidgetRightTexts<ScheduleWidgetUserRoleRight>[] = [
  {
    id: ScheduleWidgetUserRoleRight.Read,
    title: 'Чтение',
    role: ['Наблюдатель', 'Наблюдателя'],
    description: ['Базовый доступ'],
  },
  {
    id: ScheduleWidgetUserRoleRight.ReadTitles,
    title: 'Чтение текстов',
    role: ['Участник', 'Участника'],
    description: ['Доступ к темам и описаниям'],
  },
  {
    id: ScheduleWidgetUserRoleRight.ReadSpecials,
    title: 'Спец. события',
    role: ['Суперучастник', 'Суперучастника'],
    description: ['Доступ к специальным событиям'],
  },
  {
    id: ScheduleWidgetUserRoleRight.Redact,
    title: 'Редактирование',
    role: ['Редактор', 'Редактора'],
    description: ['Редактирование чего-либо'],
  },
  {
    id: ScheduleWidgetUserRoleRight.RedactUsers,
    title: 'Редактирование участников',
    role: ['Администратор', 'Администратора'],
    description: ['Добавление, выдача прав'],
  },
  {
    id: ScheduleWidgetUserRoleRight.TotalRedact,
    title: 'Полный доступ',
    role: ['Управляющий', 'Управляющего'],
    description: ['Выдача прав, просмотр спец. информации'],
  },
  makeRightText(
    ScheduleWidgetUserRoleRight.AddDays,
    BaseLocaleKey.ScheduleRightAddDays,
    [BaseLocaleKey.ScheduleRightAddDaysRole, BaseLocaleKey.ScheduleRightAddDaysRoleGen],
    BaseLocaleKey.ScheduleRightAddDaysDescription,
  ),
  makeRightText(
    ScheduleWidgetUserRoleRight.AddEvents,
    BaseLocaleKey.ScheduleRightAddEvents,
    [BaseLocaleKey.ScheduleRightAddEventsRole, BaseLocaleKey.ScheduleRightAddEventsRoleGen],
    BaseLocaleKey.ScheduleRightAddEventsDescription,
  ),
  makeRightText(
    ScheduleWidgetUserRoleRight.RedactEventContent,
    BaseLocaleKey.ScheduleRightRedactEventContent,
    [BaseLocaleKey.ScheduleRightRedactEventContentRole, BaseLocaleKey.ScheduleRightRedactEventContentRoleGen],
    BaseLocaleKey.ScheduleRightRedactEventContentDescription,
  ),
  makeRightText(
    ScheduleWidgetUserRoleRight.RedactComsList,
    BaseLocaleKey.ScheduleRightRedactComsList,
    [BaseLocaleKey.ScheduleRightRedactComsListRole, BaseLocaleKey.ScheduleRightRedactComsListRoleGen],
    BaseLocaleKey.ScheduleRightRedactComsListDescription,
  ),
];

export const scheduleWidgetUserRights = new ScheduleWidgetRightsCtrl(textList, rightsOrder);

///////////////////////////////

export const customAttUseRightsTitles: (ScheduleWidgetRightTexts<CustomAttUseRights> & {
  top?: CustomAttUseRights;
})[] = [
  {
    id: CustomAttUseRights.Checkboxes,
    title: 'выполняемые пункты',
  },
  {
    id: CustomAttUseRights.Roles,
    title: 'роли',
  },
  {
    id: CustomAttUseRights.Lists,
    title: 'список',
  },
  {
    id: CustomAttUseRights.Users,
    title: 'участников',
  },
  {
    id: CustomAttUseRights.CheckUsers,
    title: 'выполняемые пункты',
    top: CustomAttUseRights.Users,
  },
  {
    id: CustomAttUseRights.Titles,
    title: 'заголовки',
  },
  {
    id: CustomAttUseRights.CheckTitles,
    title: 'выполняемые пункты',
    top: CustomAttUseRights.Titles,
  },
  {
    id: CustomAttUseRights.Games,
    title: 'ком. игры',
  },
  {
    id: CustomAttUseRights.CheckGames,
    title: 'выполняемые пункты',
    top: CustomAttUseRights.Games,
  },
];

export const customAttUseRights = new ScheduleWidgetRightsCtrl(customAttUseRightsTitles);

///////////////////////////////

export const scheduleWidgetRegTypeTitles: ScheduleWidgetRightTexts<ScheduleWidgetRegType>[] = [
  {
    id: ScheduleWidgetRegType.Public,
    title: 'Публичное мероприятие',
    description: [
      'Мероприятие доступно всем',
      'Уполномоченные добавляют участников считыванием JesmyL-паспортов (QR-код)',
    ],
  },
  {
    id: ScheduleWidgetRegType.BeforeRegistration,
    title: 'Предварительная регистрация',
    description: ['Участники могут регистрироваться сами', 'Любой пользователь сможет иметь доступ к содержимому'],
  },
  {
    id: ScheduleWidgetRegType.HideContent,
    title: 'Скрывать содержимое',
    description: [
      'Для просмотра содержимого зарегистрированному участнику необходимо выдать соответствующие права',
      'Зарегистрированные участники могут сразу просматривать содержимое',
    ],
  },
];

export const scheduleWidgetRegTypeRights = new ScheduleWidgetRightsCtrl(scheduleWidgetRegTypeTitles);

export const packScheduleWidgetInviteLink = (schedulew: ScheduleWidgetWid, userMi: ScheduleWidgetUserMi) => {
  return md5(schedulew + ':' + userMi);
};
