import { Accordion } from '#shared/components/ui/accordion';
import { Button } from '#shared/components/ui/button';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { useQuestionerCheckAnswersQuery } from '$q/pages/CheckAnswersPage/api/useQuestionerUserAnswersQuery';
import { useQuestionerAdminBlankDetailsQuery } from '$q/shared/api/useQuestionerAdminBlankDetailsQuery';
import { questionerCardContents } from '$q/shared/const/cardContents';
import { QuestionerAnswerCard } from '$q/shared/ui/AnswerCard';
import { useState } from 'react';
import { QuestionerBlankWid } from 'shared/model/q';
import { itNIt } from 'shared/utils';
import { twMerge } from 'tailwind-merge';

export const QuestionerCheckAnswersPage = ({ blankw }: { blankw: QuestionerBlankWid }) => {
  const userAnswers = useQuestionerCheckAnswersQuery(blankw);
  const questionBlank = useQuestionerAdminBlankDetailsQuery(blankw);
  const [isOpenAllItems, setIsOpenAllItems] = useState(false);

  return (
    <PageContainerConfigurer
      className="QuestionerAnswersPage"
      headTitle={<>{questionBlank.data?.title || 'Ответы'} - проверка</>}
      withoutBackButton
      head={
        <div className="flex gap-3">
          {questionBlank.isLoading && <TheIconLoading />}
          <Button
            icon="ArrowDownDouble"
            className={twMerge(isOpenAllItems && 'rotate-180')}
            onClick={() => setIsOpenAllItems(itNIt)}
          />
        </div>
      }
      content={
        <ConditionalRender
          value={questionBlank.data}
          render={blank => {
            return (
              <ConditionalRender
                value={userAnswers.data}
                render={answers => {
                  const openItems = isOpenAllItems ? answers.map((_, i) => '' + i) : [];

                  return answers.map(({ a: answer, fio }, answeri) => {
                    return (
                      <Accordion.Root
                        key={`${answeri}-${+!openItems.length}`}
                        type="multiple"
                        defaultValue={openItems}
                      >
                        <Accordion.Item value={'' + answeri}>
                          <Accordion.Trigger>{fio}</Accordion.Trigger>
                          <Accordion.Content>
                            {blank.ord.map(templateId => {
                              const template = blank.tmp[templateId];

                              if (template == null) return;

                              return (
                                <QuestionerAnswerCard
                                  key={templateId}
                                  title={template.title}
                                  content={questionerCardContents(template.type).resultRender({
                                    template: template as never,
                                    userAnswer: answer[templateId] as never,
                                  })}
                                />
                              );
                            })}
                          </Accordion.Content>
                        </Accordion.Item>
                      </Accordion.Root>
                    );
                  });
                }}
              />
            );
          }}
        />
      }
    />
  );
};
