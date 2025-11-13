import { useCmComCurrent } from '$cm/entities/com';
import { Link } from '@tanstack/react-router';
import { CmComTool } from '../ComTool';
import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';

export default function CmComToolRedact() {
  const checkAccess = useCheckUserAccessRightsInScope();
  const ccom = useCmComCurrent();

  return (
    checkAccess('cm', 'EDIT') && (
      <Link
        to="/cm/edit/coms/$comw/$tab"
        params={{ comw: `${ccom?.wid ?? 0}`, tab: 'watch' }}
      >
        <CmComTool
          title="Редактировать"
          icon="PencilEdit02"
        />
      </Link>
    )
  );
}
