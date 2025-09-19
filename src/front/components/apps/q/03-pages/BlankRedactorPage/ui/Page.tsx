import { Button } from '#shared/components/ui/button';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useQuestionerBlankDetailsQuery } from '$q/basis/lib/api/useQuestionerBlankDetailsQuery';
import { atom } from 'atomaric';
import { QuestionerBlankWid } from 'shared/model/q';
import { QuestionerAddTemplateModalInner } from './AddTemplateModalInner';

const isOpenAddModalAtom = atom(false);

export const QuestionerBlankRedactorPage = ({ blankw }: { blankw: QuestionerBlankWid }) => {
  const blankQuery = useQuestionerBlankDetailsQuery(blankw);

  return (
    <PageContainerConfigurer
      className="QuestionerRedactorPage"
      headTitle={blankQuery.data?.title ?? 'Опрос'}
      content={
        <>
          <ConditionalRender
            value={blankQuery.data}
            render={blank => (
              <>
                <TextInput
                  label="Название"
                  defaultValue={blank.title}
                />

                <TextInput
                  label="Описание"
                  defaultValue={blank.dsc}
                  multiline
                />

                <Button
                  size="icon"
                  className="text-xOK mt-7"
                  onClick={isOpenAddModalAtom.do.toggle}
                >
                  <LazyIcon icon="AddCircleHalfDot" />
                </Button>
                <Modal openAtom={isOpenAddModalAtom}>
                  <QuestionerAddTemplateModalInner
                    blank={blank}
                    openAtom={isOpenAddModalAtom}
                  />
                </Modal>
              </>
            )}
          />
        </>
      }
    />
  );
};
