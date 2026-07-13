/* eslint-disable @typescript-eslint/no-explicit-any */
import { eq } from 'drizzle-orm';
import { PgSelectBase, SelectedFields } from 'drizzle-orm/pg-core';
import { CmComCommentBlockDict, CmComWid, UserLogin } from 'shared/api';
import { checkIsNotUndefined } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';
import { db } from '../drizzle.db';
import { comDB, userDB } from '../schema';
import { user2ComDB } from '../schema/user2Com';
import { userExtDB } from '../schema/userExt';

export const upsertUser2ComProps = async (
  userLogin: UserLogin,
  comw: CmComWid,
  props: { comment?: (CmComCommentBlockDict | nil)[]; isFav?: boolean },
  isSetModifies?: boolean,
) => {
  return await db.transaction(async tx => {
    if (!objectLength(props)) return;

    const user = (await tx.select({ id: userDB.id }).from(userDB).where(eq(userDB.l, userLogin))).at(0);
    const com = (await tx.select({ id: comDB.id }).from(comDB).where(eq(comDB.w, comw))).at(0);

    if (!user || !com) return;

    const propsWithMod =
      checkIsNotUndefined(props.comment) && isSetModifies ? { ...props, commentMod: Date.now() } : props;

    const propsUpset = await tx
      .insert(user2ComDB)
      .values({
        userId: user.id,
        comId: com.id,
        ...propsWithMod,
      })
      .onConflictDoUpdate({
        target: [user2ComDB.userId, user2ComDB.comId],
        set: propsWithMod,
      })
      .returning({ userId: user2ComDB.userId });

    if (checkIsNotUndefined(props.isFav) && isSetModifies) {
      const favMod = { cmFavComMod: Date.now() };

      await tx
        .insert(userExtDB)
        .values({
          userId: user.id,
          ...favMod,
        })
        .onConflictDoUpdate({
          target: userExtDB.userId,
          set: favMod,
        });
    }

    return propsUpset.at(0);
  });
};

export const selectUser2Com = <const Sel extends SelectedFields, Ret extends PgSelectBase<any, Sel, 'multiple', any>>(
  sel: Sel,
) =>
  (db.select(sel).from(user2ComDB).leftJoin(userDB, eq(user2ComDB.userId, userDB.id)) as any)
    .leftJoin(userExtDB, eq(user2ComDB.userId, userExtDB.userId))
    .leftJoin(comDB, eq(user2ComDB.comId, comDB.id)) as unknown as Ret;
