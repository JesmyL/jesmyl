import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';
import { translateDynamicUnion } from 'shared/utils/locale/dynamic';
import { CmComBlockKindKey, IExportableKindProp } from './BlockKind.model';

// Возвращает функцию тегов вида блока: объединяет теги из словарей всех языков,
// потому что теги — это содержимое песен, а не переводимые тексты интерфейса.
const makeTags = (key: CmComBlockKindKey) => (): string[] =>
  translateDynamicUnion(it => it[DynLocaleKey.CmComKindTags]?.[key] ?? []);

export const comBlockKindsConfig = [
  {
    key: CmComBlockKindKey.Enter,
    each: BaseLocaleKey.Each0,
    tags: makeTags(CmComBlockKindKey.Enter),
    forChordedBlock: 1,
  },
  {
    key: CmComBlockKindKey.OneWithShift,
    each: BaseLocaleKey.Each1,
    group: 1,
    isBlockForTextableOnly: true,
  },
  {
    key: CmComBlockKindKey.One,
    each: BaseLocaleKey.Each1,
    tags: makeTags(CmComBlockKindKey.One),
    group: 1,
    isBlockForTextableOnly: true,
  },
  {
    key: CmComBlockKindKey.PTwo,
    each: BaseLocaleKey.Each1,
    tags: makeTags(CmComBlockKindKey.PTwo),
    isBlockForTextableOnly: true,
  },
  {
    key: CmComBlockKindKey.Two,
    each: BaseLocaleKey.Each1,
    tags: makeTags(CmComBlockKindKey.Two),
    group: 2,
    isBlockForTextableOnly: true,
  },
  {
    key: CmComBlockKindKey.Bridge,
    each: BaseLocaleKey.Each1,
    tags: makeTags(CmComBlockKindKey.Bridge),
    group: 3,
    isBlockForTextableOnly: true,
  },
  {
    key: CmComBlockKindKey.Play,
    each: BaseLocaleKey.Each1,
    tags: makeTags(CmComBlockKindKey.Play),
    forChordedBlock: 2,
    isBlockForChordedOnly: true,
  },
  {
    key: CmComBlockKindKey.Modulation,
    each: BaseLocaleKey.Each2,
    tags: makeTags(CmComBlockKindKey.Modulation),
    isModulation: true,
  },
  {
    key: CmComBlockKindKey.Final,
    each: BaseLocaleKey.Each1,
    tags: makeTags(CmComBlockKindKey.Final),
  },
  {
    key: CmComBlockKindKey.Thirdo,
    each: BaseLocaleKey.Each1,
    tags: makeTags(CmComBlockKindKey.Thirdo),
    group: 4,
    isBlockForTextableOnly: true,
  },
  {
    key: CmComBlockKindKey.Insert,
    each: BaseLocaleKey.Each2,
    tags: makeTags(CmComBlockKindKey.Insert),
  },
  {
    key: CmComBlockKindKey.Plus,
    each: BaseLocaleKey.Each3,
    alt: '+',
    isInherit: true,
    isHeaderNoneForce: true,
    isBlockForTextableOnly: true,
  },
  {
    key: CmComBlockKindKey.PlusPlus,
    each: BaseLocaleKey.Each3,
    alt: '++',
    isInherit: true,
    isBlockForTextableOnly: true,
  },
  {
    key: CmComBlockKindKey.Shift,
    each: BaseLocaleKey.Each3,
    alt: '+>',
    isInherit: true,
    isBlockForTextableOnly: true,
  },
  {
    key: CmComBlockKindKey.PlusPlusShift,
    each: BaseLocaleKey.Each3,
    alt: '++>',
    isInherit: true,
    isBlockForTextableOnly: true,
  },
] satisfies IExportableKindProp[];
