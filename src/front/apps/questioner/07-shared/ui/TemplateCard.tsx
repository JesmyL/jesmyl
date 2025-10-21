import { Accordion } from '#shared/components/ui/accordion';
import { Button } from '#shared/components/ui/button';
import { Card } from '#shared/components/ui/card';
import { Popover } from '#shared/components/ui/popover';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { QuestionerTemplate, QuestionerTemplateId } from 'shared/model/q';
import { questionerTemplateDescriptions } from '../const/templateDescriptions';

export const QuestionerTemplateCard = ({
  description,
  title,
  innerTitle,
  template,
  content,
  requiredSign,
  templateId,
  actionIconsNode,
  className,
}: {
  title: React.ReactNode;
  innerTitle?: React.ReactNode;
  description: React.ReactNode;
  template: QuestionerTemplate;
  requiredSign: React.ReactNode;
  content: React.ReactNode;
  templateId: RKey<QuestionerTemplateId>;
  actionIconsNode?: React.ReactNode;
  className?: string;
}) => {
  return (
    <Accordion.Item
      value={'' + templateId}
      className={className}
    >
      <Accordion.Trigger>{title}</Accordion.Trigger>
      <Accordion.Content>
        <Card.Root className="my-3 custom-align-items">
          <Card.Header className="pr-0">
            {innerTitle ? <Card.Title>{innerTitle}</Card.Title> : requiredSign}
            {description && <Card.Description>{description}</Card.Description>}
            <Card.Action className="flex flex-col gap-3">
              <Popover.Root>
                <Popover.Trigger>
                  <Button
                    size="icon"
                    asSpan
                  >
                    <LazyIcon icon="HelpCircle" />
                  </Button>
                </Popover.Trigger>
                <Popover.Content>
                  <Card.Root>
                    <Card.Header>
                      <Card.Title>{questionerTemplateDescriptions[template.type].title}</Card.Title>
                      <Card.Description>{questionerTemplateDescriptions[template.type].dsc}</Card.Description>
                    </Card.Header>
                  </Card.Root>
                </Popover.Content>
              </Popover.Root>
              {actionIconsNode}
            </Card.Action>
          </Card.Header>
          <Card.Content className="px-3">
            {!innerTitle || requiredSign}
            {content}
          </Card.Content>
        </Card.Root>
      </Accordion.Content>
    </Accordion.Item>
  );
};
