import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Accordion } from '#shared/components/ui/accordion';
import { Button } from '#shared/components/ui/button';
import { Popover } from '#shared/components/ui/popover';
import { propagationStopper } from '#shared/lib/event-funcs';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { Modal } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { questionerCardContents } from '$q/shared/const/cardContents';
import { questionerTemplateDescriptions } from '$q/shared/const/templateDescriptions';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { QuestionerTemplateCard } from '$q/shared/ui/TemplateCard';
import { Link } from '@tanstack/react-router';
import { atom } from 'atomaric';
import { QuestionerAdminTemplateContentProps, QuestionerBlankWid, QuestionerTemplateId, QuestionerType } from 'shared/model/q';
import { itIt } from 'shared/utils';
import { QuestionerBlankRedactorAddTemplateModalInner } from './AddTemplateModalInner';
import { QuestionerBlankRedactorControls } from './Controls';
import { QuestionerTemplateVisibilityRedactor } from '$q/widgets/TemplateVisibilityRedactor/ui/Redactor';
import { WithAtomTruthfulValue } from '#shared/ui/WithAtomTruthfulValue';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { questionerIDB } from '$q/shared/state/qIdb';
import { useLiveQuery } from 'dexie-react-hooks';

const isOpenAddModalAtom = atom(false);
const openVisibilityTemplateIdModalAtom = atom<QuestionerTemplateId | null>(null);

export const QuestionerBlankRedactorPage = ({ blankw }: { blankw: QuestionerBlankWid }) => {
  const blank = useLiveQuery(() => questionerIDB.tb.blanks.get(blankw), [blankw]);

  return (
    <PageContainerConfigurer
      className="QuestionerRedactorPage"
      headTitle={blank?.title ?? 'Опрос'}
      head={
        <>
          <Link
            to="/q/i"
            search={{ q: blank?.w }}
          >
            <Button
              icon="BubbleChat"
              className="text-xOK mr-2"
            />
          </Link>
          <Link
            to="/q/a/$blank"
            params={{ blank: '' + blank?.w }}
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
            value={blank}
            render={blank => (
              <>
                <QuestionerBlankRedactorControls
                  blank={blank}
                  blankw={blankw}
                />

                <Accordion.Root type="multiple">
                  {blank.ord?.map((templateId, templateIdi) => {
                    const template = blank.tmp[templateId];
                    if (template == null) return;

                    return (<Type extends QuestionerType>(type: Type) => {
                      const props: QuestionerAdminTemplateContentProps<Type> = {
                        template: template as never,
                        blank,
                        templateId,
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
                          className={template.hidden ? 'opacity-50' : undefined}
                          content={contentProps.adminRender(props as never)}
                          title={
                            <div className="flex justify-between w-full">
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
                              {!templateIdi || (
                                <Button
                                  icon="SquareArrowMoveRightUp"
                                  asSpan
                                  onClick={event => {
                                    event.stopPropagation();

                                    return questionerAdminTsjrpcClient
                                      .changeTemplatePosition({ blankw, templateId })
                                  }}
                                />
                              )}
                            </div>
                          }
                          actionIconsNode={
                            <Button
                              icon={template.hidden ? 'ViewOffSlash' : 'View'}
                              className={template.hidden ? 'text-x7' : undefined}
                              onClick={() => openVisibilityTemplateIdModalAtom.set(templateId)}
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
                              }
                            />
                          }
                          innerTitle={
                            <InputWithLoadingIcon
                              icon="TextFont"
                              label={`Заголовок (${questionerTemplateDescriptions[template.type].title})`}
                              defaultValue={template.title || questionerTemplateDescriptions[template.type].title}
                              onChanged={value =>
                                questionerAdminTsjrpcClient
                                  .changeTemplateTitle({ blankw, value, templateId })
                              }
                            />
                          }
                          description={
                            <InputWithLoadingIcon
                              icon="TextAlignLeft"
                              label="Текст вопроса"
                              defaultValue={template.dsc ?? ''}
                              multiline
                              onChanged={value =>
                                questionerAdminTsjrpcClient
                                  .changeTemplateDescription({ blankw, value, templateId })
                              }
                            />
                          }
                        />
                      );
                    })(template.type);
                  })}
                </Accordion.Root>
              </>
            )}
          />

          <FullContent openAtom={openVisibilityTemplateIdModalAtom}>
            <WithAtomTruthfulValue atom={openVisibilityTemplateIdModalAtom}>{
              (templateId) => <QuestionerTemplateVisibilityRedactor blankw={blankw} templateId={templateId} />
            }</WithAtomTruthfulValue>
          </FullContent>

          <Modal openAtom={isOpenAddModalAtom}>
            {blank && (
              <QuestionerBlankRedactorAddTemplateModalInner
                blank={blank}
                openAtom={isOpenAddModalAtom}
              />
            )}
          </Modal>
        </>
      }
    />
  );
};
