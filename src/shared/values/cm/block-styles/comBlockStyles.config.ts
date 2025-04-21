import { CmBlockStyleKey, IExportableStyleProp } from './BlockStyles.model';

export const comBlockStylesConfig: IExportableStyleProp[] = [
  {
    key: CmBlockStyleKey.Enter,
    title: ['Вступление', 'Вступ'],
    tags: ['вступление', 'вступ', 'интро', 'intro'],
    forChordedBlock: 1,
  },
  {
    key: CmBlockStyleKey.OneWithShift,
    title: ['Куплет', 'Куплет'],
    group: 1,
    isBlockForTextableOnly: true,
  },
  {
    key: CmBlockStyleKey.One,
    title: ['Куплет', 'Куплет'],
    tags: ['куплет', 'купліт', 'куплєт'],
    group: 1,
    isBlockForTextableOnly: true,
  },
  {
    key: CmBlockStyleKey.PTwo,
    title: ['Предприпев', 'Передприспів'],
    tags: ['предприпев', 'предприпів', 'передприпів', 'передприспів'],
    isBlockForTextableOnly: true,
  },
  {
    key: CmBlockStyleKey.Two,
    title: ['Припев', 'Приспів'],
    tags: ['припев', 'приспів', 'припів'],
    group: 2,
    isBlockForTextableOnly: true,
  },
  {
    key: CmBlockStyleKey.Bridge,
    title: ['Мост', 'Мост'],
    tags: ['мост', 'бридж', 'брідж', 'міст', 'bridge'],
    group: 3,
    isBlockForTextableOnly: true,
  },
  {
    key: CmBlockStyleKey.Play,
    title: ['Проигрыш', 'Програш'],
    tags: ['проигрыш', 'програш'],
    forChordedBlock: 2,
    isBlockForChordedOnly: true,
  },
  {
    key: CmBlockStyleKey.Modulation,
    title: ['Модуляция', 'Модуляція'],
    tags: ['модуляция', 'модуляція'],
    isModulation: true,
  },
  {
    key: CmBlockStyleKey.Final,
    title: ['Финал', 'Фінал'],
    tags: ['финал', 'фінал', 'фiнал', 'конец', 'концовка', 'кінець', 'final'],
  },
  {
    key: CmBlockStyleKey.Thirdo,
    title: ['Запев', 'Заспів'],
    tags: ['запев', 'заспів', 'запів'],
    group: 4,
    isBlockForTextableOnly: true,
  },
  {
    key: CmBlockStyleKey.Insert,
    title: ['Вставка', 'Вставка'],
    tags: ['вставка'],
  },
  {
    key: CmBlockStyleKey.Plus,
    title: [':ПРОДОЛЖЕНИЕ:', ':ПРОДОВЖЕННЯ:'],
    isInherit: true,
    isHeaderNoneForce: true,
    isBlockForTextableOnly: true,
  },
  {
    key: CmBlockStyleKey.PlusPlus,
    title: [':ПРОДОЛЖЕНИЕ С ОТСТУПОМ:', ':ПРОДОВЖЕННЯ З ВІДСТУПОМ:'],
    isInherit: true,
    isBlockForTextableOnly: true,
  },
  {
    key: CmBlockStyleKey.Shift,
    title: [':ПРОДОЛЖЕНИЕ СО СМЕЩЕНИЕМ:', ':ПРОДОВЖЕННЯ З ЗМІЩЕННЯМ:'],
    isInherit: true,
    isBlockForTextableOnly: true,
  },
  {
    key: CmBlockStyleKey.PlusPlusShift,
    title: [':ПРОДОЛЖЕНИЕ СО СМЕЩЕНИЕМ И ОТСТУПОМ:', ':ПРОДОВЖЕННЯ З ЗМІЩЕННЯМ ТА ВІДСТУПОМ:'],
    isInherit: true,
    isBlockForTextableOnly: true,
  },
];
