import { backLocaleError, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
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
          if (cat.k !== CmCatKind.list) throw backLocaleError(BackLocaleKey.CmCatNotList);

          const stackSet = new Set(cat.s);

          if (stackSet.has(comw)) stackSet.delete(comw);
          else stackSet.add(comw);

          cat.s = Array.from(stackSet);

          return backLocaleError(
            cat.s?.includes(comw) ? BackLocaleKey.CmCatComAdded : BackLocaleKey.CmCatComRemoved,
            { c: cat.n, n: await getCmComNameInBrackets(comw) },
          );
        }),

        removeNativeComNum: modifyCat(async (cat, { comw }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          if (checkIsNil(cat.d)) return null;
          delete cat.d[comw];

          if (!objectLength(cat.d)) delete cat.d;

          return backLocaleError(BackLocaleKey.CmCatNativeNumRemoved, {
            c: cat.n,
            n: await getCmComNameInBrackets(comw),
          });
        }),

        setNativeComNum: modifyCat(async (cat, { comw, value }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          if (cat.k !== CmCatKind.dict) throw backLocaleError(BackLocaleKey.CmCatNotDict);

          cat.d = { ...cat.d, [comw]: value };

          return backLocaleError(BackLocaleKey.CmCatNativeNumSet, {
            c: cat.n,
            n: await getCmComNameInBrackets(comw),
            v: value,
          });
        }),

        create: async ({ n, k }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          const now = Date.now();
          const cat = { w: now as CmCatWid, m: now, n: parseCatName(n), k };

          await db.insert(catDB).values(cat);
          cmShareServerTsjrpcMethods.editedCat({ cat }, null);

          return { value: cat, description: backLocaleError(BackLocaleKey.CmCatCreated) };
        },

        rename: async ({ catw, n }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          const cat = await takeCatOrThrow(catw);

          cat.n = parseCatName(n);
          cat.m = Date.now();

          await dbUpdate(catDB, { m: cat.m, n: cat.n }, eq(catDB.w, cat.w));
          cmShareServerTsjrpcMethods.editedCat({ cat }, null);

          return { value: cat, description: backLocaleError(BackLocaleKey.CmCatRenamed) };
        },

        remove: async ({ catw }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          const cat = await takeCatOrThrow(catw);
          cat.isRemoved = Bool.True;
          cat.m = Date.now();

          await dbUpdate(catDB, { m: cat.m, isRemoved: cat.isRemoved }, eq(catDB.w, cat.w));
          cmShareServerTsjrpcMethods.editedCat({ cat }, null);

          return { value: cat, description: backLocaleError(BackLocaleKey.CmCatRemoved) };
        },

        restore: async ({ catw }, { auth }) => {
          if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'CAT', 'U')) throw '';

          const cat = await takeCatOrThrow(catw);

          if (!cat.isRemoved) throw backLocaleError(BackLocaleKey.CmCatNotRemoved, { n: cat.n });

          cat.isRemoved = Bool.False;
          cat.m = Date.now();

          await dbUpdate(catDB, { m: cat.m, isRemoved: cat.isRemoved }, eq(catDB.w, cat.w));
          cmShareServerTsjrpcMethods.editedCat({ cat }, null);

          return { value: cat, description: backLocaleError(BackLocaleKey.CmCatRestored) };
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

          if (cat.s?.length || objectLength(cat.d)) throw backLocaleError(BackLocaleKey.CmCatKindLocked, { n: cat.n });

          cat.k = k;
          cat.m = Date.now();

          await dbUpdate(catDB, { m: cat.m, k: cat.k }, eq(catDB.w, cat.w));
          cmShareServerTsjrpcMethods.editedCat({ cat }, null);

          return { value: cat, description: backLocaleError(BackLocaleKey.CmCatKindSet) };
        },
      },
    });
  }
})();

const parseCatName = (n: string) => {
  const name = n.trim();

  if (!name) throw backLocaleError(BackLocaleKey.CmCatNameEmpty);
  if (name.length > 256) throw backLocaleError(BackLocaleKey.CmCatNameTooLong);

  return name;
};

const takeCatOrThrow = async (catw: CmCatWid) => {
  const [row] = await db.select().from(catDB).where(eq(catDB.w, catw)).limit(1);

  if (!row) throw backLocaleError(BackLocaleKey.CmCatNotFound);

  return exportableCatFromRow(row);
};

const getCmComNameInBrackets = async (comw: CmComWid) => {
  const com = await takeComwTiny({ w: comw }, false);
  return com ? `${com.i + 1}. "${com.n}"` : translateBackTexts(null, BackLocaleKey.CmComUnknown);
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
