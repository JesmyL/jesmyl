import { questionerBlanksStore } from 'back/apps/q/db-stores';
import { takeUserTiny } from 'back/apps/index/tinies/userTiny';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { QuestionerBlankRole } from 'shared/model/q';
import { questionerAdminServerTsjrpcBase } from '..';
import { questionerAdminServerTsjrpcShare } from '../../admin.tsjrpc.share';

export const questionerTSJRPCCreateBlank: typeof questionerAdminServerTsjrpcBase.createBlank = async (_, tool) => {
  const auth = takeLogginedAuthOrThrow(tool.auth);
  if (await throwIfNoUserScopeAccessRight(auth?.login, 'q', 'EDIT', 'C')) throw '';
  const authUser = await takeUserTiny({ l: auth.login });

  const now = Date.now();

  const { item } = await questionerBlanksStore.createItem(() => ({
    w: now,
    m: now,
    title: 'Новый опрос',
    dsc: '',
    tmp: {},
    ord: [],
    team: {
      [authUser.id]: {
        r: QuestionerBlankRole.Owner,
      },
    },
  }));

  questionerAdminServerTsjrpcShare.updateBlanks({ blanks: [item], maxMod: now }, tool.client);

  return { value: item.w };
};
