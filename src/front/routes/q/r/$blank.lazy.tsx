import { QuestionerBlankRedactorPage } from '$q/pages/BlankRedactorPage/ui/Page';
import { createLazyFileRoute } from '@tanstack/react-router';
import { RouteComponent as ListPage } from './index.lazy';

export const Route = createLazyFileRoute('/q/r/$blank')({
  component: RouteComponent,
  errorComponent: ListPage,
});

function RouteComponent() {
  const { blank } = Route.useParams();

  return <QuestionerBlankRedactorPage blankw={+blank} />;
}
