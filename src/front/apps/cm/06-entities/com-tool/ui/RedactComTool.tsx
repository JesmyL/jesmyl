import { useCmComCurrent } from '$cm/entities/com';
import { useAuth } from '$index/atoms';
import { Link } from '@tanstack/react-router';
import { CmComTool } from '../ComTool';

export default function CmComToolRedact() {
  const auth = useAuth();
  const ccom = useCmComCurrent();

  return (
    auth.level > 49 && (
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
