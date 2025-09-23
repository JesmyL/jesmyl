import { Card } from '#shared/components/ui/card';

export const QuestionerAnswerCard = ({ title, content }: { title: React.ReactNode; content: React.ReactNode }) => {
  return (
    <Card.Root className="my-3 custom-align-items">
      <Card.Header className="pr-0">
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Content className="px-3">{content}</Card.Content>
    </Card.Root>
  );
};
