import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { catDB } from 'back/drizzle.schema';
import { db, dbUpdate } from 'back/drizzle/drizzle.db';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { eq } from 'drizzle-orm';
import { CmCatKind, CmCatWid, CmComWid, IExportableCat } from 'shared/api';
import { CmEditCatTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-cat.tsjrpc.model';
import { Bool } from 'shared/enums';
import { checkIsNil } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';
import { exportableCatFromRow } from './cat.db';
import { takeComwTiny } from './com.tiny';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmEditCatServerTsjrpcBase = new (class CmEditCat extends TsjrpcBaseServer<CmEditCatTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmEditCat',
      methods: {
        toggleComExistence: modifyCat(async (cat, { comw }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';
          if (cat.k !== CmCatKind.list) throw 'Категория не является списком';

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

          if (cat.k !== CmCatKind.dict) throw 'Категория не является сборником';

          cat.d = { ...cat.d, [comw]: value };

          return `Для категории "${cat.n}" номер песни ${await getCmComNameInBrackets(comw)} установлен в значение ${value}`;
        }),

        create: async ({ n, k }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          const now = Date.now();
          const cat = { w: now as CmCatWid, m: now, n: parseCatName(n), k };

          await db.insert(catDB).values(cat);
          cmShareServerTsjrpcMethods.editedCat({ cat }, null);

          return { value: cat, description: 'Создана категория' };
        },

        rename: async ({ catw, n }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          const cat = await takeCatOrThrow(catw);

          cat.n = parseCatName(n);
          cat.m = Date.now();

          await dbUpdate(catDB, { m: cat.m, n: cat.n }, eq(catDB.w, cat.w));
          cmShareServerTsjrpcMethods.editedCat({ cat }, null);

          return { value: cat, description: 'Переименована категория' };
        },

        remove: async ({ catw }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          const cat = await takeCatOrThrow(catw);
          cat.isRemoved = Bool.True;
          cat.m = Date.now();

          await dbUpdate(catDB, { m: cat.m, isRemoved: cat.isRemoved }, eq(catDB.w, cat.w));
          cmShareServerTsjrpcMethods.editedCat({ cat }, null);

          return { value: cat, description: 'Удалена категория' };
        },

        restore: async ({ catw }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          const cat = await takeCatOrThrow(catw);

          if (!cat.isRemoved) throw `Категория "${cat.n}" не была удалена`;

          cat.isRemoved = Bool.False;
          cat.m = Date.now();

          await dbUpdate(catDB, { m: cat.m, isRemoved: cat.isRemoved }, eq(catDB.w, cat.w));
          cmShareServerTsjrpcMethods.editedCat({ cat }, null);

          return { value: cat, description: 'Восстановлена категория' };
        },

        takeRemovedCats: async (_, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          return {
            value: (await db.select().from(catDB).where(eq(catDB.isRemoved, Bool.True))).map(exportableCatFromRow),
          };
        },

        setKind: async ({ catw, k }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          const cat = await takeCatOrThrow(catw);

          if (cat.s?.length || objectLength(cat.d)) throw `Вид категории "${cat.n}" нельзя изменить: в ней есть песни`;

          cat.k = k;
          cat.m = Date.now();

          await dbUpdate(catDB, { m: cat.m, k: cat.k }, eq(catDB.w, cat.w));
          cmShareServerTsjrpcMethods.editedCat({ cat }, null);

          return { value: cat, description: 'Изменён вид категории' };
        },
      },
    });
  }
})();

const parseCatName = (n: string) => {
  const name = n.trim();

  if (!name) throw new Error('Название категории не может быть пустым');
  if (name.length > 256) throw new Error('Название категории слишком длинное');

  return name;
};

const takeCatOrThrow = async (catw: CmCatWid) => {
  const [row] = await db.select().from(catDB).where(eq(catDB.w, catw)).limit(1);

  if (!row) throw new Error('Cat is not found');

  return exportableCatFromRow(row);
};

const getCmComNameInBrackets = async (comw: CmComWid) => {
  const com = await takeComwTiny({ w: comw }, false);
  return com ? `${com.i + 1}. "${com.n}"` : '[Неизвестная песня]';
};

function modifyCat<Props extends { catw: CmCatWid }, Tools>(
  modifier: (cat: IExportableCat, props: Props, tools: Tools) => PromiseOr<string | null>,
) {
  return async (props: Props, tools: Tools) => {
    const cat = await takeCatOrThrow(props.catw);
    const description = await modifier(cat, props, tools);

    cat.m = Date.now();
    await dbUpdate(catDB, { m: cat.m, s: cat.s, d: cat.d }, eq(catDB.w, cat.w));
    cmShareServerTsjrpcMethods.editedCat({ cat }, null);

    return { value: cat, description };
  };
}
