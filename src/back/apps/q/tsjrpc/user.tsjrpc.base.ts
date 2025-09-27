import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { QuestionerUserTsjrpcModel } from 'shared/api/tsjrpc/q/user.tsjrpc.model';
import { QuestionerTemplate, QuestionerTemplateId, QuestionerType, QuestionerVariatedType } from 'shared/model/q';
import { QuestionerUserAnswerValueBox } from 'shared/model/q/answer';
import { itIt, SMyLib, smylib } from 'shared/utils';
import { questionerBlanksFileStore, questionerUserAnswersFileStore } from '../file-stores';

export const questionerUserServerTsjrpcBase =
  new (class QuestionerUser extends TsjrpcBaseServer<QuestionerUserTsjrpcModel> {
    constructor() {
      super({
        scope: 'QuestionerUser',
        methods: {
          getUserBlank: async ({ blankw }) => {
            const blank = questionerBlanksFileStore.getValue()[blankw];
            if (blank == null) return null;

            const tmp: PRecord<QuestionerTemplateId, QuestionerTemplate> = { ...blank.tmp };

            smylib.keys(tmp).forEach(templateId => {
              const templateForUser = { ...tmp[templateId] } as QuestionerTemplate;

              if (templateForUser.type === QuestionerType.TextInclude)
                templateForUser.textVariants = smylib.toRandomSorted(
                  Array.from(
                    new Set(
                      smylib
                        .values(templateForUser.correct ?? {})
                        .concat(templateForUser.addTexts ?? [])
                        .filter(itIt)
                        .map(it => it.toUpperCase()),
                    ),
                  ),
                );

              if ('correct' in templateForUser) delete templateForUser.correct;
              tmp[templateId] = templateForUser;
            });

            return blank ? { ...blank, w: blankw, tmp, team: {} } : null;
          },

          getUserAnswers: async ({ blankw }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth?.login, 'q', 'EDIT', 'R')) throw '';
            return questionerUserAnswersFileStore.getValue()[blankw]?.answers ?? [];
          },

          publicUserAnswer: ({ blankw, answer }) => {
            const totalAnswers = questionerUserAnswersFileStore.getValueWithAutoSave();
            const blank = questionerBlanksFileStore.getValue()[blankw];

            totalAnswers[blankw] ??= { answers: [] };
            totalAnswers[blankw].answers.push(answer);

            SMyLib.entries(answer.a).forEach(([templateId, answerValue]) => {
              if (answerValue == null) return;
              if (answerValue.v == null) {
                delete answer.a[templateId];
                return;
              }

              const template = blank?.tmp[templateId];
              if (template == null) return;

              if (template.type === QuestionerType.Check || template.type === QuestionerType.Radio) {
                const userAnswer = answerValue as QuestionerUserAnswerValueBox[QuestionerVariatedType];
                userAnswer.len = smylib.keys(template.variants).length ?? 0;
              }
            });
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
