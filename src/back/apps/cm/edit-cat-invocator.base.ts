import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { CmCatWid, IExportableCat } from 'shared/api';
import { CmEditCatSokiInvocatorModel } from 'shared/api/invocators/cm/edit-cat-invocators.model';
import { getCmComNameInBrackets } from './edit-com-invocator.base';
import { catsFileStore } from './file-stores';
import { cmShareServerInvocatorMethods } from './invocator.shares';

export const cmEditCatServerInvocatorBase =
  new (class CmEditCat extends SokiInvocatorBaseServer<CmEditCatSokiInvocatorModel> {
    constructor() {
      super({
        scope: 'CmEditCat',
        defaultBeforeEachTool: { minLevel: 50 },
        methods: {
          rename: ({ catw, name }) => this.modifyCat(catw, cat => (cat.n = name)),
          setKind: ({ catw, kind }) => this.modifyCat(catw, cat => (cat.k = kind)),
          clearStack: ({ catw }) => this.modifyCat(catw, cat => delete cat.s),

          toggleComExistence: ({ comw, catw }) =>
            this.modifyCat(catw, cat => {
              const stackSet = new Set(cat.s);

              if (stackSet.has(comw)) stackSet.delete(comw);
              else stackSet.add(comw);

              cat.s = Array.from(stackSet);
            }),

          removeNativeComNum: ({ comw, catw }) =>
            this.modifyCat(catw, cat => {
              if (cat.d == null) return;
              delete cat.d[comw];
            }),

          setNativeComNum: ({ comw, catw, value }) =>
            this.modifyCat(catw, cat => (cat.d = { ...cat.d, [comw]: value })),

          remove: ({ catw }) => this.modifyCat(catw, cat => (cat.isRemoved = 1)),
          bringBackToLife: ({ catw }) => this.modifyCat(catw, cat => delete cat.isRemoved),
        },
        onEachFeedback: {
          rename: (_, cat) => `Категория "${cat.n}" переименована`,
          setKind: ({ kind }, cat) => `Тип категории "${cat.n}" - ${kind}`,
          clearStack: (_, cat) => `Список песен, принадлежащих категории "${cat.n}", очищен`,

          removeNativeComNum: ({ comw }, cat) =>
            `Из сборника "${cat.n}" удалён номер песни ${getCmComNameInBrackets(comw)}`,

          setNativeComNum: ({ comw, value }, cat) =>
            `Для категории "${cat.n}" номер песни ${getCmComNameInBrackets(comw)} установлен в значение ${value}`,

          toggleComExistence: ({ comw }, cat) =>
            `Категория "${cat.n}": ${cat.s?.includes(comw) ? 'добавлена' : 'удалена'} песня ${getCmComNameInBrackets(
              comw,
            )}`,

          remove: (_, cat) => `Категория "${cat.n}" удалена`,
          bringBackToLife: (_, cat) => `Удалённая категория "${cat.n}" восстановлена`,
        },
      });
    }

    private modifyCat = async (catw: CmCatWid, modifier: (cat: IExportableCat) => void) => {
      const cat = catsFileStore.getValue().find(cat => cat.w === catw);

      if (cat == null) throw new Error('Cat is not found');

      modifier(cat);
      cat.m = Date.now();
      cmShareServerInvocatorMethods.editedCat({ cat });

      return cat;
    };
  })();
