import { FileStore } from 'back/complect/FileStorage';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { CmCatWid, IExportableCat } from 'shared/api';
import { CmCatSokiInvocatorMethods } from 'shared/api/invocators/cm/cm-cat-invocators';
import { getCmComNameInBrackets } from './cm-com-invocator.base';
import { cmServerInvocatorMethods } from './cm-invocator';

const catsData = new FileStore<IExportableCat[]>('/apps/cm/cats.json', []);

class CmCatSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmCatSokiInvocatorMethods> {}

const modifyCat = (catw: CmCatWid, modifier: (cat: IExportableCat) => void) => {
  const cat = catsData.getValue().find(cat => cat.w === catw);

  if (cat == null) throw new Error('Cat is not found');

  modifier(cat);
  cat.m = Date.now();
  cmServerInvocatorMethods.editedCat(null, cat);

  return cat;
};

export const cmCatServerInvocatorBase = new CmCatSokiInvocatorBaseServer(
  'CmCatSokiInvocatorBaseServer',
  {
    toggleComExistence: () => async (comw, catw) => {
      return modifyCat(catw, cat => {
        const stackSet = new Set(cat.s);

        if (stackSet.has(comw)) stackSet.delete(comw);
        else stackSet.add(comw);

        cat.s = Array.from(stackSet);
      });
    },
    removeNativeComNum: () => async (comw, catw) => {
      return modifyCat(catw, cat => {
        if (cat.d == null) return;
        delete cat.d[comw];
      });
    },
    setNativeComNum: () => async (comw, catw, value) => {
      return modifyCat(catw, cat => (cat.d = { ...cat.d, [comw]: value }));
    },
  },
  {
    removeNativeComNum: (cat, comw) => `Из сборника "${cat.n}" удалён номер песни ${getCmComNameInBrackets(comw)}`,
    setNativeComNum: (cat, comw, _catw, value) =>
      `Для категории "${cat.n}" номер песни ${getCmComNameInBrackets(comw)} установлен в значение ${value}`,
    toggleComExistence: (cat, comw) =>
      `Категория "${cat.n}": ${cat.s?.includes(comw) ? 'добавлена' : 'удалена'} песня ${getCmComNameInBrackets(comw)}`,
  },
);
