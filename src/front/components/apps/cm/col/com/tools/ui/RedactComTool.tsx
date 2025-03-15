import { useCcom } from '$cm/basis/lib/com-selections';
import { useAuth } from '$index/atoms';
import { Link } from '@tanstack/react-router';
import { ComTool } from '../ComTool';

export default function RedactComTool() {
  const auth = useAuth();
  const ccom = useCcom();

  return (
    auth.level > 49 && (
      <Link
        to="/cm/edit/coms/$comw"
        params={{ comw: `${ccom?.wid ?? 0}` }}
        search={{ tab: 'watch' }}
      >
        <ComTool
          title="Редактировать"
          icon="PencilEdit02"
        />
      </Link>
    )
  );
}
