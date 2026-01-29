import { QuestionerCheckAnswersPage } from '$q/pages/CheckAnswersPage/ui/Page';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/q/a/$blank')({
  component: RouteComponent,
});

function RouteComponent() {
  const { blank } = Route.useParams();

  return <QuestionerCheckAnswersPage blankw={+blank} />;
}
