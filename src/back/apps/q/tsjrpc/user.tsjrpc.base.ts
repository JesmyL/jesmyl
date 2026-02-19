import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { QuestionerUserTsjrpcModel } from 'shared/api/tsjrpc/q/user.tsjrpc.model';
import { QuestionerTemplate, QuestionerTemplateId, QuestionerType, QuestionerVariatedType } from 'shared/model/q';
import { QuestionerUserAnswerValueBox } from 'shared/model/q/answer';
import { itIt, SMyLib, smylib } from 'shared/utils';
import { questionerBlanksDirStorage, questionerUserAnswersFileStore } from '../file-stores';

export const questionerUserServerTsjrpcBase =
  new (class QuestionerUser extends TsjrpcBaseServer<QuestionerUserTsjrpcModel> {
    constructor() {
      super({
        scope: 'QuestionerUser',
        methods: {
          getUserBlank: async ({ blankw }) => {
            const blank = questionerBlanksDirStorage.getItem(blankw);
            if (blank == null) return { value: null };

            const tmp: PRecord<QuestionerTemplateId, QuestionerTemplate> = { ...blank.tmp };

            smylib.keys(tmp).forEach(templateId => {
              const templateForUser = { ...tmp[templateId] } as QuestionerTemplate;

              if (templateForUser.type === QuestionerType.TextInclude) {
                const texts = smylib.values(templateForUser.correct ?? {});

                templateForUser.textVariants = smylib.toRandomSorted(
                  Array.from(
                    new Set(
                      texts
                        .concat(templateForUser.addTexts ?? [])
                        .filter(itIt)
                        .map(it => it.toUpperCase()),
                    ),
                  ),
                );

                templateForUser.len = texts.length;
                delete templateForUser.addTexts;
              } else if (templateForUser.type === QuestionerType.Sorter) {
                templateForUser.len = smylib.keys(templateForUser.correct ?? {}).length;
              }

              if ('correct' in templateForUser) delete templateForUser.correct;
              tmp[templateId] = templateForUser;
            });

            return { value: blank ? { ...blank, w: blankw, tmp, team: {} } : null };
          },

          getUserAnswers: async ({ blankw }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'q', 'EDIT', 'R')) throw '';
            return {
              value: questionerUserAnswersFileStore.getValue()[blankw]?.answers ?? [],
            };
          },

          publicUserAnswer: ({ blankw, answer }) => {
            questionerUserAnswersFileStore.modifyValueWithAutoSave(totalAnswers => {
              const blank = questionerBlanksDirStorage.getItem(blankw);

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

              return {
                description: `Получен ответ на опрос ${blank?.title} от ${answer.fio ? `"${answer.fio}"` : 'Анонимного пользователя'}\n\n<blockquote expandable>${JSON.stringify(answer, null, 1)}</blockquote>`,
              };
            });
          },
        },
      });
    }
  })();
