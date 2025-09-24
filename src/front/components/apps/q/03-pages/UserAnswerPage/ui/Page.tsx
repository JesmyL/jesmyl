import { Accordion } from '#shared/components/ui/accordion';
import { Button } from '#shared/components/ui/button';
import { Card } from '#shared/components/ui/card';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { CopyTextButton } from '#shared/ui/CopyTextButton';
import { useToast } from '#shared/ui/modal/useToast';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { TextInput } from '#shared/ui/TextInput';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { questionerCardContents } from '$q/basis/lib/const/cardContents';
import { questionerTemplateDescriptions } from '$q/basis/lib/const/templateDescriptions';
import { QuestionerTemplateCard } from '$q/basis/ui/TemplateCard';
import { questionerUserTsjrpcClient } from '$q/processes/tsjrpc/user.tsjrpc';
import { atom, useAtomValue } from 'atomaric';
import { environment } from 'front/environment';
import { useState } from 'react';
import {
  QuestionerBlankWid,
  QuestionerType,
  QuestionerUserAnswer,
  QuestionerUserAnswerContentProps,
} from 'shared/model/q';
import { itNIt } from 'shared/utils';
import { twMerge } from 'tailwind-merge';
import { useQuestionerUserBlankDetailsQuery } from '../api/useQuestionerUserBlankDetailsQuery';

const answersAtom = atom({ fio: '', answ: {} } as QuestionerUserAnswer, {
  storeKey: 'q:userAnswer',
  do: (_, get, setDeferred) => ({
    setFio: (fio: string) => setDeferred({ ...get(), fio }),
  }),
});

export const QuestionerUserAnswerPage = ({ blankw }: { blankw: QuestionerBlankWid }) => {
  const questionBlank = useQuestionerUserBlankDetailsQuery(blankw);
  const userAnswer = useAtomValue(answersAtom);
  const answerErrorsSet = new Set<string | null>();
  const toast = useToast();
  const [isOpenAllItems, setIsOpenAllItems] = useState(true);

  return (
    <PageContainerConfigurer
      className="QuestionerAnswersPage"
      headTitle={questionBlank.data?.title || 'Мои ответы'}
      withoutBackButton
      head={
        <div className="flex gap-3">
          {questionBlank.isLoading && <TheIconLoading />}
          <CopyTextButton
            text={`${environment.initialUrl}/q/i?q=${blankw}`}
            message="Ссылка скопирована"
          />
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
            if (!blank.anon && !userAnswer.fio) answerErrorsSet.add('Не вписаны Фамилия и Имя');

            return (
              <Card.Root>
                <Card.Header>
                  <Card.Title>
                    {blank.anon ? (
                      <>Анонимный опрос</>
                    ) : (
                      <TextInput
                        strongDefaultValue
                        defaultValue={userAnswer.fio}
                        label={
                          <>
                            Фамилия Имя<span className={userAnswer.fio ? 'text-xOK' : 'text-xKO'}> *</span>
                          </>
                        }
                        onInput={value => answersAtom.do.setFio(value)}
                      />
                    )}
                  </Card.Title>
                  <Card.Description>{blank.dsc}</Card.Description>
                </Card.Header>
                <Card.Content>
                  <Accordion.Root
                    type="multiple"
                    key={+isOpenAllItems}
                    defaultValue={isOpenAllItems ? ((blank.ord ?? []) as never as string[]) : []}
                  >
                    {blank.ord.map(templateId => {
                      const template = blank.tmp[templateId];
                      if (template == null || template.hidden || !template.dsc) return;

                      return (<Type extends QuestionerType>(type: Type) => {
                        const contentProps = questionerCardContents<Type>(type);

                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const props: QuestionerUserAnswerContentProps<any> = {
                          template: template,
                          userAnswer: userAnswer.answ[templateId],
                          onUpdate: updater => {
                            answersAtom.set(prev => {
                              try {
                                const updatedValue = updater(prev.answ[templateId]);

                                return {
                                  ...prev,
                                  answ: { ...prev.answ, [templateId]: updatedValue },
                                };
                              } catch (_e) {
                                return prev;
                              }
                            });
                          },
                        };

                        if (contentProps.takeShowError?.(props as never)) return null;

                        const { check: answerCheckError, info: answerInfoError } =
                          contentProps.takeUserAnswerError(props as never) ?? {};

                        if (answerCheckError) answerErrorsSet.add(answerCheckError);

                        return (
                          <QuestionerTemplateCard
                            key={templateId}
                            templateId={templateId}
                            template={template}
                            title={
                              <span>
                                {template.title || questionerTemplateDescriptions[type].title}
                                {template.req && (
                                  <span
                                    className={twMerge(
                                      'bold',
                                      template.req ? (answerCheckError ? 'text-xKO' : 'text-xOK') : '',
                                    )}
                                  >
                                    {' *'}
                                  </span>
                                )}
                              </span>
                            }
                            description={template.dsc}
                            requiredSign={
                              <>
                                {!template.req || (
                                  <span className="text-xKO">
                                    ● {contentProps.customRequireMessage ?? 'Этот вопрос обязателен к ответу'}
                                  </span>
                                )}
                                {answerInfoError && (
                                  <span className={answerCheckError || template.req ? 'text-xKO' : 'text-xOK'}>
                                    ● {answerInfoError}
                                  </span>
                                )}
                              </>
                            }
                            content={contentProps.userRender(props as never)}
                          />
                        );
                      })(template.type);
                    })}
                  </Accordion.Root>
                </Card.Content>
                <Card.Footer>
                  <Button
                    icon="MailSend02"
                    disabled={!!answerErrorsSet.size}
                    disabledReason={Array.from(answerErrorsSet).map((error, errori) => (
                      <div key={errori}>● {error}</div>
                    ))}
                    onClick={() =>
                      questionerUserTsjrpcClient
                        .publicUserAnswer({
                          answer: {
                            ...userAnswer,
                            fio: blank.anon ? undefined : userAnswer.fio,
                          },
                          blankw,
                        })
                        .then(() => {
                          answersAtom.reset();
                          toast('Ответ отправлен', { mood: 'ok' });
                        })
                    }
                  >
                    Отправить мои ответы
                  </Button>
                </Card.Footer>
              </Card.Root>
            );
          }}
        />
      }
    />
  );
};
