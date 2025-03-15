import { BibleReaderSearchPage } from '$bible/reader/search/SearchPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bible/search')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BibleReaderSearchPage />;
}
