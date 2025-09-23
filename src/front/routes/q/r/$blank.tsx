import { QuestionerBlankRedactorPage } from '$q/pages/BlankRedactorPage/ui/Page';
import { createFileRoute } from '@tanstack/react-router';
import { RouteComponent as ListPage } from './index';

export const Route = createFileRoute('/q/r/$blank')({
  component: RouteComponent,
  errorComponent: ListPage,
});

function RouteComponent() {
  const { blank } = Route.useParams();

  return <QuestionerBlankRedactorPage blankw={+blank} />;
}
