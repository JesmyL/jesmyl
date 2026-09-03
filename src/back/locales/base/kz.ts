import { BibleTranslateName, Langi, MenuComToolName } from 'shared/api';
import { LocaleBase } from 'shared/model/+locale/base';
import { GENERATE, IF, isUtil, STR, SWITCH } from 'shared/utils/stringTemplater';

export const localeBaseKz: LocaleBase<Langi.Kz> = {
  langi: Langi.Kz,
  v: 0,

  cm: {
    t: 'Қайта түлегендер әндері',

    com: {
      tool: {
        [MenuComToolName.MarkCom]: STR(['$v'])`${IF('$v').THEN`Таңдаулылардан өшіру`.ELSE`Таңдаулыларға қосу`}`,
        [MenuComToolName.SelectedToggle]: STR(['$v'])`${IF('$v').THEN`Таңдалғандардан алып тастау`.ELSE`Әнді таңдау`}`,
        [MenuComToolName.IsMiniAnchor]: STR(['$v'])`${IF('$v').THEN`Сілтемелерді ашу`.ELSE`Сілтемелерді жиру`}`,

        [MenuComToolName.FullscreenMode]: 'Толық экран',
        [MenuComToolName.ChordsVariant]: 'Аккордтарды көрсету',
        [MenuComToolName.ShowTranslation]: 'Слайдтар',
        [MenuComToolName.ChordImages]: 'Аккордтар аппликатурасы',
        [MenuComToolName.OpenPlayer]: 'Ойнатқыш',
        [MenuComToolName.HideMetronome]: 'Метроном',
        [MenuComToolName.QrShare]: 'QR арқылы бөлісу',
        [MenuComToolName.CatsBinds]: 'Жинақтарды көрсету',
        [MenuComToolName.ComComment]: 'Менің жазбаларым',
        [MenuComToolName.CopyCom]: 'Ән мәтінін көшіру',
        [MenuComToolName.ChordHardLevel]: 'Аккордтың қиындық деңгейі - $v',
        [MenuComToolName.EditCom]: 'Редакциялау',
      },

      showPlayer: 'Ойнатқышты көрсету',
      sharedListToYou: 'Сізбен тізім бөлісілді',
      addToSel: 'Таңдалғандарға қосу',
      dsc: 'Белгілі әндер тізімі',

      changeSel: 'Таңдалғандарды ауыстыру',

      forEachBlock: 'Әрбір "$n;" блогы үшін',
      maxSel: `Ең көбі $s ән таңдауға болады`,
      watcheds: 'Әндерді көру саны (жалпы $c;)',
      willAdd: `Қосылады: $c $declension{{$c}{ән}{ән}{ән}}`,
      willLost: `Жоғалады: $c $declension{{$c}{ән}{ән}{ән}}`,

      twiceClickPrev: 'екі рет басу&nbsp;-\nалдыңғы ән',
      twiceClickNx: 'екі рет басу&nbsp;-\nкелесі ән',

      clickNxSlide: 'басу&nbsp;-\nкелесі слайд',
      clickPrevSlide: 'басу&nbsp;-\nалдыңғы слайд',
      notFound: 'Ән табылмады',
      expandList: 'Тізімдегі әндерді ашу',
      showLiSlides: 'Тізім слайдтарын көрсету',
      shareLi: 'Тізіммен бөлісу',
      unk: 'Белгісіз ән',

      ton: 'Тональділік',
      addToolByClick: 'Жылдам мәзірге қосу үшін белгішені басыңыз',
      crossLinks: 'Байланысты әндер',
      addMod: STR(['$w', '$m'])`Қосылды: $w${IF(isUtil.NEQ('$w', '$m')).THEN`\nЖаңартылды: $m`}`,

      size: 'Өлшемділік',
      temp: 'Қарқындылық',

      // EDITOR:
      sqBrInTxtRep:
        '[Квадрат жақшадағы] мәтін слайдтарда көрсетілмейді, бірақ ән мәтінінде (дөңгелек жақшадағы мәтінге) айналады. Жолды ауыстыру үшін [[екі ашылатын жақшаны] пайдаланыңыз. "[" белгісінің алдында бос орын болуы керек, ал "]" белгісінен кейін ештеңе болмауы тиіс',
      rmTBlock: STR(['$t'])`${IF('$t').THEN`Блокты`.ELSE` Жаңа блокты`} өшіру керек пе?\n\n$t`,

      rms: 'Жойылған әндер',
      backup: 'Бұл әнді қалпына келтіру',
      destroy: 'Бұл әнді біржола жою',
      insPrevTxt: 'Алдыңғы мәтінді кірістіру',
      repTxt: 'Осы мәтінмен алмастыру',
      willClear: 'Жаңа блоктарды кірістіру кезінде тазартылады',
      rmAudios: 'Жойылған аудиолар',
      addAudio: 'Аудио қосу',
      cnfStrN: '$n беттің конфигі',
      clearDictNumN: '$n жинағынан нөмірді тазарту',
      insNwBlockAtX: STR(['$x'])`Жаңа блокты ${SWITCH('$x').CASE('b')`ең басына`.DEFAULT`осы жерге`} кірістіру`,

      new: {
        t: 'Жаңа ән',
        noParsedX: STR(['$x'])`Талданған ${SWITCH('$x')
          //
          .CASE('t')`мәтіндер`.CASE('c')`аккордтар`.CASE('o')`реттік блоктар`} жоқ`,
        noBindAudio: 'Тіркелген аудиолар жоқ',
        startWrite: 'Ән шығару үшін жаза бастаңыз немесе мәтінді кірістіріңіз',
        parseTxt: 'Мәтінді талдау',
        bindedAudio: 'Тіркелген аудиолар',
        noTracks: 'Тректер жоқ',
        newAudios: 'Жаңа аудиолар',
        pub: 'Әнді жариялау',
      },
      // :EDITOR
    },
    cat: {
      t: 'Санат',
      li: {
        all: 'Барлық әндер',
        child: 'Балаларға арналған',
        youth: 'Жастарға арналған',
        PesnVzr: 'Қайта өрлеу әні',
        RU: 'Орыс тіліндегі',
        UA: 'Украин тіліндегі',
        solo: 'Соло',
        Christmass: 'Рождествоға',
        Easter: 'Пасхаға',
        tooSlow: 'Өте баяу',
        slow: 'Баяу',
        middle: 'Орташа қарқынды',
        fast: 'Жылдам',
        tooFast: 'Өте жылдам',
      },
    },

    li: {
      all: 'Барлығы',
      li: 'Тізімдер',
      player: 'Ойнатқыш',
      admin: 'Админ',
    },

    comm: {
      N: `Пікір №$n`,
      areHidden: 'Пікірлер жасырылған',
      forLine: 'Жолға арналған пікір',

      wordLabel: STR(['$p'])`${SWITCH('$p').CASE('>')`кейін`.CASE('<')`дейін`.DEFAULT`түсі`} сөздің`,
      unreachs: 'Қолжетімсіз пікірлер',
      base: 'База',
      addedMaxAlts: 'Баламалардың максималды саны қосылды',
      addAlt: 'Жаңа балама қосу',
      soLongName: `Атауы тым ұзын ($l;+)`,
      freshPulled: 'Жаңа пікірлер тартылды',
      pull: 'Пікірлерді тарту',
    },

    trackMarksNotSetted: 'Бұл трек үшін маркерлер орнатылмаған',
    sel: 'Таңдалғандар',
    thematics: 'Тақырыптық',
    blocks: 'Блоктар',

    nxBlockConfig: 'Келесі блоктың конфигі',
    insertNxBlock: 'Келесі блоктың терезесін кірістіру',
    hideNxBlock: 'Келесі блоктың мәтінін алып тастау',

    chBlockConfig: 'Аккорд блогының конфигі',
    hideChBlock: 'Аккорд блогының конфигін алып тастау',
    insertChBlock: 'Аккорд блогының конфигін қосу',
    audioPlayErr: 'Аудионы ойнату қатесі',

    linnes: 'Жолдар',
    chBlocks: 'Аккорд блоктары',
    toShow: 'Көрсету',
    toPass: 'Өткізіп жіберу',
    toHide: 'Жасыру',
    emptySlide: 'Бос слайд',

    bro: {
      lineSep: 'Жолдарға бөлу',
      duo: 'Макс. екі',
      five: 'Макс. бес',
    },

    chN: 'Аккорд $n',
    chs: 'Аккордтар',
    comeBackCh: 'Аккордты қайтару',
    delCh: 'Аккордты өшіру',
    chExists: 'Мұндай аккорд бар',
    incCh: 'Аккордтың жазылуы қате',
    creNxChRule: 'Келесі аккорд үшін ереже жасау',
    unkCh: 'Белгісіз аккорд',
    selChEdit: 'Редакциялау үшін аккордты таңдаңыз',
    maxChCount: 'Аккордтардың maximalды саны',
    minChCount: 'Аккордтардың минималды саны бар мәтін',

    noChTxt: 'Аккордсыз мәтін',
    minChCountDsc:
      'Аккордтардың минималды саны режимінде олар алғаш рет кездесетін немесе өзгеретін (бірдей атаулылар үшін) блоктарда болады',

    toComList: 'Әндер тізіміне',
    coms: 'Әндер',
    showComms: 'Пікірлерді көрсету',
    unkChN: 'Белгісіз аккордтар ($n;)',
    noEditorsMore: 'Басқа редакциялаушылар жоқ',
    editsToo: STR(['$m', '$l'])`Сондай-ақ $l ${IF('$m').THEN`редакциялап жатыр`.ELSE`редакциялауда`}`,
    edits: '$f редакциялауда',
    comRemoved: 'Ән өшірілді',
    comeBack: 'Қалпына келтіру',

    ords: 'Реттік блоктар',
  },

  bible: {
    t: 'Киелі кітап',
    chapter: 'Тарау',
    searchInText: 'Мәтін бойынша іздеу',
    searchInChapter: 'Тарау бойынша іздеу',
    searchByLink: 'Сілтеме бойынша іздеу',
    insertion: 'Кірістіру',
    txtInBrkts: '[Жақшадағы] мәтін',
    JesusWords: 'Мәсіхтің сөздері',
    tr: 'Киелі кітап аудармалары',
    loadedTr: 'Жүктелген аудармалар',
    modulesForLoad: 'Жүктеуге қолжетімді',

    chapterNum: '$c-тарау',
    searchByBook: '<i>$b;</i> кітабы бойынша іздеу',
    searchByChapter: '<i>$b $c;</i> тарауы бойынша іздеу',
    clearChapter: '$c бөлімін тазалау керек пе?',
    removeModule: '"$n;" модулін біржола өшіру',

    trs: {
      [BibleTranslateName.rst]: 'Орыс Синодалды аудармасы',
      [BibleTranslateName.kas]: 'Жаңа Өсиет. Кассиан (Безобразов) аудармасы',
      [BibleTranslateName.kzb]: 'Қазақша аударма',
      [BibleTranslateName.nrt]: 'Жаңа орысша аударма',
    },
  },

  sch: {
    notFound: 'Кесте табылмады',
    evMod: `Жаңартылды: $m`,

    insWatchAtt: GENERATE<'s' | ''>()
      //
      .NEXT('')`Үлгі `
      //
      .NEXT('s')`$t`
      //
      .NEXT('')` - Шолу тіркемесін кірістіру`.toString(['$t']),
  },

  bro: {
    followInPhone: 'Экрандағы мәтіндерді өз телефоныңыздан бақылаңыз',
  },

  each0: 'әрбір',
  each1: 'әрбір',
  each2: 'әрбір',
  each3: 'әрбір',

  lasts: 'Соңғылар',
  msg: 'Хабарлама',
  authIncorrect: 'Авторизация жарамсыз',
  notAuthed: 'Авторизациядан өтпеген',
  selProgram: 'Бағдарламаны таңдаңыз',
  accessRights: 'Қолжетімділік құқықтары',
  inoe: 'Басқа',
  name: 'Атауы',
  role: 'Рөл',
  withoutRole: 'Рөлсіз',
  enterRoleName: 'Рөл үшін атау енгізіңіз',
  newRole: 'Жаңа рөл',
  interactive: 'Өзра әрекеттесу',
  control: 'Басқару',
  myFiles: 'Менің файлдарым',
  downloads: 'Жүктеулер',
  constants: 'Константалар',

  oneForTwo: '$t үшін $o',
  newVer: ' (Жаңа - v$v;)',

  settings: 'Баптаулар',
  aboutApp: 'Қосымша туралы',
  otherApps: 'Басқа бағдарламалар',
  anims: 'Анимациялар',
  font: 'Қаріп',
  showErrors: 'Қателерді көрсету',
  chapterEmpty: 'Бөлім бос',
  actualVer: ' - Өзекті',
  refreshAppConfirm: 'Интернет байланысы бар екеніне көз жеткізіңіз! Қосымшаны жаңарту керек пе?',
  immediateRefreshOnFinish:
    'Бұл әрекет арқылы сіз қолданбаның ішкі деректерін толығымен жоясыз - офлайн режим белгілі бір уақытқа қолжетімсіз болады, бұл әрекетті растау үшін енгізу өрісіне $c кодын енгізіңіз',
  incCode: 'Қате код',

  configs: 'Конфигтер',
  alert: 'Ескерту',
  slides: 'Слайдтар',

  toAuth: 'Авторизациядан өту',
  authSuccess: `Сәтті авторизация`,
  oneTimeCode: 'Бір реттік код',
  enterCode: 'кодты енгізу',
  or: 'немесе',

  readQR: 'QR оқу',
  showMyQr: 'Менің QR-кодымды көрсету',

  logout: 'Жүйеден шығу',
  link: 'Сілтеме',
  events: 'Оқиғалар',
  txt: 'Мәтін',
  preview: 'Алдын ала қарау',
  slide: 'Слайд',
  setup: 'Баптау',

  history: 'Тарих',
  plan: 'Жоспар',

  search: 'Іздеу',
  globSearch: 'Жаһандық іздеу',
  broadcast: 'Трансляция',

  tg: {
    beInChannel: 'Арнада болу',
    steps:
      'Оған өтіңіз\nБекітілген хабарламадағы "Авторизациядан өту" батырмасын басыңыз\nБоттың жеке хабарламасынан келген кодты мында енгізіңіз:',
    startBot: 'Ботты іске қосу',
    authNeeds: 'Авторизациядан өту үшін қажет',
  },

  email: {
    bindedToCurrentAuth: '$fio ағымдағы аккаунтқа байланыстырылған',
    otpSent: 'Код $e поштасына жіберілді',
    toBind: 'E-mail байланыстыру',
  },

  fromOf: STR(['$f', '$o'])`${IF(isUtil.NEQ('$f', '$o')).THEN`$o ішінен $f `}$o`,

  fav: 'Таңдаулылар',
  favNLim: `Лимит - $n таңдаулы`,

  sel: 'Таңдалғандар',
  clearSelList: 'Таңдалғандар тізімін тазалау',

  color: 'Түс',
  before: 'Дейін',
  instead: 'Орнына',
  after: 'Кейін',
  lists: 'Тізімдер',
  lineN: '$n-жол',
  word: 'Сөз',
  wordN: '$n-сөз',
  delX: '$x өшіру',
  del: 'Жою',
  txtBefore: 'Дейінгі мәтін',
  txtAfter: 'Кейінгі мәтін',
  close: 'Жабу',
  Nsec: '$n сек.',
  detailed: 'Толығырақ',
  fontSize: 'Қаріп өлшемі',
  lookedN: '$n рет қаралды',
  toAdd: 'Қосу',
  NDay: '$n-күн',
  savedLoc: 'Жергілікті сақталды',
  noChanges: 'Өзгерістер жоқ',
  toSendSmth: '$s жіберу',
  backToEdit: 'Редакциялауға қайта оралу',
  cre: 'Жасау',
  redact: 'Редакциялау',
  noAccess: 'Қолжетімділік жоқ',

  durationMin: 'Ұзақтығы, мин',
  min_minute: ' мин',
  incName: 'Қате атау',
  txts: 'Мәтіндер',
  send: 'Жіберу',
  manyStrs: 'Жолдар көп',
  emptyList: 'Тізім бос',
  maxStrsCount: 'Жолдардың максималды саны',
  fewStrs: 'Жолдар аз',
  dicts: 'Жинақтар',
  denied: 'Тыйым салынған',
  lang: 'Тіл',
  lookJSON: 'JSON көру',
  NSymbols: '$n $declension{{$n}{таңба}{таңба}{таңба}}',
};
