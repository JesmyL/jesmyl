import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  CmComCommentBlockAnySelector,
  CmComCommentBlockDict,
  CmComCommentBlockSpecialSelector,
  ICmComCommentBlock,
} from 'shared/api';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { smylib, SMyLib } from 'shared/utils';
import { cmConstantsConfigFileStore, comCommentsDirStore } from '../file-stores';
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

    modifiedComments.forEach(({ d, comw, m, alt }) => {
      const commentModifiedAt = m + withClientTimeDelta;

      if (userServerComments[comw] != null && commentModifiedAt < userServerComments[comw].m) {
        resultComments.push({ ...userServerComments[comw], comw });
        return;
      }

      const checkKindsFull = (commentBlockDict: CmComCommentBlockDict | nil) => {
        if (commentBlockDict == null) return;

        const altKindsDict = commentBlockDict[CmComCommentBlockSpecialSelector.Kinds];
        if (altKindsDict == null) return;

        smylib.keys(altKindsDict).forEach(key => {
          if (!altKindsDict[key]) delete altKindsDict[key];
        });

        if (!smylib.keys(altKindsDict).length) {
          delete commentBlockDict[CmComCommentBlockSpecialSelector.Kinds];
        }
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

      const newCommentDict: CmComCommentBlockDict = {
        ...userServerComments[comw]?.d,
        ...d,
        [CmComCommentBlockSpecialSelector.Kinds]: {
          ...userServerComments[comw]?.d?.[CmComCommentBlockSpecialSelector.Kinds],
          ...d?.[CmComCommentBlockSpecialSelector.Kinds],
        },
      };

      checkKindsFull(newCommentDict);

      userServerComments[comw] = {
        ...userServerComments[comw],
        d: newCommentDict,
        m: commentModifiedAt,
      };

      if (alt) {
        const userAlt = (userServerComments[comw].alt ??= {});

        if (
          Array.from(new Set([...smylib.keys(alt), ...smylib.keys(userAlt)])).length <=
          cmConstantsConfigFileStore.getValue().maxComCommentAlternativesCount
        )
          SMyLib.entries(alt).forEach(([altCommentKey, altValue]) => {
            userAlt[altCommentKey] = {
              ...userAlt[altCommentKey],
              ...altValue,
              [CmComCommentBlockSpecialSelector.Kinds]: {
                ...userAlt[altCommentKey]?.[CmComCommentBlockSpecialSelector.Kinds],
                ...altValue?.[CmComCommentBlockSpecialSelector.Kinds],
              },
            };

            checkKindsFull(userAlt[altCommentKey]);
          });
      }

      if (newCommentDict)
        SMyLib.entries(newCommentDict).forEach(([key, block]) => {
          if (!block) return;

          if (key === CmComCommentBlockSpecialSelector.Kinds) {
            checkKindsFull(newCommentDict);
          } else checkSimpleFull(key, block, newCommentDict);

          if (userServerComments[comw] && !smylib.keys(newCommentDict).length) delete userServerComments[comw].d;
        });

      const userServerAltCommentDict = userServerComments[comw].alt;

      if (userServerAltCommentDict != null)
        SMyLib.keys(userServerAltCommentDict).forEach(altCommentKey => {
          const altBlock = userServerAltCommentDict[altCommentKey];

          if (!altBlock) return;
          SMyLib.entries(altBlock).forEach(([key, block]) => {
            if (block == null) return;

            if (key === CmComCommentBlockSpecialSelector.Kinds) {
              checkKindsFull(newCommentDict);
            } else checkSimpleFull(key, block, userServerAltCommentDict[altCommentKey]);
          });
        });

      const block: ICmComCommentBlock = { ...userServerComments[comw], comw };
      resultComments.push(block);
      freshComments.push(block);
      localSavedCommentsMaxModifiedAt = Math.max(localSavedCommentsMaxModifiedAt, commentModifiedAt);
    });

    if (localSavedCommentsMaxModifiedAt) {
      comCommentsDirStore.saveItem(auth.login);

      cmShareServerTsjrpcMethods.refreshComCommentBlocks(
        { comments: freshComments, modifiedAt: localSavedCommentsMaxModifiedAt },
        { login: auth.login },
      );
    }

    return { value: resultComments };
  },
} satisfies Partial<ConstructorParameters<typeof TsjrpcBaseServer<CmTsjrpcModel>>[0]['methods']>;
