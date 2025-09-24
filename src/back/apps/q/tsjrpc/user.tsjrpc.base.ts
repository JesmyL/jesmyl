import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { QuestionerUserTsjrpcModel } from 'shared/api/tsjrpc/q/user.tsjrpc.model';
import { QuestionerTemplate, QuestionerTemplateId } from 'shared/model/q';
import { smylib } from 'shared/utils';
import { questionerBlanksFileStore, questionerUserAnswersFileStore } from '../file-stores';

export const questionerUserServerTsjrpcBase =
  new (class QuestionerUser extends TsjrpcBaseServer<QuestionerUserTsjrpcModel> {
    constructor() {
      super({
        scope: 'QuestionerUser',
        methods: {
          getUserBlank: async ({ blankw }) => {
            const blank = questionerBlanksFileStore.getValue()[blankw];
            if (blank == null) return;

            const tmp: PRecord<QuestionerTemplateId, QuestionerTemplate> = { ...blank.tmp };

            smylib.keys(tmp).forEach(templateId => {
              const templateForUser = { ...tmp[templateId] } as QuestionerTemplate;
              if ('correct' in templateForUser) delete templateForUser.correct;
              tmp[templateId] = templateForUser;
            });

            return blank && { ...blank, w: blankw, tmp, team: undefined };
          },

          getUserAnswers: async ({ blankw }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth?.login, 'q', 'EDIT', 'R')) throw '';
            return questionerUserAnswersFileStore.getValue()[blankw]?.answers;
          },

          publicUserAnswer: ({ blankw, answer }) => {
            const blanks = questionerUserAnswersFileStore.getValueWithAutoSave();
            blanks[blankw] ??= { answers: [] };
            blanks[blankw].answers.push(answer);
          },
        },
        onEachFeedback: {
          getUserAnswers: null,
          getUserBlank: null,
          publicUserAnswer: ({ blankw, answer }) => {
            const blank = questionerBlanksFileStore.getValue()[blankw];
            return `Получен ответ на опрос ${blank?.title} от ${answer.fio ? `"${answer.fio}"` : 'Анонимного пользователя'}\n\n<blockquote expandable>${JSON.stringify(answer, null, 1)}</blockquote>`;
          },
        },
      });
    }
  })();
