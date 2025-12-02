import { GamerGamesListPage } from '$gamer/pages/GamesListPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/gamer/i/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <GamerGamesListPage />;
}
