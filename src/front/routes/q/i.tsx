import { QuestionerUserAnswerPage } from '$q/pages/UserAnswerPage/ui/Page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/q/i')({
  component: RouteComponent,
  validateSearch: (search: PRecord<string, unknown>) => {
    return {
      q: isNaN(+search.q!) ? undefined : +search.q!,
    };
  },
});

function RouteComponent() {
  const { q } = Route.useSearch();
  return q && <QuestionerUserAnswerPage blankw={q} />;
}
