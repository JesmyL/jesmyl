import { Langi } from 'shared/api';
import { LocaleBase } from 'shared/model/+locale/base';

export const localeBaseRu: LocaleBase<Langi.Ru> = {
  lng: Langi.Ru,

  cm: {
    com: {
      tool: {
        redact: '?',
      },
      forEachBlock: 'Для каждого блока "$n;"',
      showPlayer: 'Показывать плеер',
    },
  },

  each0: 'каждое',
  each1: 'каждый',
  each2: 'каждая',
  each3: 'каждое',

  msg: 'Сообщение',
  authIncorrect: 'Авторизация не действительна',
  selProgram: 'Выберите программу',
  accessRights: 'Права доступа',
  inoe: 'Иное',
  name: 'Название',
  role: 'Роль',
  withoutRole: 'Без роли',
  enterRoleName: 'Введите название для роли',
  newRole: 'Новая роль',
  interactive: 'Взаимодействие',
  readQR: 'Читать QR',
  myFiles: 'Мои файлы',
  downloads: 'Загрузки',
  constants: 'Константы',

  jesmylForDesctop: '$j для $d;',
  emailBindedToCurrentAuth: '$fio привязан к текущему аккаунту',

  settings: 'Настройки',
  aboutApp: 'О приложении',
  otherApps: 'Другие программы',
  bindEmail: 'Привязать E-mail',
  anims: 'Анимации',
  font: 'Шрифт',
  showErrors: 'Показать ошибки',
  chapterEmpty: 'Раздел пуст',
  actualVer: ' - Актуальная',
  newVer: ' (Новая - v$v;)',
  refreshAppConfirm: 'Убедитесь в наличии интернет-соединения! Обновить приложение?',
  immediateRefreshOnFinish:
    'Это действие требует немедленного обновления сразу после своего завершения. Убедитесь, пожалуйста, что у вас есть интернет-соединение, ибо, в противном случае, возникнет проблема',
};
