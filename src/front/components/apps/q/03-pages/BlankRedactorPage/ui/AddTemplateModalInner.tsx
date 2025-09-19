import { Button } from '#shared/components/ui/button';
import { Card } from '#shared/components/ui/card';
import { Popover } from '#shared/components/ui/popover';
import { MyLib } from '#shared/lib/my-lib';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { questionerTemplateDescriptions } from '$q/basis/lib/const/templateDescriptions';
import { Atom } from 'atomaric';
import { QuestionerBlank } from 'shared/model/q';
import { useQuestionerAddBlankTemplateMutation } from '../api/useQuestionerAddBlankTemplateMutation';

export const QuestionerAddTemplateModalInner = ({
  blank,
  openAtom,
}: {
  blank: QuestionerBlank;
  openAtom: Atom<boolean>;
}) => {
  const addTemplate = useQuestionerAddBlankTemplateMutation(openAtom.reset);

  return (
    <>
      <ModalHeader>
        <span className="text-x7">{blank.title}.</span> Новый вопрос
      </ModalHeader>
      <ModalBody>
        {MyLib.entries(questionerTemplateDescriptions).map(([type, { dsc, title }]) => {
          return (
            <Card.Root
              key={type}
              className="my-3"
              onClick={() => addTemplate.mutate({ blankw: blank.w, type: +type })}
            >
              <Card.Header>
                <div>{title}</div>
                <Popover.Root>
                  <Popover.Trigger>
                    <Button size="icon">
                      {addTemplate.variables?.type === type ? <TheIconLoading /> : <LazyIcon icon="HelpCircle" />}
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content>{dsc}</Popover.Content>
                </Popover.Root>
              </Card.Header>
            </Card.Root>
          );
        })}
      </ModalBody>
    </>
  );
};
