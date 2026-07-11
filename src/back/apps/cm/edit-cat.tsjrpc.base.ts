import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmCatWid, CmComWid, IExportableCat } from 'shared/api';
import { CmEditCatTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-cat.tsjrpc.model';
import { checkIsNil } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';
import { takeComwTiny } from './com.tiny';
import { catsFileStorage } from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmEditCatServerTsjrpcBase = new (class CmEditCat extends TsjrpcBaseServer<CmEditCatTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCat',
      methods: {
        toggleComExistence: modifyCat(async (cat, { comw }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';
          if (cat.k !== 'list') throw 'Категория не является списком';

          const stackSet = new Set(cat.s);

          if (stackSet.has(comw)) stackSet.delete(comw);
          else stackSet.add(comw);

          cat.s = Array.from(stackSet);

          return `Категория "${cat.n}": ${cat.s?.includes(comw) ? 'добавлена' : 'удалена'} песня ${await getCmComNameInBrackets(
            comw,
          )}`;
        }),

        removeNativeComNum: modifyCat(async (cat, { comw }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          if (checkIsNil(cat.d)) return null;
          delete cat.d[comw];

          if (!objectLength(cat.d)) delete cat.d;

          return `Из сборника "${cat.n}" удалён номер песни ${await getCmComNameInBrackets(comw)}`;
        }),

        setNativeComNum: modifyCat(async (cat, { comw, value }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          if (cat.k !== 'dict') throw 'Категория не является сборником';

          cat.d = { ...cat.d, [comw]: value };

          return `Для категории "${cat.n}" номер песни ${await getCmComNameInBrackets(comw)} установлен в значение ${value}`;
        }),
      },
    });
  }
})();

const getCmComNameInBrackets = async (comw: CmComWid) => {
  const com = await takeComwTiny(comw);
  return com ? `${com.i + 1}. "${com.n}"` : '[Неизвестная песня]';
};

function modifyCat<Props extends { catw: CmCatWid }, Tools>(
  modifier: (cat: IExportableCat, props: Props, tools: Tools) => PromiseOr<string | null>,
) {
  return async (props: Props, tools: Tools) => {
    const cat = catsFileStorage.getValue().find(cat => cat.w === props.catw);

    if (cat == null) throw new Error('Cat is not found');

    const description = await modifier(cat, props, tools);

    cat.m = Date.now();
    cmShareServerTsjrpcMethods.editedCat({ cat }, null);
    catsFileStorage.saveValue();

    return { value: cat, description };
  };
}
