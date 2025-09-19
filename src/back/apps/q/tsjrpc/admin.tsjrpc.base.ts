import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { QuestionerAdminTsjrpcModel } from 'shared/api/tsjrpc/q/admin.tsjrpc.model';
import {
  QuestionerBlank,
  QuestionerBlankRole,
  QuestionerBlankWid,
  QuestionerCheckTemplate,
  QuestionerCommentTemplate,
  QuestionerRadioTemplate,
  QuestionerTemplate,
  QuestionerTemplateMi,
  QuestionerType,
} from 'shared/model/q';
import { SMyLib, smylib } from 'shared/utils';
import { questionerBlanksFileStore } from '../file-stores';

export const questionerAdminServerTsjrpcBase =
  new (class QuestionerAdmin extends TsjrpcBaseServer<QuestionerAdminTsjrpcModel> {
    constructor() {
      const adminRoles = new Set([QuestionerBlankRole.Owner, QuestionerBlankRole.Admin, undefined, null]);
      adminRoles.delete(undefined);
      adminRoles.delete(null);

      super({
        scope: 'QuestionerAdmin',
        methods: {
          getAdminBlanks: async (_, { auth: { login } = {} }) => {
            if (throwIfNoUserScopeAccessRight(login, 'q', 'EDIT', 'R')) throw '';

            return SMyLib.entries(questionerBlanksFileStore.getValue())
              .filter(blank => adminRoles.has(blank[1]?.team[login]?.r))
              .map(bla => ({ ...bla[1]!, w: +bla[0] }));
          },
          addBlankTemplate: async ({ blankw, type }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth?.login, 'q', 'EDIT', 'R')) throw '';

            const blanks = questionerBlanksFileStore.getValue();
            if (blanks[blankw] == null) throw 'Not Found';

            const mi = smylib.takeNextMi(blanks[blankw].tmp, QuestionerTemplateMi.empty);
            let blankTmp: QuestionerTemplate;

            const buildTemplate = <Tmp extends QuestionerTemplate, _Type extends Tmp['type']>(tmp: Tmp) => tmp;

            switch (type) {
              case QuestionerType.Check:
                blankTmp = buildTemplate<QuestionerCheckTemplate, QuestionerType.Check>({ type, mi, vari: [] });
                break;
              case QuestionerType.Radio:
                blankTmp = buildTemplate<QuestionerRadioTemplate, QuestionerType.Radio>({ type, vari: [], mi });
                break;
              case QuestionerType.Comment:
                blankTmp = buildTemplate<QuestionerCommentTemplate, QuestionerType.Comment>({ type, mi });
                break;
            }

            blanks[blankw].tmp.push(blankTmp);

            return { ...blanks[blankw], w: blankw };
          },
          createBlank: async (_, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth?.login, 'q', 'EDIT', 'C')) throw '';

            const blanks = questionerBlanksFileStore.getValueWithAutoSave();

            const newBlank: QuestionerBlank = {
              w: smylib.takeNewWid<QuestionerBlankWid>(blanks),
              m: Date.now(),
              title: 'Новый опрос',
              dsc: '',
              tmp: [],
              o: [],
              li: 1,
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
          },
          getAdminBlank: async ({ blankw }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth?.login, 'q', 'EDIT', 'U')) throw '';
            const blank = questionerBlanksFileStore.getValue()[blankw];

            return blank && { ...blank, w: blankw };
          },
        },
      });
    }
  })();
