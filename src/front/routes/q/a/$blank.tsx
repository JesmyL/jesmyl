import { QuestionerCheckAnswersPage } from '$q/pages/CheckAnswersPage/ui/Page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/q/a/$blank')({
  component: RouteComponent,
});

function RouteComponent() {
  const { blank } = Route.useParams();

  return <QuestionerCheckAnswersPage blankw={+blank} />;
}
