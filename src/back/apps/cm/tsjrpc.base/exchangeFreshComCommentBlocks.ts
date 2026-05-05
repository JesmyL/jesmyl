import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  CmComCommentBlockAnySelector,
  CmComCommentBlockDict,
  CmComCommentBlockSpecialSelector,
  ICmComCommentBlock,
} from 'shared/api';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { retUnd, SMyLib, smylib } from 'shared/utils';
import { comCommentsDirStore } from '../file-stores';
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';

export const cmServerTsjrpcBaseExchangeFreshComCommentBlocks = {
  exchangeFreshComCommentBlocks: async ({ modifiedComments, clientDateNow }, { auth }) => {
    if (auth?.login == null) throw new Error('Не авторизован');

    const withClientTimeDelta = Date.now() - clientDateNow;

    const commentsHolder = await comCommentsDirStore.getOrCreateItem(auth.login, null, auth.login);
    commentsHolder.fio = auth.fio;
    const userServerComments = commentsHolder.b;

    let localSavedCommentsMaxModifiedAt = 0;
    const freshComments: ICmComCommentBlock[] = [];
    const resultComments: ICmComCommentBlock[] = [];

    modifiedComments.forEach(({ comw, m, dl }) => {
      const commentModifiedAt = m + withClientTimeDelta;

      if (userServerComments[comw] != null && commentModifiedAt < userServerComments[comw].m) {
        resultComments.push({ ...userServerComments[comw], comw });
        return;
      }

      const checkKindsFull = (commentBlockDict: CmComCommentBlockDict) => {
        const altKindsDict = commentBlockDict[CmComCommentBlockSpecialSelector.Kinds];
        if (altKindsDict == null) return commentBlockDict;

        smylib.keys(altKindsDict).forEach(key => {
          if (!altKindsDict[key]) delete altKindsDict[key];
        });

        if (!smylib.keys(altKindsDict).length) {
          delete commentBlockDict[CmComCommentBlockSpecialSelector.Kinds];
        }

        return commentBlockDict;
      };

      const checkSimpleFull = (
        key: keyof CmComCommentBlockDict,
        block: CmComCommentBlockDict[CmComCommentBlockAnySelector],
        userServerCommentDict: CmComCommentBlockDict | nil,
      ) => {
        if (block == null) return;

        if (smylib.isArr(block)) {
          for (let blocki = block.length - 1; blocki >= 0; blocki--) {
            if (block[blocki]) break;
            block.splice(-1);
          }

          if (!block.length && userServerCommentDict) delete userServerCommentDict[key];
        } else {
          smylib.keys(block).forEach(key => {
            if (!block[key]) delete block[key];
          });
        }
      };

      const comServerCommentDicts = userServerComments[comw]?.dl ?? [];
      const modeifiedComCommentDicts = dl ?? [];

      const resultDictList = Array.from(
        { length: Math.max(modeifiedComCommentDicts.length, comServerCommentDicts.length) },
        retUnd,
      ).map((_, i) => {
        const dict = checkKindsFull({
          ...comServerCommentDicts[i],
          ...modeifiedComCommentDicts[i],
          [CmComCommentBlockSpecialSelector.Kinds]: {
            ...comServerCommentDicts[i]?.[CmComCommentBlockSpecialSelector.Kinds],
            ...modeifiedComCommentDicts[i]?.[CmComCommentBlockSpecialSelector.Kinds],
          },
        });

        SMyLib.entries(dict).forEach(([key, block]) => {
          if (key === CmComCommentBlockSpecialSelector.Kinds || !block) return;
          checkSimpleFull(key, block, dict);
        });

        return dict;
      });

      for (let resultDictListi = resultDictList.length - 1; resultDictListi > -1; resultDictListi--)
        if (!smylib.keys(resultDictList[resultDictListi]).length) resultDictList.pop();
        else break;

      userServerComments[comw] = {
        ...userServerComments[comw],
        m: commentModifiedAt,
        dl: resultDictList.length ? resultDictList : undefined,
      };

      const block: ICmComCommentBlock = { ...userServerComments[comw], comw };
      resultComments.push(block);
      freshComments.push(block);
      localSavedCommentsMaxModifiedAt = Math.max(localSavedCommentsMaxModifiedAt, commentModifiedAt);
    });

    if (localSavedCommentsMaxModifiedAt) {
      comCommentsDirStore.saveItem(auth.login);

      cmShareServerTsjrpcMethods.refreshComComments(
        { comments: freshComments, mod: localSavedCommentsMaxModifiedAt, alts: commentsHolder.alts },
        { login: auth.login },
      );
    }

    return { value: resultComments };
  },
} satisfies Partial<ConstructorParameters<typeof TsjrpcBaseServer<CmTsjrpcModel>>[0]['methods']>;
