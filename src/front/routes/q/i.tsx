import { QuestionerUserAnswerPage } from '$q/pages/UserAnswerPage/ui/Page';
import { createFileRoute } from '@tanstack/react-router';
import { atom, useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { QuestionerBlankWid } from 'shared/model/q';

export const Route = createFileRoute('/q/i')({
  component: RouteComponent,
  validateSearch: (search: PRecord<string, unknown>): { q?: QuestionerBlankWid } => {
    return {
      q: isNaN(+search.q!) ? undefined : +search.q!,
    };
  },
});

const lastBlankwAtom = atom(QuestionerBlankWid.empty, 'q:lastUserBlankw');

function RouteComponent() {
  const { q } = Route.useSearch();
  const lastBlankw = useAtomValue(lastBlankwAtom);

  useEffect(() => {
    if (!q) return;
    lastBlankwAtom.set(q);
  }, [q]);

  return <QuestionerUserAnswerPage blankw={q || lastBlankw} />;
}
