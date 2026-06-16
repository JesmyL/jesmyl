import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { CmComCommentBlockDict, CmComCommentBlockSpecialSelector, ICmComCommentBlock } from 'shared/api';
import { CmTsjrpcModel } from 'shared/api/tsjrpc/cm/tsjrpc.model';
import { arrayByLength } from 'shared/utils/object.utils';
import { removeEmptyRightValues } from 'shared/utils/removeEmptyRightValues';
import { comCommentsDirStore } from '../file-stores';
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';

export const cmServerTsjrpcBaseExchangeFreshComCommentBlocks = {
  exchangeFreshComCommentBlocks: async ({ modifiedComments, clientDateNow }, { auth: userAuth }) => {
    const auth = takeLogginedAuthOrThrow(userAuth);
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

      const comServerCommentDicts = userServerComments[comw]?.dl ?? [];
      const modeifiedComCommentDicts = dl ?? [];

      const resultDictList = arrayByLength(
        Math.max(modeifiedComCommentDicts.length, comServerCommentDicts.length),
        (i): CmComCommentBlockDict | nil => ({
          ...comServerCommentDicts[i],
          ...modeifiedComCommentDicts[i],
          [CmComCommentBlockSpecialSelector.Kinds]: {
            ...comServerCommentDicts[i]?.[CmComCommentBlockSpecialSelector.Kinds],
            ...modeifiedComCommentDicts[i]?.[CmComCommentBlockSpecialSelector.Kinds],
          },
        }),
      );

      userServerComments[comw] = {
        ...userServerComments[comw],
        dl: resultDictList.map(it => it || {}),
        m: commentModifiedAt,
      };

      removeEmptyRightValues(userServerComments[comw]);

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
} satisfies ServerTsjrpcSatisfy<CmTsjrpcModel>;
