import { useAuth } from '@index/atoms';
import { ComTool } from '../ComTool';
import { useComToolsCcomContext } from '../lib/useMigratableComTools';

export default function RedactComTool() {
  const auth = useAuth();
  const ccom = useComToolsCcomContext();

  return (
    auth.level > 49 && (
      <ComTool
        title="Редактировать"
        icon="PencilEdit02"
        path={ccom && `/cm/edit/coms/${ccom.wid}`}
      />
    )
  );
}
