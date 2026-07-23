import { Langi } from 'shared/api';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';

export const localeDynamicUa: LocaleDynamic<Langi.Ua> = {
  lng: Langi.Ua,

  cm: {
    com: {
      kind: {
        [CmComBlockKindKey.Enter]: 'Вступ',
        [CmComBlockKindKey.OneWithShift]: 'Куплет',
        [CmComBlockKindKey.One]: 'Куплет',
        [CmComBlockKindKey.PTwo]: 'Передприспів',
        [CmComBlockKindKey.Two]: 'Приспів',
        [CmComBlockKindKey.Bridge]: 'Мост',
        [CmComBlockKindKey.Play]: 'Програш',
        [CmComBlockKindKey.Modulation]: 'Модуляція',
        [CmComBlockKindKey.Final]: 'Фінал',
        [CmComBlockKindKey.Thirdo]: 'Заспів',
        [CmComBlockKindKey.Insert]: 'Вставка',
        [CmComBlockKindKey.Plus]: ':ПРОДОВЖЕННЯ:',
        [CmComBlockKindKey.PlusPlus]: ':ПРОДОВЖЕННЯ З ВІДСТУПОМ:',
        [CmComBlockKindKey.Shift]: ':ПРОДОВЖЕННЯ З ЗМІЩЕННЯМ:',
        [CmComBlockKindKey.PlusPlusShift]: ':ПРОДОВЖЕННЯ З ЗМІЩЕННЯМ ТА ВІДСТУПОМ:',
      },
    },
  },
};
