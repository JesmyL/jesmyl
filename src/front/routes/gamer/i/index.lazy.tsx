import { GamerGamesListPage } from '$gamer/pages/GamesListPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/gamer/i/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <GamerGamesListPage />;
}
