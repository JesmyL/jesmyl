import { AppComponent } from '$app/AppComponent';
import { createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: Component,
});

function Component() {
  return <AppComponent />;
}
