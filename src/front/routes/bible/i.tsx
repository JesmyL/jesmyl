import { BibleReaderCurrentBookPage } from '$bible/pages/ReaderCurrentBookPage';
import { bibleInitialInvokes } from '$bible/shared/lib/bible-initial-invokes';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bible/i')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BibleReaderCurrentBookPage />;
}

bibleInitialInvokes();
