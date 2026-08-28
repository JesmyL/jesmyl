import { BibleReaderSearchPage } from '$bible/pages/ReaderSearchPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bible/search')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BibleReaderSearchPage />;
}
