import { takeUserTiny } from 'back/apps/index/tinies/userTiny';
import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { comDB, user2ComDB, userDB, userExtDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { selectUser2Com, upsertUser2ComProps } from 'back/drizzle/ex/user2Com.utils';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { and, eq } from 'drizzle-orm';
import { CmComCommentBlockDict, CmComCommentBlockSpecialSelector, ICmComCommentBlock } from 'shared/api';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { arrayByLength, objectLength } from 'shared/utils/object.utils';
import { removeEmptyRightValues } from 'shared/utils/removeEmptyRightValues';
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';

export const cmServerTsjrpcBaseExchangeFreshComCommentBlocks = {
  exchangeFreshComCommentBlocks: async ({ modifiedComments, clientDateNow }, { auth: userAuth }) => {
    const auth = takeLogginedAuthOrThrow(userAuth);
    const withClientTimeDelta = Date.now() - clientDateNow;

    let localSavedCommentsMaxModifiedAt = 0;
    const freshComments: ICmComCommentBlock[] = [];
    const resultComments: ICmComCommentBlock[] = [];

    for (const { comw, m, dl } of modifiedComments) {
      const commentModifiedAt = m + withClientTimeDelta;

      const serverCommentHolder = (
        await selectUser2Com({
          dl: user2ComDB.comment,
          mod: user2ComDB.commentMod,
        })
          .where(and(eq(userDB.l, auth.login), eq(comDB.w, comw)))
          .limit(1)
      ).at(0);

      if (serverCommentHolder?.mod && commentModifiedAt < serverCommentHolder.mod) {
        resultComments.push({ dl: serverCommentHolder.dl || undefined, m: serverCommentHolder.mod, comw });
        continue;
      }

      const comServerCommentDicts = serverCommentHolder?.dl ?? [];
      const modifiedComCommentDicts = dl ?? [];

      const resultDictList = arrayByLength(
        Math.max(objectLength(modifiedComCommentDicts), objectLength(comServerCommentDicts)),
        (i): CmComCommentBlockDict | nil => {
          const dict = {
            ...comServerCommentDicts[i],
            ...modifiedComCommentDicts[i],
            [CmComCommentBlockSpecialSelector.Kinds]: {
              ...comServerCommentDicts[i]?.[CmComCommentBlockSpecialSelector.Kinds],
              ...modifiedComCommentDicts[i]?.[CmComCommentBlockSpecialSelector.Kinds],
            },
          };

          removeEmptyRightValues(dict);

          return dict;
        },
      ).map(it => it || {});

      const isEmpty = removeEmptyRightValues(resultDictList);
      const comment = isEmpty ? undefined : resultDictList;

      const block: ICmComCommentBlock = { dl: comment, comw, m: commentModifiedAt };

      resultComments.push(block);
      freshComments.push(block);
      localSavedCommentsMaxModifiedAt = Math.max(localSavedCommentsMaxModifiedAt, commentModifiedAt);

      await upsertUser2ComProps(auth.login, comw, { comment: comment ?? null });
    }

    if (localSavedCommentsMaxModifiedAt) {
      const user = await takeUserTiny({ l: auth.login });

      const userExt = (
        await db
          .select({ alts: userExtDB.cmCommAlts })
          .from(userExtDB)
          .where(and(eq(userExtDB.userId, user.id)))
          .limit(1)
      ).at(0);

      cmShareServerTsjrpcMethods.refreshComComments(
        { comments: freshComments, mod: localSavedCommentsMaxModifiedAt, alts: userExt?.alts },
        { login: auth.login },
      );
    }

    return { value: resultComments };
  },
} satisfies ServerTsjrpcSatisfy<CmTsjrpcModel>;
