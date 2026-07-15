/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeComwTiny } from 'back/apps/cm/com.tiny';
import { takeUserTiny } from 'back/apps/index/tinies/userTiny';
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
  props: { comment?: (CmComCommentBlockDict | nil)[] | nil; isFav?: boolean },
  isSetModifies = true,
) => {
  const user = await takeUserTiny({ l: userLogin }, false);
  const com = await takeComwTiny({ w: comw }, false);

  if (!user || !com) return;

  return await db.transaction(async tx => {
    if (!objectLength(props)) return;

    const propsWithMod =
      checkIsNotUndefined(props.comment) && isSetModifies ? { ...props, commentMod: Date.now() } : props;
    let cmFavComMod = 0;

    if (checkIsNotUndefined(props.isFav) && isSetModifies) {
      cmFavComMod = Date.now();

      await tx
        .insert(userExtDB)
        .values({
          userId: user.id,
          cmFavComMod,
        })
        .onConflictDoUpdate({
          target: userExtDB.userId,
          set: { cmFavComMod },
        });
    }

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

    return { ...propsUpset.at(0), cmFavComMod };
  });
};

export const selectUser2Com = <const Sel extends SelectedFields, Ret extends PgSelectBase<any, Sel, 'multiple', any>>(
  sel: Sel,
) =>
  (db.select(sel).from(user2ComDB).leftJoin(userDB, eq(user2ComDB.userId, userDB.id)) as any)
    .leftJoin(userExtDB, eq(user2ComDB.userId, userExtDB.userId))
    .leftJoin(comDB, eq(user2ComDB.comId, comDB.id)) as unknown as Ret;
