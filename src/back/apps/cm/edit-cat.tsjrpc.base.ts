import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmCatWid, IExportableCat } from 'shared/api';
import { CmEditCatTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-cat.tsjrpc.model';
import { getCmComNameInBrackets } from './edit-com.tsjrpc.base';
import { catsFileStore } from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmEditCatServerTsjrpcBase = new (class CmEditCat extends TsjrpcBaseServer<CmEditCatTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCat',
      methods: {
        rename: modifyCat((cat, { name }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'CAT', 'U')) throw '';

          const prevName = cat.n;
          cat.n = name;

          return `Категория "${prevName}" переименована на "${cat.n}"`;
        }),
        setKind: modifyCat((cat, { kind }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'CAT', 'U')) throw '';

          cat.k = kind;

          return `Тип категории "${cat.n}" - ${kind}`;
        }),
        clearStack: modifyCat((cat, _, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'CAT', 'U')) throw '';
          delete cat.s;

          return `Список песен, принадлежащих категории "${cat.n}", очищен`;
        }),

        toggleComExistence: modifyCat((cat, { comw }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'CAT', 'U')) throw '';

          const stackSet = new Set(cat.s);

          if (stackSet.has(comw)) stackSet.delete(comw);
          else stackSet.add(comw);

          cat.s = Array.from(stackSet);

          return `Категория "${cat.n}": ${cat.s?.includes(comw) ? 'добавлена' : 'удалена'} песня ${getCmComNameInBrackets(
            comw,
          )}`;
        }),

        removeNativeComNum: modifyCat((cat, { comw }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'CAT', 'U')) throw '';

          if (cat.d == null) return null;
          delete cat.d[comw];

          return `Из сборника "${cat.n}" удалён номер песни ${getCmComNameInBrackets(comw)}`;
        }),

        setNativeComNum: modifyCat((cat, { comw, value }, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'CAT', 'U')) throw '';

          cat.d = { ...cat.d, [comw]: value };

          return `Для категории "${cat.n}" номер песни ${getCmComNameInBrackets(comw)} установлен в значение ${value}`;
        }),

        remove: modifyCat((cat, _, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'CAT', 'D')) throw '';

          cat.isRemoved = 1;

          return `Категория "${cat.n}" удалена`;
        }),
        bringBackToLife: modifyCat((cat, _, { auth }) => {
          if (throwIfNoUserScopeAccessRight(auth?.login, 'cm', 'CAT', 'D')) throw '';

          delete cat.isRemoved;

          return `Удалённая категория "${cat.n}" восстановлена`;
        }),
      },
    });
  }
})();

function modifyCat<Props extends { catw: CmCatWid }, Tools>(
  modifier: (cat: IExportableCat, props: Props, tools: Tools) => string | null,
) {
  return async (props: Props, tools: Tools) => {
    const cat = catsFileStore.getValue().find(cat => cat.w === props.catw);

    if (cat == null) throw new Error('Cat is not found');

    const description = modifier(cat, props, tools);

    cat.m = Date.now();
    cmShareServerTsjrpcMethods.editedCat({ cat });

    return { value: cat, description };
  };
}
