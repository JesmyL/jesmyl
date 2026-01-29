import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmEditorCompositionPage } from '$cm+editor/pages/CompositionPage';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/cm/edit/coms/$comw/$tab/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { tab, comw } = Route.useParams();
  const checkAccess = useCheckUserAccessRightsInScope();

  if (checkAccess('cm', 'COM', 'R'))
    return (
      <CmEditorCompositionPage
        tab={tab as never}
        ccomw={+comw}
      />
    );
}
