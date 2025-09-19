import { QuestionerBlankRedactorPage } from '$q/pages/BlankRedactorPage/ui/Page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/q/r/$blank')({
  component: RouteComponent,
});

function RouteComponent() {
  const { blank } = Route.useParams();

  return <QuestionerBlankRedactorPage blankw={+blank} />;
}
