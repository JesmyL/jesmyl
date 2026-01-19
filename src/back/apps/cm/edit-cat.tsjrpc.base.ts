import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmCatWid, CmComWid, IExportableCat, IExportableCom, IServerSideCom } from 'shared/api';
import { CmEditCatTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-cat.tsjrpc.model';
import { smylib } from 'shared/utils';
import { catsFileStore, comsDirStore } from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmEditCatServerTsjrpcBase = new (class CmEditCat extends TsjrpcBaseServer<CmEditCatTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCat',
      methods: {
        toggleComExistence: modifyCat((cat, { comw }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';
          if (cat.k !== 'list') throw 'Категория не является списком';

          const stackSet = new Set(cat.s);

          if (stackSet.has(comw)) stackSet.delete(comw);
          else stackSet.add(comw);

          cat.s = Array.from(stackSet);

          return `Категория "${cat.n}": ${cat.s?.includes(comw) ? 'добавлена' : 'удалена'} песня ${getCmComNameInBrackets(
            comw,
          )}`;
        }),

        removeNativeComNum: modifyCat((cat, { comw }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          if (cat.d == null) return null;
          delete cat.d[comw];

          if (!smylib.keys(cat.d).length) delete cat.d;

          return `Из сборника "${cat.n}" удалён номер песни ${getCmComNameInBrackets(comw)}`;
        }),

        setNativeComNum: modifyCat((cat, { comw, value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          if (cat.k !== 'dict') throw 'Категория не является сборником';

          cat.d = { ...cat.d, [comw]: value };

          return `Для категории "${cat.n}" номер песни ${getCmComNameInBrackets(comw)} установлен в значение ${value}`;
        }),
      },
    });
  }
})();

function getCmComNameInBrackets(comScalar: CmComWid | IServerSideCom | IExportableCom) {
  if (smylib.isNum(comScalar)) {
    const com = comsDirStore.getItem(comScalar);
    if (com == null) return '[Неизвестная песня]';
    return `"${com.n}"`;
  }

  return `"${comScalar.n}"`;
}

function modifyCat<Props extends { catw: CmCatWid }, Tools>(
  modifier: (cat: IExportableCat, props: Props, tools: Tools) => string | null,
) {
  return async (props: Props, tools: Tools) => {
    const cat = catsFileStore.getValue().find(cat => cat.w === props.catw);

    if (cat == null) throw new Error('Cat is not found');

    const description = modifier(cat, props, tools);

    cat.m = Date.now();
    cmShareServerTsjrpcMethods.editedCat({ cat }, null);

    return { value: cat, description };
  };
}
