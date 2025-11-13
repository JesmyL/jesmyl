import { questionerBlanksDirStorage } from 'back/apps/q/file-stores';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { QuestionerBlankRole } from 'shared/model/q';
import { questionerAdminServerTsjrpcBase } from '..';

export const questionerTSJRPCCreateBlank: typeof questionerAdminServerTsjrpcBase.createBlank = async (_, { auth }) => {
  if (throwIfNoUserScopeAccessRight(auth?.login, 'q', 'EDIT', 'C')) throw '';
  const login = auth.login;

  const { item } = questionerBlanksDirStorage.createItem(() => ({
    w: Date.now() + Math.random(),
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
