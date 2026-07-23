import { Langi } from 'shared/api';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';

export const localeDynamicRu: LocaleDynamic<Langi.Ru> = {
  lng: Langi.Ru,

  cm: {
    com: {
      kind: {
        [CmComBlockKindKey.Enter]: 'Вступление',
        [CmComBlockKindKey.OneWithShift]: 'Куплет',
        [CmComBlockKindKey.One]: 'Куплет',
        [CmComBlockKindKey.PTwo]: 'Предприпев',
        [CmComBlockKindKey.Two]: 'Припев',
        [CmComBlockKindKey.Bridge]: 'Мост',
        [CmComBlockKindKey.Play]: 'Проигрыш',
        [CmComBlockKindKey.Modulation]: 'Модуляция',
        [CmComBlockKindKey.Final]: 'Финал',
        [CmComBlockKindKey.Thirdo]: 'Запев',
        [CmComBlockKindKey.Insert]: 'Вставка',
        [CmComBlockKindKey.Plus]: ':ПРОДОЛЖЕНИЕ:',
        [CmComBlockKindKey.PlusPlus]: ':ПРОДОЛЖЕНИЕ С ОТСТУПОМ:',
        [CmComBlockKindKey.Shift]: ':ПРОДОЛЖЕНИЕ СО СМЕЩЕНИЕМ:',
        [CmComBlockKindKey.PlusPlusShift]: ':ПРОДОЛЖЕНИЕ СО СМЕЩЕНИЕМ И ОТСТУПОМ:',
      },
    },
  },
};
