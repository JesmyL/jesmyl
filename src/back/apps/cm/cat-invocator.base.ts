import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { CmCatWid, IExportableCat } from 'shared/api';
import { CmCatSokiInvocatorMethods } from 'shared/api/invocators/cm/cat-invocators.model';
import { getCmComNameInBrackets } from './com-invocator.base';
import { catsFileStore } from './fresh-invocator.base';
import { cmServerInvocatorShareMethods } from './invocator.shares';

class CmCatSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmCatSokiInvocatorMethods> {
  constructor() {
    super(
      'CmCatSokiInvocatorBaseServer',
      {
        rename: () => (catw, name) => this.modifyCat(catw, cat => (cat.n = name)),
        setKind: () => (catw, kind) => this.modifyCat(catw, cat => (cat.k = kind)),
        clearStack: () => catw => this.modifyCat(catw, cat => delete cat.s),

        toggleComExistence: () => (comw, catw) =>
          this.modifyCat(catw, cat => {
            const stackSet = new Set(cat.s);

            if (stackSet.has(comw)) stackSet.delete(comw);
            else stackSet.add(comw);

            cat.s = Array.from(stackSet);
          }),

        removeNativeComNum: () => (comw, catw) =>
          this.modifyCat(catw, cat => {
            if (cat.d == null) return;
            delete cat.d[comw];
          }),

        setNativeComNum: () => (comw, catw, value) =>
          this.modifyCat(catw, cat => (cat.d = { ...cat.d, [comw]: value })),

        remove: () => catw => this.modifyCat(catw, cat => (cat.isRemoved = 1)),
        bringBackToLife: () => catw => this.modifyCat(catw, cat => delete cat.isRemoved),
      },
      {
        rename: cat => `Категория "${cat.n}" переименована`,
        setKind: (cat, kind) => `Тип категории "${cat.n}" - ${kind}`,
        clearStack: cat => `Список песен, принадлежащих категории "${cat.n}", очищен`,

        removeNativeComNum: (cat, comw) => `Из сборника "${cat.n}" удалён номер песни ${getCmComNameInBrackets(comw)}`,

        setNativeComNum: (cat, comw, _catw, value) =>
          `Для категории "${cat.n}" номер песни ${getCmComNameInBrackets(comw)} установлен в значение ${value}`,

        toggleComExistence: (cat, comw) =>
          `Категория "${cat.n}": ${cat.s?.includes(comw) ? 'добавлена' : 'удалена'} песня ${getCmComNameInBrackets(
            comw,
          )}`,

        remove: cat => `Категория "${cat.n}" удалена`,
        bringBackToLife: cat => `Удалённая категория "${cat.n}" восстановлена`,
      },
    );
  }

  private modifyCat = async (catw: CmCatWid, modifier: (cat: IExportableCat) => void) => {
    const cat = catsFileStore.getValue().find(cat => cat.w === catw);

    if (cat == null) throw new Error('Cat is not found');

    modifier(cat);
    cat.m = Date.now();
    cmServerInvocatorShareMethods.editedCat(null, cat);

    return cat;
  };
}

export const cmCatServerInvocatorBase = new CmCatSokiInvocatorBaseServer();
