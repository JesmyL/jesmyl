import { questionerBlanksDirStorage } from 'back/apps/q/file-stores';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { QuestionerBlankRole } from 'shared/model/q';
import { questionerAdminServerTsjrpcBase } from '..';

export const questionerTSJRPCCreateBlank: typeof questionerAdminServerTsjrpcBase.createBlank = async (_, tool) => {
  const auth = takeLogginedAuthOrThrow(tool.auth);
  if (await throwIfNoUserScopeAccessRight(auth?.login, 'q', 'EDIT', 'C')) throw '';
  const login = auth.login;

  const { item } = await questionerBlanksDirStorage.createItem(() => ({
    w: Date.now(),
    m: Date.now(),
    title: 'Новый опрос',
    dsc: '',
    tmp: {},
    ord: [],
    team: {
      [login]: {
        fio: auth.fio ?? 'Неизвестный',
        r: QuestionerBlankRole.Owner,
      },
    },
  }));

  return { value: item };
};
