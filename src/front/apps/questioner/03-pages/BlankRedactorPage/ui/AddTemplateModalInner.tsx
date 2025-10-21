import { Button } from '#shared/components/ui/button';
import { Card } from '#shared/components/ui/card';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import {
  questionerTemplateDescriptions,
  questionerTemplateDescriptionsOrder,
} from '$q/shared/const/templateDescriptions';
import { Atom } from 'atomaric';
import { QuestionerBlank } from 'shared/model/q';
import { useQuestionerBlankRedactorAddBlankTemplateMutation } from '../api/useQuestionerAddBlankTemplateMutation';

export const QuestionerBlankRedactorAddTemplateModalInner = ({
  blank,
  openAtom,
  onAdd,
}: {
  blank: QuestionerBlank;
  openAtom: Atom<boolean>;
  onAdd: () => void;
}) => {
  const addTemplate = useQuestionerBlankRedactorAddBlankTemplateMutation(openAtom.reset);

  return (
    <>
      <ModalHeader>
        <span className="text-x7">{blank.title}.</span> Новый вопрос
      </ModalHeader>
      <ModalBody>
        {questionerTemplateDescriptionsOrder.map(type => {
          const { dsc, title } = questionerTemplateDescriptions[type];

          return (
            <Card.Root
              key={type}
              className="my-3"
            >
              <Card.Header>
                <Card.Title>{title}</Card.Title>
                <Card.Description>{dsc}</Card.Description>
                <Card.Action>
                  <Button
                    size="icon"
                    disabled={addTemplate.isPending}
                    onClick={() => addTemplate.mutateAsync({ blankw: blank.w, type }).then(onAdd)}
                  >
                    <TheIconLoading
                      icon="Add02"
                      isLoading={addTemplate.isPending && addTemplate.variables.type === type}
                    />
                  </Button>
                </Card.Action>
              </Card.Header>
            </Card.Root>
          );
        })}
      </ModalBody>
    </>
  );
};
