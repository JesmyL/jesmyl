import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Accordion } from '#shared/components/ui/accordion';
import { Button } from '#shared/components/ui/button';
import { Popover } from '#shared/components/ui/popover';
import { propagationStopper } from '#shared/lib/event-funcs';
import { mylib } from '#shared/lib/my-lib';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useQuestionerAdminBlankDetailsQuery } from '$q/basis/lib/api/useQuestionerAdminBlankDetailsQuery';
import { questionerCardContents } from '$q/basis/lib/const/cardContents';
import { questionerTemplateDescriptions } from '$q/basis/lib/const/templateDescriptions';
import { QuestionerTemplateCard } from '$q/basis/ui/TemplateCard';
import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { Link } from '@tanstack/react-router';
import { atom } from 'atomaric';
import { QuestionerAdminTemplateContentProps, QuestionerBlankWid, QuestionerType } from 'shared/model/q';
import { itIt } from 'shared/utils';
import { QuestionerAddTemplateModalInner } from './AddTemplateModalInner';

const isOpenAddModalAtom = atom(false);

export const QuestionerBlankRedactorPage = ({ blankw }: { blankw: QuestionerBlankWid }) => {
  const blankQuery = useQuestionerAdminBlankDetailsQuery(blankw);

  return (
    <PageContainerConfigurer
      className="QuestionerRedactorPage"
      headTitle={blankQuery.data?.title ?? 'Опрос'}
      head={
        <>
          <Link
            to="/q/i"
            search={{ q: blankQuery.data?.w }}
          >
            <Button
              icon="BubbleChat"
              className="text-xOK mr-2"
            />
          </Link>
          <Link
            to="/q/a/$blank"
            params={{ blank: '' + blankQuery.data?.w }}
          >
            <Button
              icon="MessageUser01"
              className="text-xOK mr-2"
            />
          </Link>
          <Button
            icon="AddCircleHalfDot"
            className="text-xOK mr-2"
            onClick={isOpenAddModalAtom.do.toggle}
          />
        </>
      }
      content={
        <>
          <ConditionalRender
            value={blankQuery.data}
            render={blank => (
              <>
                <InputWithLoadingIcon
                  icon="TextFont"
                  label="Название"
                  defaultValue={blank.title}
                  onChange={value =>
                    questionerAdminTsjrpcClient.changeBlankTitle({ blankw, value }).then(() => blankQuery.refetch())
                  }
                />

                <InputWithLoadingIcon
                  icon="TextAlignLeft"
                  label="Описание"
                  defaultValue={blank.dsc}
                  multiline
                  onChange={value =>
                    questionerAdminTsjrpcClient
                      .changeBlankDescription({ blankw, value })
                      .then(() => blankQuery.refetch())
                  }
                />

                <div
                  onClick={() =>
                    questionerAdminTsjrpcClient.switchBlankIsAnonymous({ blankw }).then(() => blankQuery.refetch())
                  }
                >
                  <IconCheckbox
                    isRadio
                    checked={!!blank.anon}
                    postfix="Анонимный опрос"
                  />
                  <IconCheckbox
                    isRadio
                    checked={!blank.anon}
                    postfix="Запрашивать Фамилию/Имя"
                  />
                </div>

                <Accordion.Root type="multiple">
                  {mylib.keys(blank.tmp).map(templateId => {
                    const template = blank.tmp[templateId];
                    if (template == null) return;

                    return (<Type extends QuestionerType>(type: Type) => {
                      const props: QuestionerAdminTemplateContentProps<Type> = {
                        template: template as never,
                        blank,
                        templateId,
                        onUpdate: blankQuery.refetch,
                      };

                      const contentProps = questionerCardContents(type);

                      const errors = [
                        contentProps.takeShowError?.(props as never),
                        !template.dsc && 'Нет текста вопроса',
                      ].filter(itIt);

                      return (
                        <QuestionerTemplateCard
                          key={templateId}
                          templateId={templateId}
                          template={template}
                          title={
                            <div className="flex gap-3">
                              {template.title || (
                                <span className="text-x7 italic">
                                  {questionerTemplateDescriptions[template.type].title}
                                </span>
                              )}
                              {template.req && <span className="bold text-xKO">*</span>}
                              {template.hidden ? (
                                <Popover.Root>
                                  <Popover.Trigger
                                    onClick={propagationStopper}
                                    asChild
                                  >
                                    <LazyIcon icon="ViewOffSlash" />
                                  </Popover.Trigger>
                                  <Popover.Content>Вопрос скрыт</Popover.Content>
                                </Popover.Root>
                              ) : (
                                !!errors.length && (
                                  <Popover.Root>
                                    <Popover.Trigger
                                      onClick={propagationStopper}
                                      asChild
                                    >
                                      <LazyIcon icon="ViewOff" />
                                    </Popover.Trigger>
                                    <Popover.Content>
                                      {errors.map(error => (
                                        <div key={'' + error}>{error}</div>
                                      ))}
                                    </Popover.Content>
                                  </Popover.Root>
                                )
                              )}
                            </div>
                          }
                          className={template.hidden ? 'opacity-50' : undefined}
                          actionIconsNode={
                            <Button
                              icon={template.hidden ? 'ViewOffSlash' : 'View'}
                              className={template.hidden ? 'text-x7' : undefined}
                              onClick={() =>
                                questionerAdminTsjrpcClient
                                  .switchTemplateHiddenSign({ blankw, templateId })
                                  .then(() => blankQuery.refetch())
                              }
                            />
                          }
                          requiredSign={
                            <IconCheckbox
                              checked={!!template.req}
                              postfix="Обязательно для заполнения"
                              className="text-xKO"
                              onChange={value =>
                                questionerAdminTsjrpcClient
                                  .changeTemplateRequiredSign({ blankw, value, templateId })
                                  .then(() => blankQuery.refetch())
                              }
                            />
                          }
                          innerTitle={
                            <InputWithLoadingIcon
                              icon="TextFont"
                              label={`Заголовок (${questionerTemplateDescriptions[template.type].title})`}
                              defaultValue={template.title || questionerTemplateDescriptions[template.type].title}
                              onChange={value =>
                                questionerAdminTsjrpcClient
                                  .changeTemplateTitle({ blankw, value, templateId })
                                  .then(() => blankQuery.refetch())
                              }
                            />
                          }
                          description={
                            <InputWithLoadingIcon
                              icon="TextAlignLeft"
                              label="Текст вопроса"
                              defaultValue={template.dsc ?? ''}
                              multiline
                              onChange={value =>
                                questionerAdminTsjrpcClient
                                  .changeTemplateDescription({ blankw, value, templateId })
                                  .then(() => blankQuery.refetch())
                              }
                            />
                          }
                          content={contentProps.adminRender(props as never)}
                        />
                      );
                    })(template.type);
                  })}
                </Accordion.Root>
              </>
            )}
          />

          <Modal openAtom={isOpenAddModalAtom}>
            {blankQuery.data && (
              <QuestionerAddTemplateModalInner
                blank={blankQuery.data}
                openAtom={isOpenAddModalAtom}
                onAdd={blankQuery.refetch}
              />
            )}
          </Modal>
        </>
      }
    />
  );
};
