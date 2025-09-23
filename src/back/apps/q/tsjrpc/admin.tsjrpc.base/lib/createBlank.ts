import { questionerBlanksFileStore } from 'back/apps/q/file-stores';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { QuestionerBlank, QuestionerBlankRole, QuestionerBlankWid } from 'shared/model/q';
import { smylib } from 'shared/utils';
import { questionerAdminServerTsjrpcBase } from '..';

export const questionerTSJRPCCreateBlank: typeof questionerAdminServerTsjrpcBase.createBlank = async (_, { auth }) => {
  if (throwIfNoUserScopeAccessRight(auth?.login, 'q', 'EDIT', 'C')) throw '';

  const blanks = questionerBlanksFileStore.getValueWithAutoSave();

  const newBlank: QuestionerBlank = {
    w: smylib.takeNewWid<QuestionerBlankWid>(blanks),
    m: Date.now(),
    title: 'Новый опрос',
    dsc: '',
    tmp: {},
    team: {
      [auth.login]: {
        fio: auth.fio ?? 'Неизвестный',
        r: QuestionerBlankRole.Owner,
      },
    },
  };

  const { w, ...savedBlank } = newBlank;
  blanks[w] = savedBlank;

  return newBlank;
};
