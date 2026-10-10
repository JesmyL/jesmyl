import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { QuestionerUserTsjrpcModel } from 'shared/api/tsjrpc/q/user.tsjrpc.model';
import { QuestionerTemplate, QuestionerTemplateId, QuestionerType } from 'shared/model/q';
import { toRandomSorted } from 'shared/randoms';
import { itIt } from 'shared/utils';
import { objectKeys, objectValues } from 'shared/utils/object.utils';
import { textToUpperCase } from 'shared/utils/string.utils';
import { questionerBlanksStore, questionerUserAnswersStore } from '../db-stores';

export const questionerUserServerTsjrpcBase =
  new (class QuestionerUser extends TsjrpcBaseServer<QuestionerUserTsjrpcModel> {
    constructor() {
      super({
        scope: 'QuestionerUser',
        methods: {
          getUserBlank: async ({ blankw }) => {
            const blank = await questionerBlanksStore.getItem(blankw);
            if (blank == null) return { value: null };

            const tmp: PRecord<QuestionerTemplateId, QuestionerTemplate> = { ...blank.tmp };

            objectKeys(tmp).forEach(templateId => {
              const templateForUser = { ...tmp[templateId] } as QuestionerTemplate;

              if (templateForUser.type === QuestionerType.TextInclude) {
                const texts = objectValues(templateForUser.correct ?? {});

                templateForUser.textVariants = toRandomSorted(
                  Array.from(
                    new Set(
                      texts
                        .concat(templateForUser.addTexts ?? [])
                        .filter(itIt)
                        .map(textToUpperCase),
                    ),
                  ),
                );

                templateForUser.len = texts.length;
                delete templateForUser.addTexts;
              } else if (templateForUser.type === QuestionerType.Sorter) {
                templateForUser.len = objectKeys(templateForUser.correct ?? {}).length;
              }

              if ('correct' in templateForUser) delete templateForUser.correct;
              tmp[templateId] = templateForUser;
            });

            return { value: blank ? { ...blank, w: blankw, tmp, team: {} } : null };
          },

          getUserAnswers: async ({ blankw }, { auth }) => {
            if (await throwIfNoUserScopeAccessRight(auth, 'q', 'EDIT', 'R')) throw '';
            return { value: await questionerUserAnswersStore.getAnswers(blankw) };
          },

          publicUserAnswer: async ({ blankw, answer }) => {
            return { description: await questionerUserAnswersStore.pushAnswer(blankw, answer) };
          },
        },
      });
    }
  })();
