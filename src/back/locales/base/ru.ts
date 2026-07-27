import { BibleTranslateName, Langi } from 'shared/api';
import { LocaleBase } from 'shared/model/+locale/base';
import { IF, isUtil, STR } from 'shared/utils/stringTemplater';

export const localeBaseRu: LocaleBase<Langi.Ru> = {
  lng: Langi.Ru,
  v: 0,

  cm: {
    com: {
      forEachBlock: 'Для каждого блока "$n;"',
      showPlayer: 'Показывать плеер',
      maxSel: `Можно выбрать максимум $s песен`,
    },
  },

  bible: {
    t: 'Библия',
    chapter: 'Глава',
    chapterNum: 'Глава $c;',
    searchInText: 'Поиск в тексте',
    searchInChapter: 'Поиск по главе',
    searchByLink: 'Поиск по ссылке',
    searchByBook: 'Поиск по книге <i>$b;</i>',
    searchByChapter: 'Поиск по главе <i>$b; $c;</i>',
    insertion: 'Вставка',
    txtInBrkts: 'Текст в [скобках]',
    JesusWords: 'Слова Христа',
    clearChapter: 'Очистить раздел $c;?',
    tr: 'Переводы Библии',
    loadedTr: 'Загруженные переводы',

    trs: {
      [BibleTranslateName.rst]: 'Русский Синодальный Перевод',
      [BibleTranslateName.kas]: 'Новый Завет. Перевод Кассиана (Безобразова)',
      [BibleTranslateName.kzb]: 'Казахский перевод',
      [BibleTranslateName.nrt]: 'Новый русский перевод',
    },
  },

  each0: 'каждое',
  each1: 'каждый',
  each2: 'каждая',
  each3: 'каждое',

  lasts: 'Последние',
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
  myFiles: 'Мои файлы',
  downloads: 'Загрузки',
  constants: 'Константы',

  oneForTwo: '$o для $t;',

  settings: 'Настройки',
  aboutApp: 'О приложении',
  otherApps: 'Другие программы',
  anims: 'Анимации',
  font: 'Шрифт',
  showErrors: 'Показать ошибки',
  chapterEmpty: 'Раздел пуст',
  actualVer: ' - Актуальная',
  newVer: ' (Новая - v$v;)',
  refreshAppConfirm: 'Убедитесь в наличии интернет-соединения! Обновить приложение?',
  immediateRefreshOnFinish:
    'Это действие требует немедленного обновления сразу после своего завершения. Убедитесь, пожалуйста, что у вас есть интернет-соединение, ибо, в противном случае, возникнет проблема',
  toAuth: 'Авторизоваться',
  authSuccess: `Успешная авторизация`,
  oneTimeCode: 'Одноразовый код',
  enterCode: 'ввести код',
  or: 'или',

  readQR: 'Читать QR',
  showMyQr: 'Показать мой QR',

  logout: 'Выйти из системы',
  link: 'Ссылка',
  txt: 'Текст',
  preview: 'Предпросмотр',
  slide: 'Слайд',
  setup: 'Настроить',

  history: 'История',
  plan: 'План',

  search: 'Поиск',
  globSearch: 'Глобальный поиск',
  broadcast: 'Трансляция',

  tg: {
    beInChannel: 'Состоять в канале',
    steps: 'Перейти в него\nНажать кнопку "Авторизоваться" в закрепе\nВвести код из личного сообщения от бота сюда:',
    startBot: 'Запустить бота',
    authNeeds: 'Для авторизации нужно',
  },

  email: {
    bindedToCurrentAuth: '$fio привязан к текущему аккаунту',
    toBind: 'Привязать E-mail',
    otpSent: 'Код отправлен на почту $e;',
  },

  fromOf: STR(['$f', '$o'])`${IF(isUtil.NEQ('$f', '$o')).THEN`$f из `}$o`,
};
