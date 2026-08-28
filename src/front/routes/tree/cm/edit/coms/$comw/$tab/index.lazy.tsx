import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { CmEditorCompositionPage } from '$cm+editor/pages/CompositionPage';
import { cmEditorComTabCompositionNavs } from '$cm+editor/widgets/com-tab';
import { createLazyFileRoute } from '@tanstack/react-router';
import { CmComWid } from 'shared/api';
import { extractNumber } from 'shared/utils';

export const Route = createLazyFileRoute('/cm/edit/coms/$comw/$tab/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { tab, comw } = Route.useParams() as { comw: CmComWid; tab: keyof typeof cmEditorComTabCompositionNavs };
  const checkAccess = useCheckUserAccessRightsInScope();

  if (checkAccess('cm', 'COM', 'R'))
    return (
      <CmEditorCompositionPage
        tab={tab}
        ccomw={extractNumber(comw)}
      />
    );
}
