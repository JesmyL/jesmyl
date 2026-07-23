import { Langi } from 'shared/api';
import { LocaleDynamic } from 'shared/model/+locale/dynamic';
import { CmComBlockKindKey } from 'shared/values/cm/block-kinds/BlockKind.model';

export const localeDynamicKz: LocaleDynamic<Langi.Kz> = {
  lng: Langi.Kz,

  cm: {
    com: {
      kind: {
        [CmComBlockKindKey.Enter]: 'Кіріспе',
        [CmComBlockKindKey.OneWithShift]: 'Шумақ',
        [CmComBlockKindKey.One]: 'Шумақ',
        [CmComBlockKindKey.PTwo]: 'Қайырма',
        [CmComBlockKindKey.Two]: 'Қайырма',
        [CmComBlockKindKey.Bridge]: 'Көпір',
        [CmComBlockKindKey.Play]: 'Жоғалту',
        [CmComBlockKindKey.Modulation]: 'Модуляция',
        [CmComBlockKindKey.Final]: 'Финал',
        [CmComBlockKindKey.Thirdo]: 'Кіріспе шумақ',
        [CmComBlockKindKey.Insert]: 'Енгізу',
        [CmComBlockKindKey.Plus]: ':ЖАЛҒАСЫ:',
        [CmComBlockKindKey.PlusPlus]: ':ШЕГІНІСПЕН БЕРІЛГЕН ЖАЛҒАСЫ:',
        [CmComBlockKindKey.Shift]: ':ЫҒЫСУМЕН ЖАЛҒАСТЫРУ:',
        [CmComBlockKindKey.PlusPlusShift]: ':ЫҒЫСУМЕН ЖӘНЕ ШЕГІНІСПЕН ЖАЛҒАСТЫРУ:',
      },
    },
  },
};
