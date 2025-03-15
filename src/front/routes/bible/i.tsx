import { BibleReaderCurrentBookPage } from '$bible/reader/book/CurrentBookPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bible/i')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BibleReaderCurrentBookPage />;
}
